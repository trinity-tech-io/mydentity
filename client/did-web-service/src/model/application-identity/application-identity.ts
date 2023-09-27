import { IdentityDTO } from "@model/identity/identity.dto";
import { logger } from "@services/logger";
import { Identity } from "../identity/identity";
import { IdentityProvider } from "@services/identity/did.provider";

export class ApplicationIdentity extends Identity {
  public static async fromJson(json: IdentityDTO, provider: IdentityProvider): Promise<ApplicationIdentity> {
    const identity = new ApplicationIdentity();
    await identity.fillFromJson(json, provider);
    return identity;
  }

  /**
   * Updates the app's did document with all the required info that we have locally
   *
   * TODO: rename, put in a feature?
   */
  public async updateDIDDocument(developerDID: string, appName: string, appIconUrl: string, nativeRedirectUrl: string, nativeCallbackUrl: string, nativeCustomScheme: string): Promise<void> {
    logger.log("identity", "DID Session debug (did):", this.did);

    const properties = {
      name: appName,
      iconUrl: appIconUrl,
      developer: {
        did: developerDID
      },
      endpoints: {
        redirectUrl: nativeRedirectUrl,
        callbackUrl: nativeCallbackUrl,
        customScheme: nativeCustomScheme
      }
    };
    await this.updateDIDDocumentsWithApplicationCredential("#appinfo", properties, "ApplicationCredential");
  }

  private updateDIDDocumentsWithApplicationCredential(credentialName: string, properties: any, credentialType: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise((resolve, reject) => {
      // TODO

      /* let validityDays: any = 5 * 365; // 5 years

      // Create a new credential that contains all the app info, in our local DID
      // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
      this.did.issueCredential(this.didString, credentialName, [credentialType], validityDays, properties, this.storePassword, async credential => {
        logger.log("developertools", "Credential issued:", credential);
        // Also add this credential into the local DID document, ready for publishing.

        logger.log("developertools", "Removing existing credential " + credentialName + " if any");
        await this.deleteExistingCredentialIfAny(credentialName);

        logger.log("developertools", "Adding the new " + credentialName + " credential to the DID document");
        this.didDocument.addCredential(credential, this.storePassword, () => {
          logger.log("developertools", "DIDDocument after update: ", this.didDocument)
          resolve();
        }, err => {
          reject(err);
        });
      }, err => {
        reject(err);
      }); */
    });
  }

  // TODO: move to credentials feature
  private deleteExistingCredentialIfAny(credentialName: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise((resolve, reject) => {
      // TODO

      /* let credential = this.didDocument.getCredential(credentialName);
      if (credential) {
        this.didDocument.deleteCredential(credential, this.storePassword, () => {
          resolve();
        }, (err) => {
          reject(err);
        });
      }
      else {
        // Do nothing, no such credential yet.
        resolve();
      } */
    });
  }

}