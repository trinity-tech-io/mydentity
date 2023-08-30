import { ProfileCredentialInfo } from "@services/identity-profile-info/profile-credential-info";
import { capitalizeFirstLetter } from "@utils/strings";
import { Credential } from "./credential";

export class ProfileCredential extends Credential {
  constructor(private profileInfo: ProfileCredentialInfo) {
    super();
  }

  protected prepareTitle() {
    const displayableCredentialTitle = this.getDisplayableCredentialTitle();
    if (displayableCredentialTitle)
      this.title = displayableCredentialTitle;
    else {
      this.title = capitalizeFirstLetter(this.profileInfo.key); // TODO: replace with a real nice title put inside info objects
    }
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