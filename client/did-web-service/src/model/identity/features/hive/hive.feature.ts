import { callWithUnlock } from '@components/security/unlock-key-prompt/UnlockKeyPrompt';
import {
  DIDDocument, JWTHeader,
  JWTParserBuilder,
  VerifiableCredential,
  VerifiablePresentation
} from "@elastosfoundation/did-js-sdk";
import { AppContext, AppContextProvider, ScriptingService, ServiceEndpoint, Vault, VaultInfo, VaultNotFoundException, VaultSubscription } from "@elastosfoundation/hive-js-sdk";
import { Identity } from "@model/identity/identity";
import { getRandomQuickStartHiveNodeAddress, hiveOperationQueue } from '@services/hive/hive.service';
import { VaultStatus } from "@services/hive/vault/vault-status";
import { identityService } from "@services/identity/identity.service";
import { logger } from "@services/logger";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { ObjectCache } from '@utils/caches/object-cache';
import { lazyElastosHiveSDKImport } from "@utils/import-helper";
import { awaitSubjectValue } from "@utils/promises";
import dayjs from 'dayjs';
import moment from 'moment';
import { BehaviorSubject } from "rxjs";
import { IdentityFeature } from "../identity-feature";

export class HiveFeature implements IdentityFeature {
  public vaultStatus$ = new AdvancedBehaviorSubject<VaultStatus>(null, async () => { this.retrieveVaultStatus(); }); // Latest known vault status for active user
  public vaultAddress$ = new BehaviorSubject<string>(null);

  private appContextCache = new ObjectCache<AppContext>();

  constructor(protected identity: Identity) { }

  /**
   * Returns the vault service instance for a target did.
   * The vault service gives access to various root information about a user's vault.
   */
  public async getVaultService(): Promise<Vault> {
    await this.awaitHiveVaultReady();

    const appContext = await this.getHiveAppContext();
    return new Vault(appContext, null);
  }

  /**
   * Awaits until this identity's hive vault is ready to use (subscribed, status checked)
   */
  public awaitHiveVaultReady(): Promise<void> {
    return awaitSubjectValue(this.vaultStatus$, VaultStatus.ReadyToUse);
  }

  /**
   * Convenience method to get a shared subscription services instance for the active user.
   */
  public getActiveUserSubscriptionServices(): Promise<VaultSubscription> {
    logger.log("hive", "Getting subscription services for", this.identity.did);
    return this.getSubscriptionService();
  }

  public async addRandomHiveVaultServiceToDIDDocument(): Promise<boolean> {
    const randomHiveNodeAddress = getRandomQuickStartHiveNodeAddress();
    if (randomHiveNodeAddress) {
      await this.removeHiveVaultServiceFromDIDDocument();
      await identityService.addDIDDocumentService(this.identity.did, '#hivevault', 'HiveVault', randomHiveNodeAddress);

      return true;
    }
    else {
      throw new Error("Hive node address cannot be null");
    }
  }

  private async removeHiveVaultServiceFromDIDDocument(): Promise<boolean> {
    return identityService.removeDIDDocumentService(this.identity.did, "#hivevault");
  }

  /**
   * Tells if a given DIDDocument already contains a hive vault or not.
   *
   * TODO: LOCALLY OR ON CHAIN? NEED TO GET FROM THE IDENTITY SERVICE?
   */
  public documentHasVault(doc: DIDDocument): boolean {
    const hiveService = doc.getService("vault");
    return hiveService != null;
  }

  // TODO: LOCALLY OR ON CHAIN? NEED TO GET FROM THE IDENTITY SERVICE?
  public getDocumentVaultProviderUrl(doc: DIDDocument): string {
    const hiveService = doc.getService("#hivevault");
    return hiveService.serviceEndpoint;
  }

  /**
   * Returns the hive vault status for a given DID.
   */
  private async getVaultInfo(): Promise<VaultInfo> {
    const subscriptionService = await this.getSubscriptionService();
    return subscriptionService.checkSubscription();
  }

