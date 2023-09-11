import { DIDDocument } from "@elastosfoundation/did-js-sdk";
import { Vault, VaultInfo, VaultNotFoundException, VaultSubscription } from "@elastosfoundation/hive-js-sdk";
import { Identity } from "@model/identity/identity";
import { getHiveAppContext, getRandomQuickStartHiveNodeAddress, getSubscriptionService, getVaultService } from "@services/hive/hive.service";
import { VaultStatus } from "@services/hive/vault/vault-status";
import { identityService } from "@services/identity/identity.service";
import { logger } from "@services/logger";
import { lazyElastosHiveSDKImport } from "@utils/import-helper";
import { awaitSubjectValue } from "@utils/promises";
import { BehaviorSubject } from "rxjs";
import { IdentityFeature } from "../identity-feature";
import { LazyBehaviorSubject } from "@utils/lazy-behavior-subject";

/* const defaultVaultStatus: VaultStatus = {
  checkState: VaultStatusState.NOT_CHECKED,
  vaultInfo: null,
  publishedInfo: null
}; */

export class HiveFeature implements IdentityFeature {
  public vaultStatus$ = new LazyBehaviorSubject<VaultStatus>(null, async () => { this.retrieveVaultStatus(); }); // Latest known vault status for active user

  public vaultAddress$ = new BehaviorSubject<string>(null);

  constructor(protected identity: Identity) { }

  /**
   * Convenience method to get a shared vault services instance for this identity.
   * It also makes sure that the hive vault status has been checked first
   */
  public async getVaultService(): Promise<Vault> {
    await this.awaitHiveVaultReady();
    return getVaultService(this.identity.did);
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
    return getSubscriptionService(this.identity.did);
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
    const subscriptionService = await getSubscriptionService(this.identity.did);
    return subscriptionService.checkSubscription();
  }

  /**
   * Subscribes (= sign up with the vault provider, free tier) active user to the target hive vault provider.
   */
  public async subscribeToHiveProvider(vaultProviderAddress: string): Promise<boolean> {
    logger.log("hive", "Subscribing to hive provider", vaultProviderAddress);

    const didString = this.identity.did;

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
      const subscriptionService = await getSubscriptionService(didString);
      vaultInfo = await subscriptionService.subscribe();
      if (!vaultInfo) {
        // TO CHECK - Failure ?
        logger.error("hive", "Failed to create vault on the hive node");
        return false;
      }
    }

    let vaultServices = await getVaultService(didString);
    if (!vaultServices) {
      logger.error("hive", "NULL vault returned, unable to get the vault for this DID.");
    }
    else {
      // Now try to call an API to see if everything is ok. This will initiate a authentication flow.
      try {
        logger.log("hive", "Calling an api on the hive vault to make sure everything is fine");

        vaultServices = await getVaultService(didString);
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

    const didString = this.identity.did;

    const { ServiceEndpoint } = await lazyElastosHiveSDKImport();

    // Check if we can find an existing vault provider address on DID chain for this user.
    logger.log("hive", "Retrieving vault of current user's DID " + didString);
    const appContext = await getHiveAppContext(didString);
    const serviceEndpoint = new ServiceEndpoint(appContext);

    const vaultProviderInDIDDocument = await serviceEndpoint.getProviderAddress();
    this.vaultAddress$.next(vaultProviderInDIDDocument);

    try {
      // Call the subscription service to actually know if we are registered or not on that vault.
      const subscriptionService = await getSubscriptionService(didString);
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

  /**
   * Sets and saves a NEW vault provider for the active DID, WITHOUT any transfer of data.
   */
  /* public async publishVaultProvider(providerName: string, vaultAddress: string): Promise<boolean> {
    const didString = this.identity.did;

    const subscriptionServices = await getSubscriptionService(didString, vaultAddress);
    if (!subscriptionServices) {
      logger.error('hive', "Failed to create vault on the vault provider for DID " + didString + " at address " + vaultAddress + " because there is no active vault services instance.");
      return false;
    }

    // First try to create the vault on the provider
    try {
      let createdVaultInfo = null;
      try {
        createdVaultInfo = await subscriptionServices.subscribe();
      }
      catch (e) {
        // Maybe already exist. Ignore this exception.
      }

      if (createdVaultInfo) {
        logger.log("hive", "Vault was newly created on the provider. Now updating vault address on user's DID");
        // Vault creation succeeded, we can now save the provider address on ID chain.
      }
      else {
        // Vault already exists on this provider. Nothing to do
        logger.log("hive", "The vault already exists on the vault provider.");
      }

      const publicationStarted = await this.publishVaultProviderToIDChain(providerName, vaultAddress);
      if (publicationStarted) {
        // Force update the provider address.
        await AppContext.getProviderAddressByUserDid(this.identity.did, null, true);
        void this.retrieveVaultStatus();
      }

      return publicationStarted;
    }
    catch (err) {
      logger.error('hive', "Failed to create vault on the vault provider for DID " + didString + " at address " + vaultAddress, err);
      return false;
    }
  } */

  /* private async publishVaultProviderToIDChain(providerName: string, vaultAddress: string): Promise<boolean> {
   logger.log("hive", "Requesting identity app to update the hive provider");

   try {
     let result: { result: { status: string } } = await this.globalIntentService.sendIntent("https://did.elastos.net/sethiveprovider", {
       name: providerName,
       address: vaultAddress
     });

     logger.log("hive", "Got sethiveprovider intent result:", result);

     if (result && result.result && result.result.status && result.result.status == "published") {
       // Vault address was added to user's DID document and publication is on going.
       // Now wait a moment
       return true; // Publishing
     }
     else {
       // Publication was cancelled or errored. Do nothing more. Maybe user will retry.
       logger.log("hive", "Publication cancelled or errored");
       return false;
     }
   }
   catch (err) {
     logger.error("hive", "Error while trying to call the sethiveprovider intent: ", err);
     return false;
   }
    return false;
  } */
}