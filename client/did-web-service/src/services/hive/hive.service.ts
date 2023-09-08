import {
  JWTHeader,
  JWTParserBuilder,
  VerifiableCredential,
  VerifiablePresentation
} from '@elastosfoundation/did-js-sdk';
import type { DID as ConnDID } from '@elastosfoundation/elastos-connectivity-sdk-js';
import { AppContext, AppContextProvider, DIDResolverAlreadySetupException, Logger, ScriptingService, ServiceEndpoint, Vault, VaultSubscription } from '@elastosfoundation/hive-js-sdk';
import { availableHiveNodeProviders } from "@services/hive/vault/vault-providers";
import { activeIdentity$ } from '@services/identity/identity.events';
import { logger } from '@services/logger';
import { isClientSide } from '@utils/client-server';
import { lazyElastosConnectivitySDKImport } from '@utils/import-helper';
import { ObjectCache } from '@utils/object-cache';
import dayjs from 'dayjs';
import moment from 'moment';
import Queue from "promise-queue";

const operationQueue = new Queue(1); // Semaphore to prevent multiple parrallel access to critical operations
const nodeProviders = availableHiveNodeProviders.MainNet; // For now, only mainnet supported
const appContextCache = new ObjectCache<AppContext>();

/**
 * Hive initialization - client side only
 */
export function hiveInit(): void {
  if (!isClientSide())
    return;

  try {
    Logger.setDefaultLevel(Logger.WARNING);
    AppContext.setupResolver(process.env.NEXT_PUBLIC_RESOLVER_URL, '/anyfakedir/browserside/for/didstores');
  } catch (e) {
    if (e instanceof DIDResolverAlreadySetupException) {
      // silent error, it's ok
    } else {
      logger.error('hive', 'AppContext.setupResolver() exception:', e);
    }
  }
}

let didAccess: ConnDID.DIDAccess = null;
async function getDIDAccess(): Promise<ConnDID.DIDAccess> {
  if (didAccess)
    return didAccess;

  const { DID: ConnDID } = await lazyElastosConnectivitySDKImport();
  didAccess = new ConnDID.DIDAccess();

  return didAccess;
}

export async function getHiveAppContextProvider(): Promise<AppContextProvider> {
  return operationQueue.add(async () => {
    const didAccess = await getDIDAccess();
    const appDID = getThisAppDID();
    const appInstanceDIDInfo = await didAccess.getOrCreateAppInstanceDID(appDID);

    const didDocument = await appInstanceDIDInfo.didStore.loadDid(appInstanceDIDInfo.did.toString());
    //logger.log('hive', 'Got app instance DID document. Now creating the Hive client', didDocument.toJSON());

    return {
      getLocalDataDir: () => '/',
      getAppInstanceDocument: () => didDocument,
      getAuthorization: (authenticationChallengeJWtCode: string): Promise<string> => {
        /**
         * Called by the Hive plugin when a hive backend needs to authenticate the user and app.
         * The returned data must be a verifiable presentation, signed by the app instance DID, and
         * including a appid certification credential provided by the identity application.
         */
        logger.log('hive', 'Receiving hive client authentication challenge');
        try {
          return handleVaultAuthenticationChallenge(authenticationChallengeJWtCode);
        } catch (e) {
          logger.error('hive', 'Exception in authentication handler:', e);
          return null;
        }
      }
    };
  });
}

/**
 * Returns the hive AppContext for the given did.
 * Hive app context is needed by most hive operations.
 */
export async function getHiveAppContext(identityDid: string): Promise<AppContext> {
  return appContextCache.get(identityDid, {
    async create() {
      // logger.log('hive', 'Getting app context for', identityDid);
      const appContextProvider = await getHiveAppContextProvider();
      return AppContext.build(appContextProvider, identityDid, process.env.NEXT_PUBLIC_APP_DID);
    }
  });
}

/**
 * Returns the vault service instance for a target did.
 * The vault service gives access to various root information about a user's vault.
 */
export async function getVaultService(identityDid: string, providerAddress: string = null): Promise<Vault> {
  const appContext = await getHiveAppContext(identityDid);
  return new Vault(appContext, providerAddress);
}

export async function getSubscriptionService(identityDid: string, providerAddress: string = null): Promise<VaultSubscription> {
  const appContext = await getHiveAppContext(identityDid);
  return new VaultSubscription(appContext, providerAddress);
}

