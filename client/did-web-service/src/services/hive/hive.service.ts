import {
  JWTHeader,
  JWTParserBuilder,
  VerifiableCredential,
  VerifiablePresentation
} from '@elastosfoundation/did-js-sdk';
import type { DID as ConnDID } from '@elastosfoundation/elastos-connectivity-sdk-js';
import { AppContext, AppContextProvider, DIDResolverAlreadySetupException, Vault, VaultSubscription } from '@elastosfoundation/hive-js-sdk';
import { activeIdentity$ } from '@services/identity/identity.events';
import { logger } from '@services/logger';
import { isClientSide } from '@utils/client-server';
import { lazyElastosConnectivitySDKImport } from '@utils/import-helper';
import dayjs from 'dayjs';
import moment from 'moment';

type HiveAuthErrorCallback = (err: any) => void;

/**
 * Hive initialization - client side only
 */
export function hiveInit(): void {
  if (!isClientSide())
    return;

  try {
    AppContext.setupResolver(process.env.NEXT_PUBLIC_RESOLVER_URL, '/anyfakedir/browserside/for/didstores');
  } catch (e) {
    if (e instanceof DIDResolverAlreadySetupException) {
      // silent error, it's ok
    } else {
      logger.error('hive', 'AppContext.setupResolver() exception:', e);
    }
  }
}

async function getDIDAccess(): Promise<ConnDID.DIDAccess> {
  const { DID: ConnDID } = await lazyElastosConnectivitySDKImport();
  return new ConnDID.DIDAccess();
}

export async function getHiveAppContextProvider(onAuthError?: HiveAuthErrorCallback): Promise<AppContextProvider> {
  const didAccess = await getDIDAccess();
  const appInstanceDIDInfo = await didAccess.getOrCreateAppInstanceDID();

  const didDocument = await appInstanceDIDInfo.didStore.loadDid(
    appInstanceDIDInfo.did.toString()
  );
  // appInstanceDIDInfo.didStore.loadDidDocument(appInstanceDIDInfo.did.getDIDString(), async (didDocument) => {
  logger.log('hive', 'Got app instance DID document. Now creating the Hive client', didDocument.toJSON());


  return {
    getLocalDataDir: () => '/',
    getAppInstanceDocument: () => didDocument,
    getAuthorization: (authenticationChallengeJWtCode: string): Promise<string> => {
      /**
       * Called by the Hive plugin when a hive backend needs to authenticate the user and app.
       * The returned data must be a verifiable presentation, signed by the app instance DID, and
       * including a appid certification credential provided by the identity application.
       */
      logger.log('hive',
        'Hive client authentication challenge callback is being called with token:',
        authenticationChallengeJWtCode
      );
      try {
        return handleVaultAuthenticationChallenge(authenticationChallengeJWtCode);
      } catch (e) {
        logger.error('hive', 'Exception in authentication handler:', e);
        onAuthError?.(e);
        return null;
      }
    }
  };
}

/**
 * Returns the hive AppContext for the given did.
 * Hive app context is needed by most hive operations.
 */
export async function getHiveAppContext(userDid: string, onAuthError?: HiveAuthErrorCallback): Promise<AppContext> {
  logger.log('hive', 'Getting app context for', userDid);
  const appContextProvider = await getHiveAppContextProvider(onAuthError);

  return AppContext.build(appContextProvider, userDid, process.env.NEXT_PUBLIC_APP_DID);
}

/**
 * Returns the vault service instance for a target did.
 * The vault service gives access to various root information about a user's vault.
 */
export async function getVaultServices(userDid: string, providerAddress: string = null, onAuthError?: HiveAuthErrorCallback): Promise<Vault> {
  const appContext = await getHiveAppContext(userDid, onAuthError);
  return new Vault(appContext, providerAddress);
}

export async function getSubscriptionService(userDid: string, providerAddress: string = null, onAuthError?: HiveAuthErrorCallback): Promise<VaultSubscription> {
  const appContext = await getHiveAppContext(userDid, onAuthError);
  return new VaultSubscription(appContext, providerAddress);
}

function handleVaultAuthenticationChallenge(jwtToken: string): Promise<string> {
  return generateAuthPresentationJWT(jwtToken);
}

/**
 * Generates a JWT token needed by hive vaults to authenticate users and app.
 * That JWT contains a verifiable presentation that contains server challenge info, and the app id credential
 * issued by the end user earlier.
 */
async function generateAuthPresentationJWT(authChallengeJwttoken: string): Promise<string> {
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
    const appInstanceDIDResult = await didAccess.getOrCreateAppInstanceDID();
    const appInstanceDID = appInstanceDIDResult.did;

    logger.log("hive", "App instance DID:", appInstanceDID);

    const appInstanceDIDInfo = await didAccess.getExistingAppInstanceDIDInfo();

    logger.log('hive', 'Getting app identity credential');
    let appIdCredential = await didAccess.getExistingAppIdentityCredential();

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
 *
 */
async function generateAppIdCredential(): Promise<VerifiableCredential> {
  const appDID = process.env.NEXT_PUBLIC_APP_DID;

  const didAccess = await getDIDAccess();
  let storedAppInstanceDID = await didAccess.getOrCreateAppInstanceDID(appDID);
  if (!storedAppInstanceDID)
    return null;

  let appInstanceDID = storedAppInstanceDID.did;

  // No such credential, so we have to create one. Send an intent to get that from the did app
  logger.log("hive", "Starting to generate a new App ID credential.");

  // Directly generate the credential without user confirmation.
  try {
    const credential = await generateApplicationIDCredential(appInstanceDID.toString(), appDID);
    if (credential) {
      logger.log("hive", "App ID credential generated:", credential);

      // Save this issued credential for later use.
      await storedAppInstanceDID.didStore.storeCredential(credential);

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

async function generateApplicationIDCredential(appInstanceDid: string, appDid: string): Promise<VerifiableCredential> {
  const properties = { appInstanceDid, appDid };

  logger.log('hive', "AppIdCredIssueRequest - issuing credential");

  try {
    const activeIdentity = activeIdentity$.value; // TODO: NOT OK !! All methods should use the identity object in parameter, we don't want the active identity to change during a hive auth!
    const credential = await activeIdentity.provider.createCredential(
      activeIdentity.did,
      "#app-id-credential",
      ['https://elastos.org/fakecontext#AppIdCredential'], // TODO: real context
      moment().add(30, "days").toDate(),
      properties);

    return credential?.verifiableCredential;
  }
  catch (e) {
    logger.error('identity', "Failed to issue the app id credential...", e);
    return null;
  }
}

/**
 * Gets the hive vault instance of the given DID. The vault info is first retrieved
 * from the DID's DID document, then initiated using the hive SDK.
 */
export const getHiveVault = async (did: string): Promise<Vault> => {
  try {
    const vault = await getVaultServices(did);
    return vault;
  } catch (err) {
    logger.error('hive', err);
    return null;
  }
};
