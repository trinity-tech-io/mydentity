import {
  JWTHeader,
  JWTParserBuilder,
  VerifiableCredential,
  VerifiablePresentation
} from '@elastosfoundation/did-js-sdk';
import { DID as ConnDID, DID } from '@elastosfoundation/elastos-connectivity-sdk-js';
import { AppContext, DIDResolverAlreadySetupException, Vault } from '@elastosfoundation/hive-js-sdk';
import { logger } from '@services/logger';
import dayjs from 'dayjs';
import process from 'process';

type HiveAuthErrorCallback = (err: any) => void;

/**
 * Hive initialization
 */
try {
  AppContext.setupResolver(process.env.NEXT_PUBLIC_RESOLVER_URL, '/anyfakedir/browserside/for/didstores');
} catch (e) {
  if (e instanceof DIDResolverAlreadySetupException) {
    // silent error, it's ok
  } else {
    logger.error('hive', 'AppContext.setupResolver() exception:', e);
  }
}
const didAccess = new ConnDID.DIDAccess();

/**
 * Returns the hive AppContext for the given did.
 * Hive app context is needed by most hive operations.
 */
export async function getHiveAppContext(userDid: string, onAuthError: HiveAuthErrorCallback): Promise<AppContext> {
  const appInstanceDIDInfo = await didAccess.getOrCreateAppInstanceDID();

  logger.log('hive', 'Getting app instance DID document');
  const didDocument = await appInstanceDIDInfo.didStore.loadDid(
    appInstanceDIDInfo.did.toString()
  );
  // appInstanceDIDInfo.didStore.loadDidDocument(appInstanceDIDInfo.did.getDIDString(), async (didDocument) => {
  logger.log('hive', 'Got app instance DID document. Now creating the Hive client', didDocument.toJSON());

  const appContextProvider = {
    getLocalDataDir: () => '/',
    getAppInstanceDocument: () => Promise.resolve(didDocument),
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
        if (onAuthError)
          onAuthError(e);
        return null;
      }
    }
  };

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
    const appInstanceDIDResult = await didAccess.getOrCreateAppInstanceDID();
    const appInstanceDID = appInstanceDIDResult.did;

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
      const didStore = await DID.DIDHelper.openDidStore(appInstanceDIDInfo.storeId);

      logger.log('hive', 'Loading DID document');
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

async function generateAppIdCredential(): Promise<VerifiableCredential> {
  const storedAppInstanceDID = await didAccess.getOrCreateAppInstanceDID();
  if (!storedAppInstanceDID)
    return null;

  // No such credential, so we have to create one. Send an intent to get that from the did app
  logger.log('hive', 'Starting to generate a new App ID credential.');

  // Ask the identity walconst (eg: Essentials) to generate an app id credential.
  const appIdCredential = await didAccess.generateAppIdCredential();

  // Save this issued credential for later use.
  await storedAppInstanceDID.didStore.storeCredential(appIdCredential);

  // This generated credential must contain the following properties:
  // TODO: CHECK THAT THE RECEIVED CREDENTIAL CONTENT IS VALID
  // appInstanceDid
  // appDid

  return appIdCredential;
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