  /**
   * Subscribes (= sign up with the vault provider, free tier) active user to the target hive vault provider.
   */
  public async subscribeToHiveProvider(vaultProviderAddress: string): Promise<boolean> {
    logger.log("hive", "Subscribing to hive provider", vaultProviderAddress);

    let vaultInfo: VaultInfo = null;
    try {
      vaultInfo = await this.getVaultInfo();
    }
    catch (e) {
      // Silent catch, probably not authorized because not subscribed, so we will try to subscribe to the vault.
    }

    if (vaultInfo) {
      // The hive vault is already subscribed, so we have nothing to do.
      return true;
    }
    else {
      // No subscription - subscribe
      logger.log("hive", "subscribeToHiveProvider(): no vault info, subscribing");
      const subscriptionService = await this.getSubscriptionService();
      vaultInfo = await subscriptionService.subscribe();
      if (!vaultInfo) {
        // TO CHECK - Failure ?
        logger.error("hive", "Failed to create vault on the hive node");
        return false;
      }

      // Subscription went well, update status
      await this.retrieveVaultStatus();
    }

    let vaultServices = await this.getVaultService();
    if (!vaultServices) {
      logger.error("hive", "NULL vault returned, unable to get the vault for this DID.");
    }
    else {
      // Now try to call an API to see if everything is ok. This will initiate a authentication flow.
      try {
        logger.log("hive", "Calling an api on the hive vault to make sure everything is fine");

        // TODO: what the f***? :) getVaultService() after getVaultService() ?

        vaultServices = await this.getVaultService();
        const appStats = await vaultServices.getAppStats();

        if (!appStats) {
          logger.error("hive", "Error while calling a test hive vault API. No data returned");
        }
        else {
          logger.log("hive", "Vault API could be called, all good!");

          // Update the vault status for listeners to start using it
          void this.retrieveVaultStatus();

          // Everything is all right, now we can consider the hive setup as successfully completed.
          return true;
        }
      }
      catch (e) {
        logger.error("hive", "Exception while calling a test vault API:", e);
      }
    }

    return false;
  }

  /**
   * Initial check of active user's hive vault status
   */
  private async retrieveVaultStatus(): Promise<void> {
    // Make sure identity is published
    await this.identity.get("publication").awaitIdentityPublished();

    logger.log("hive", "Looking for vault status");

    this.vaultStatus$.next(VaultStatus.NotChecked);

    const { ServiceEndpoint } = await lazyElastosHiveSDKImport();

    // Check if we can find an existing vault provider address on DID chain for this user.
    logger.log("hive", "Retrieving vault of current user's DID " + this.identity.did);
    const appContext = await this.getHiveAppContext();
    const serviceEndpoint = new ServiceEndpoint(appContext);

    const vaultProviderInDIDDocument = await serviceEndpoint.getProviderAddress();
    this.vaultAddress$.next(vaultProviderInDIDDocument);

    try {
      // Call the subscription service to actually know if we are registered or not on that vault.
      const subscriptionService = await this.getSubscriptionService();
      await subscriptionService.checkSubscription();

      // Normally, if no exception thrown, "vault" is never null
      this.vaultStatus$.next(VaultStatus.ReadyToUse);

      logger.log("hive", "Vault status retrieval completed");
    }
    catch (e) {
      if (e instanceof VaultNotFoundException) {
        // Use has a vault registered in his DID document on chain but he is not subscribed to the
        // vault: so we try to subscribe to that vault, this could be the initial identity creation
        // step.
        await this.subscribeToHiveProvider(vaultProviderInDIDDocument);
      }
      else {
        logger.error("hive", "Unknown exception while retrieving vault status:", e);
        this.emitUnknownErrorStatus();
        return null;
      }
    }
  }

  private emitUnknownErrorStatus(): void {
    logger.log("hive", "Emiting unknown error status");
    this.vaultStatus$.next(VaultStatus.UnknownError);
  }

  async getSubscriptionService(): Promise<VaultSubscription> {
    const appContext = await this.getHiveAppContext();
    return new VaultSubscription(appContext);
  }

  async getScriptingService(): Promise<ScriptingService> {
    const appContext = await this.getHiveAppContext();
    const serviceEndpoint = new ServiceEndpoint(appContext);
    return new ScriptingService(serviceEndpoint);
  }

