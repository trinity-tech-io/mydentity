import type { DID, DIDStore, VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import type { DID as ConnDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { Identity } from "@model/identity/identity";
import { logger } from "@services/logger";
import { lazyElastosDIDSDKImport } from "@utils/import-helper";
import moment from "moment";
import Queue from "promise-queue";
import { IdentityFeature } from "../identity-feature";

const didOperationQueue = new Queue(1);
const appInstanceDIDCreationQueue = new Queue(1);

export class DIDFeature implements IdentityFeature {
  constructor(protected identity: Identity) { }

  /**
   * Gets the special App ID credential from the app instance DID. This credential was delivered by
   * a connector and signed with user's DID, after user's approval.
   * The credential contains the real app did used to publish it.
   */
  public async getExistingAppIdentityCredential(appDID: string = null): Promise<VerifiableCredential> {
    return didOperationQueue.add(async () => {
      logger.log("did", "Trying to get an existing app ID credential from storage");

      const storedAppInstanceDID = await this.getOrCreateAppInstanceDID(appDID);
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
          logger.log("did", "Existing credential is expired or almost expired - renewing it");
          return null;
        }
        else {
          logger.log("did", "Returning existing app id credential found in app's local storage", credential);
        }
      }
      else {
        logger.log("did", "No app id credential found for id", fullCredId, "in store", storedAppInstanceDID.didStore);
      }

      return credential;
    });
  }

  /**
   * Get the existing application instance DID if it was created before. Otherwise, a new app instance
   * DID is created and the information is stored in persistent storage for later use.
   *
   * The optional app did string is used to use / create different app instance dids / app id credentials in case several
   * "app dids" are used in the same real app environment. If none provided, the global connectivity application DID is used.
   */
  public async getOrCreateAppInstanceDID(appDID: string = null): Promise<{ did: DID, didStore: DIDStore, storePassword: string }> {
    let didStore: DIDStore = null;
    let did: DID = null;
    let storePassword: string = null;

    return appInstanceDIDCreationQueue.add(async () => {
      logger.log("did", "Getting or creating app instance DID");

      try {
        // Check if we have a app instance DID store saved in our local storage (app manager settings)
        const appInstanceDIDInfo = await this.getExistingAppInstanceDIDInfo(appDID);
        if (appInstanceDIDInfo) {
          // DID store found - previously created. Open it and get the app instance did.
          didStore = await this.openDidStore(appInstanceDIDInfo.storeId);
          if (didStore) { // Make sure the DID store could be loaded, just in case (abnormal case).
            try {
              did = await this.loadDID(didStore, appInstanceDIDInfo.didString);
              storePassword = appInstanceDIDInfo.storePassword;
            }
            catch (err) {
              logger.error("did", err);
            }
          }
        }

        if (!didStore || !did) {
          logger.log("did", "No app instance DID found. Creating a new one");

          // No DID store found. Need to create a new app instance DID.
          const didCreationresult = await this.createNewAppInstanceDID(appDID);
          didStore = didCreationresult.didStore;
          did = didCreationresult.did;
          storePassword = didCreationresult.storePassword;
        }

        // Load credentials first before being able to call getCredential().
        await this.loadDIDCredentials(didStore, did);

        return {
          did,
          didStore,
          storePassword
        };
      }
      catch (e) {
        logger.error("did", e);
      }
    });
  }

  /**
  * Retrieve information about existing app instance info from permanent storage, if any.
  */
  public async getExistingAppInstanceDIDInfo(appDID: string = null): Promise<{ storeId: string, didString: string, storePassword: string }> {
    const sandboxingSuffix = appDID ? `_${appDID}` : "";

    const storage = this.identity.storage();

    const storeId = await storage.get("appinstancedidstoreid" + sandboxingSuffix, null);
    const didString = await storage.get("appinstancedidstring" + sandboxingSuffix, null);
    const storePassword = await storage.get("appinstancedidstorepassword" + sandboxingSuffix, null);

    if (storeId && didString) {
      return {
        storeId: storeId,
        didString: didString,
        storePassword: storePassword
      };
    }

    return null;
  }

  /**
   * Convenient method to:
   * - Create a new DID store
   * - Initiate its private key with a mnemonic
   * - Create a default DID in the store
   *
   * This method should be directly in the DID SDK / DID Plugin. We keep it here private for now
   * for convenience.
   */
  public fastCreateDID(language: string): Promise<ConnDID.FastDIDCreationResult> {
    logger.log("did", "Fast DID creation with language " + language);

    return new Promise(async (resolve, reject) => {
      try {
        const { Mnemonic, DIDStore, RootIdentity } = await lazyElastosDIDSDKImport();

        const mnemonic = await Mnemonic.getInstance(language).generate();
        const didStoreId = this.generateRandomDIDStoreId();

        const didStore = await DIDStore.open(didStoreId);

        // Store created, now init the root identity
        const storePass = this.generateRandomPassword();
        const rootIdentity = await RootIdentity.createFromMnemonic(mnemonic, null, didStore, storePass);

        // Now add a DID
        const didDocument = await rootIdentity.newDid(storePass);
        // DID added, now we can return
        resolve({
          didStoreId,
          didStore: didStore,
          did: didDocument.getSubject(),
          storePassword: storePass
        });
      }
      catch (e) {
        reject(e);
      }
    });
  }

  /**
     * Use the same mechanism as generateRandomDIDStoreId(), this can generate a simple password.
     */
  public generateRandomPassword(): string {
    return this.generateRandomDIDStoreId();
  }

  /**
 * Generates a random ID, suitable for DID store ID format.
 */
  private generateRandomDIDStoreId(len = 6): string {
    let radix = 16;

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      // rfc4122, version 4 form
      let r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data. At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  }

  /**
   * Creates a new application instance DID store, DID, and saves info to permanent storage.
   *
   * The optional app did string is used to use / create different app instance dids / app id credentials in case several
   * "app dids" are used in the same real app environment. If none provided, the global connectivity application DID is used.
   */
  public async createNewAppInstanceDID(appDID: string = null): Promise<{ didStore: DIDStore, didStoreId: string, did: DID, storePassword: string }> {
    const { Mnemonic } = await lazyElastosDIDSDKImport();
    const didCreationResult = await this.fastCreateDID(Mnemonic.ENGLISH);
    await this.saveAppInstanceDIDInfo(appDID, didCreationResult.didStoreId, didCreationResult.did.toString(), didCreationResult.storePassword);

    return {
      didStore: didCreationResult.didStore,
      didStoreId: didCreationResult.didStoreId,
      did: didCreationResult.did,
      storePassword: didCreationResult.storePassword
    }
  }

  /**
   * Saves app instance did info to permanent storage.
   */
  public async saveAppInstanceDIDInfo(appDID: string = null, storeId: string, didString: string, storePassword: string): Promise<void> {
    logger.log("did", "Saving app instance DID info for store " + storeId + " and did " + didString + " and app did " + appDID);

    const sandboxingSuffix = appDID ? `_${appDID}` : "";

    const storage = this.identity.storage();

    await storage.set("appinstancedidstoreid" + sandboxingSuffix, storeId);
    await storage.set("appinstancedidstring" + sandboxingSuffix, didString);
    await storage.set("appinstancedidstorepassword" + sandboxingSuffix, storePassword);
  }

  /**
    * Convenient way to open a DID store from its ID
    */
  private openDidStore(storeId: string): Promise<DIDStore> {
    return new Promise(async (resolve) => {
      try {
        const { DIDStore } = await lazyElastosDIDSDKImport();
        const didStore = await DIDStore.open(storeId);
        resolve(didStore);
      }
      catch (e) {
        resolve(null);
      }
    });
  }

  /**
   * Convenient way to load a DID.
   */
  private loadDID(didStore: DIDStore, didString: string): Promise<DID> {
    return new Promise(async (resolve, reject) => {
      try {
        const didDocument = await didStore.loadDid(didString);
        if (!didDocument)
          reject("Null DIDDocument loaded for did string " + didStore);
        else
          resolve(didDocument.getSubject());
      }
      catch (err) {
        reject(err);
      }
    });
  }

  private loadDIDCredentials(didStore: DIDStore, did: DID): Promise<VerifiableCredential[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const credentialUrls = await didStore.listCredentials(did.toString());
        const credentials: VerifiableCredential[] = [];
        for (const url of credentialUrls) {
          credentials.push(await didStore.loadCredential(url));
        }
        resolve(credentials);
      }
      catch (e) {
        reject(e);
      }
    });
  }
}
