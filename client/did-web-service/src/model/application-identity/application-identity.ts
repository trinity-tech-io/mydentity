import { Credential } from "@model/credential/credential";
import { IdentityDTO } from "@model/identity/identity.dto";
import { IdentityProvider } from "@services/identity/did.provider";
import { logger } from "@services/logger";
import { awaitSubjectNonNull } from "@utils/promises";
import moment from "moment";
import { Identity } from "../identity/identity";
import { ProfileFeature } from "./features/profile/profile.feature";

const ApplicationCredentialFullType = "did://elastos/iXyYFboFAd2d9VmfqSvppqg1XQxBtX9ea2/ApplicationCredential#ApplicationCredential";

export class ApplicationIdentity extends Identity {
  constructor() {
    super();
    this.addFeature("profile", new ProfileFeature(this));
  }

  public static async fromJson(json: IdentityDTO, provider: IdentityProvider): Promise<ApplicationIdentity> {
    const identity = new ApplicationIdentity();
    await identity.fillFromJson(json, provider);
    return identity;
  }

  public profile(): ProfileFeature {
    return <ProfileFeature>this.get("profile");
  }

  /**
   * Updates this application identity in the following way:
   * - Delete and re-create the local ApplicationCredential
   * - Delete and re-create the ApplicationCredential in the DID document
   *
   * ApplicationCredential type info:
   * - Published from the credential toolbox
   * - Using Trinity Tech DID
   * - did://elastos/iXyYFboFAd2d9VmfqSvppqg1XQxBtX9ea2/ApplicationCredential
   */
  public async update(appName: string, appIconUrl: string): Promise<Credential> {
    logger.log("identity", "DID Session debug (did):", this.did);

    const properties = {
      name: appName,
      iconUrl: appIconUrl,
      developer: {
        did: ""
      },
      endpoints: {
        redirectUrl: "",
        callbackUrl: "",
        customScheme: ""
      }
    };
    return this.upsertApplicationCredential("#appinfo", properties, ApplicationCredentialFullType);
  }

  private async upsertApplicationCredential(credentialName: string, properties: any, credentialType: string): Promise<Credential> {
    // Make sure credentials are loaded
    await awaitSubjectNonNull(this.credentials().credentials$);

    // Find any existing application credential
    const existingAppCredential = this.credentials().getCredentialByType(credentialType);
    if (existingAppCredential) {
      // Remove the app info VC from the DID document
      await this.document().setCredentialVisibility(existingAppCredential.id, false);
      // Remove the app info VC totally
      await this.credentials().deleteCredential(existingAppCredential);
    }

    logger.log("identity", "Creating application credential");

    const expirationDate = moment().add(5, "years");
    const credential = await this.credentials().createCredential(credentialName, [credentialType], expirationDate.toDate(), properties);

    // Make the newly created credential visible (= in local did document, ready to get published on chain)
    await this.document().setCredentialVisibility(credential.id, true);

    return credential;
  }
}