import { ProfileCredentialInfo } from "@services/identity-profile-info/profile-credential-info";
import { Credential } from "./credential";

export class ProfileCredential extends Credential {
  constructor(private profileInfo: ProfileCredentialInfo) {
    super();
  }

  /**
   * Profile info to use to generate, edit and display this credential
   */
  public getProfileInfo(): ProfileCredentialInfo {
    return this.profileInfo;
  }

  /**
   * Return the credential's friendly display value using the info converter.
   */
  public getProfileDisplayValue(): any {
    return this.profileInfo.options.converter.toDisplayableValue(this);
  }
}