  private handleVaultAuthenticationChallenge(jwtToken: string): Promise<string> {
    return this.generateAuthPresentationJWT(jwtToken);
  }


  private getThisAppDID(): string {
    return process.env.NEXT_PUBLIC_APP_DID;
  }

  private async getHiveAppContextProvider(): Promise<AppContextProvider> {
    return hiveOperationQueue.add(async () => {
      const appDID = this.getThisAppDID();
      const appInstanceDIDInfo = await this.identity.get("did").getOrCreateAppInstanceDID(appDID);

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
            return this.handleVaultAuthenticationChallenge(authenticationChallengeJWtCode);
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
  private async getHiveAppContext(): Promise<AppContext> {
    return this.appContextCache.get(this.identity.did, {
      create: async () => {
        logger.log('hive', 'Getting app context for', this.identity.did);
        const appContextProvider = await this.getHiveAppContextProvider();
        return AppContext.build(appContextProvider, this.identity.did, process.env.NEXT_PUBLIC_APP_DID);
      }
    });
  }

  /**
   * Generates a JWT token needed by hive vaults to authenticate users and app.
   * That JWT contains a verifiable presentation that contains server challenge info, and the app id credential
   * issued by the end user earlier.
   */
  private async generateAuthPresentationJWT(authChallengeJwttoken: string): Promise<string> {
    const appDID = this.getThisAppDID();
    logger.log('hive', 'Starting process to generate hive auth presentation JWT');

    // Parse, but verify on chain that this JWT is valid first
    try {
      const claims = (await new JWTParserBuilder().setAllowedClockSkewSeconds(300).build().parse(authChallengeJwttoken)).getBody();
      if (claims == null)
        throw new Error('Invalid jwt token as authorization.');

      // The request JWT must contain iss and nonce fields
      if (!claims.getIssuer() || !claims.get('nonce'))
        throw new Error('The received authentication JWT token does not contain iss or nonce');

      // Generate a hive authentication presentation and put the credential + back-end info such as nonce inside
      const nonce = claims.get('nonce');
      const realm = claims.getIssuer();

      logger.log('hive', 'Getting app instance DID');
      const appInstanceDIDResult = await this.identity.get("did").getOrCreateAppInstanceDID(appDID);
      const appInstanceDID = appInstanceDIDResult.did;

      logger.log("hive", "App instance DID:", appInstanceDID);

      const appInstanceDIDInfo = await this.identity.get("did").getExistingAppInstanceDIDInfo(appDID);

      logger.log('hive', 'Getting app identity credential');
      let appIdCredential = await this.identity.get("did").getExistingAppIdentityCredential(appDID);

      if (!appIdCredential) {
        logger.log('hive', 'Empty app id credential. Trying to generate a new one');

        appIdCredential = await this.generateAppIdCredential();
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
  private async generateAppIdCredential(): Promise<VerifiableCredential> {
    const appDID = this.getThisAppDID();

    const storedAppInstanceDID = await this.identity.get("did").getOrCreateAppInstanceDID(appDID);
    if (!storedAppInstanceDID)
      return null;

    const appInstanceDID = storedAppInstanceDID.did;

    // No such credential, so we have to create one. Send an intent to get that from the did app
    logger.log("hive", "Starting to generate a new App ID credential.");

    // Directly generate the credential without user confirmation.
    try {
      const credential = await this.generateApplicationIDCredential(appInstanceDID.toString(), appDID);
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

  private async generateApplicationIDCredential(appInstanceDid: string, appDid: string): Promise<VerifiableCredential> {
    return hiveOperationQueue.add(async () => {
      const properties = { appInstanceDid, appDid };

      logger.log('hive', "Asking the identity provider to generate app ID credential for appInstanceDid:", appInstanceDid, "appDid:", appDid);

      try {
        return callWithUnlock(async () => {
          const credential = await this.identity.provider.issueCredential(
            this.identity.did,
            appInstanceDid,
            "#app-id-credential",
            ['https://elastos.org/fakecontext#AppIdCredential'], // TODO: real context
            moment().add(30, "days").toDate(),
            properties);

          return credential;
        }, true, null);
      }
      catch (e) {
        logger.error('identity', "Failed to issue the app id credential...", e);
        return null;
      }
    });
  }
}