export async function getScriptingService(identityDid: string, providerAddress: string = null): Promise<ScriptingService> {
  const appContext = await getHiveAppContext(identityDid);
  const serviceEndpoint = new ServiceEndpoint(appContext);
  return new ScriptingService(serviceEndpoint);
}

function handleVaultAuthenticationChallenge(jwtToken: string): Promise<string> {
  return generateAuthPresentationJWT(jwtToken);
}

function getThisAppDID(): string {
  return process.env.NEXT_PUBLIC_APP_DID;
}

/**
 * Generates a JWT token needed by hive vaults to authenticate users and app.
 * That JWT contains a verifiable presentation that contains server challenge info, and the app id credential
 * issued by the end user earlier.
 */
async function generateAuthPresentationJWT(authChallengeJwttoken: string): Promise<string> {
  const appDID = getThisAppDID();
  logger.log('hive', 'Starting process to generate hive auth presentation JWT');

  // Parse, but verify on chain that this JWT is valid first
  try {
    const claims = (
      await new JWTParserBuilder()
        .setAllowedClockSkewSeconds(300)
        .build()
        .parse(authChallengeJwttoken)
    ).getBody();
    if (claims == null)
      throw new Error('Invalid jwt token as authorization.');

    // The request JWT must contain iss and nonce fields
    if (!claims.getIssuer() || !claims.get('nonce'))
      throw new Error('The received authentication JWT token does not contain iss or nonce');

    // Generate a hive authentication presentation and put the credential + back-end info such as nonce inside
    const nonce = claims.get('nonce');
    const realm = claims.getIssuer();

    logger.log('hive', 'Getting app instance DID');
    const didAccess = await getDIDAccess();
    const appInstanceDIDResult = await didAccess.getOrCreateAppInstanceDID(appDID);
    const appInstanceDID = appInstanceDIDResult.did;

    logger.log("hive", "App instance DID:", appInstanceDID);

    const appInstanceDIDInfo = await didAccess.getExistingAppInstanceDIDInfo(appDID);

    logger.log('hive', 'Getting app identity credential');
    let appIdCredential = await getExistingAppIdentityCredential(appDID);

    if (!appIdCredential) {
      logger.log('hive', 'Empty app id credential. Trying to generate a new one');

      appIdCredential = await generateAppIdCredential();
      if (!appIdCredential) {
        logger.warn('hive', 'Failed to generate a new App ID credential');
        return null;
      }
    }

    // Create the presentation that includes hive back end challenge (nonce) and the app id credential.
    logger.log('hive', 'Creating DID presentation response for Hive authentication challenge');
    const builder = await VerifiablePresentation.createFor(
      appInstanceDID.toString(),
      null,
      appInstanceDIDResult.didStore
    );
    const presentation = await builder
      .credentials(appIdCredential)
      .realm(realm)
      .nonce(nonce)
      .seal(appInstanceDIDInfo.storePassword);

    if (presentation) {
      // Generate the hive back end authentication JWT
      logger.log('hive', 'Opening DID store to create a JWT for presentation:', presentation.toJSON());
      const ConnDID = (await import("@elastosfoundation/elastos-connectivity-sdk-js")).DID;
      const didStore = await ConnDID.DIDHelper.openDidStore(appInstanceDIDInfo.storeId);

      logger.log('hive', 'Loading DID document', appInstanceDIDInfo.didString);
      const didDocument = await didStore.loadDid(appInstanceDIDInfo.didString);
      // const validityDays = 2;
      logger.log('hive', 'App instance DID document', didDocument.toJSON());
      logger.log('hive', 'Creating JWT');

      // Create JWT token with presentation.
      // const info = await new ConDID.DIDAccess().getExistingAppInstanceDIDInfo();
      const jwtToken = await didDocument
        .jwtBuilder()
        .addHeader(JWTHeader.TYPE, JWTHeader.JWT_TYPE)
        .addHeader('version', '1.0')
        .setSubject('DIDAuthResponse')
        .setAudience(claims.getIssuer())
        .setIssuedAt(dayjs().unix())
        .setExpiration(dayjs().add(3, 'month').unix())
        .setNotBefore(dayjs().subtract(3, 'minutes').unix())
        .claimsWithJson('presentation', presentation.toString(true))
        .sign(appInstanceDIDInfo.storePassword);

      logger.log('hive', 'JWT created for presentation:', jwtToken);
      return jwtToken;
    } else {
      throw new Error('No presentation generated');
    }
  } catch (e) {
    // Verification error?
    // Could not verify the received JWT as valid - reject the authentication request by returning a null token
    const msg = `The received authentication JWT token signature cannot be verified or failed to verify: ${e}. Is the hive back-end DID published? Are you on the right network?`;
    throw new Error(msg);
  }
}

/**
 * Generates a app ID credential for hive authentication. This credential is generated directly, without user confirmation,
 */
async function generateAppIdCredential(): Promise<VerifiableCredential> {
  const appDID = getThisAppDID();

  const didAccess = await getDIDAccess();
  const storedAppInstanceDID = await didAccess.getOrCreateAppInstanceDID(appDID);
  if (!storedAppInstanceDID)
    return null;

  const appInstanceDID = storedAppInstanceDID.did;

  // No such credential, so we have to create one. Send an intent to get that from the did app
  logger.log("hive", "Starting to generate a new App ID credential.");

  // Directly generate the credential without user confirmation.
  try {
    const credential = await generateApplicationIDCredential(appInstanceDID.toString(), appDID);
    if (credential) {
      logger.log("hive", "App ID credential generated:", credential);

      // Save this issued credential for later use.
      await storedAppInstanceDID.didStore.storeCredential(credential);
      logger.log("hive", "Storing app ID credential into DID store:", storedAppInstanceDID.didStore, credential);

      return credential;
    }
    else
      return null;
  }
  catch (e) {
    // MasterPasswordCancellation
    return null;
  }
}

async function getExistingAppIdentityCredential(appDID: string = null): Promise<VerifiableCredential> {
  return operationQueue.add(async () => {
    logger.log("hive", "Trying to get an existing app ID credential from storage");

    const didAccess = await getDIDAccess();
    const storedAppInstanceDID = await didAccess.getOrCreateAppInstanceDID(appDID);
    if (!storedAppInstanceDID) {
      return null;
    }
    const appInstanceDID = storedAppInstanceDID.did;

    const fullCredId = appInstanceDID.toString() + "#app-id-credential";
    const credential = await storedAppInstanceDID.didStore.loadCredential(fullCredId);
    if (credential) {
      // If the credential exists but expiration date it too close, delete the current one to force generating a
      // new one.
      const expirationDate = moment(await credential.getExpirationDate());
      if (expirationDate.isBefore(moment().subtract(1, 'hours'))) {
        // We are expired - ask to generate a new credential
        logger.log("hive", "Existing credential is expired or almost expired - renewing it");
        return null;
      }
      else {
        logger.log("hive", "Returning existing app id credential found in app's local storage", credential);
      }
    }
    else {
      logger.log("hive", "No app id credential found for id", fullCredId, "in store", storedAppInstanceDID.didStore);
    }

    return credential;
  });
}

async function generateApplicationIDCredential(appInstanceDid: string, appDid: string): Promise<VerifiableCredential> {
  return operationQueue.add(async () => {
    const properties = { appInstanceDid, appDid };

    logger.log('hive', "Asking the identity provider to generate app ID credential for appInstanceDid:", appInstanceDid, "appDid:", appDid);

    try {
      const activeIdentity = activeIdentity$.value; // TODO: NOT OK !! All methods should use the identity object in parameter, we don't want the active identity to change during a hive auth!
      const credential = await activeIdentity.provider.issueCredential(
        activeIdentity.did,
        appInstanceDid,
        "#app-id-credential",
        ['https://elastos.org/fakecontext#AppIdCredential'], // TODO: real context
        moment().add(30, "days").toDate(),
        properties);

      return credential;
    }
    catch (e) {
      logger.error('identity', "Failed to issue the app id credential...", e);
      return null;
    }
  });
}

/**
 * Gets the hive vault instance of the given DID. The vault info is first retrieved
 * from the DID's DID document, then initiated using the hive SDK.
 */
export const getHiveVault = async (did: string): Promise<Vault> => {
  try {
    const vault = await getVaultService(did);
    return vault;
  } catch (err) {
    logger.error('hive', err);
    return null;
  }
};


/**
 * Returns a random hive node address among the nodes that we can choose as default quick start
 * vault provider for new users.
 */
export function getRandomQuickStartHiveNodeAddress(): string {
  const randomIndex = Math.floor(Math.random() * nodeProviders.length);
  return nodeProviders[randomIndex];
}
