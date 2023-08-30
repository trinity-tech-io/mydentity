import { ProfileCredentialInfo } from "@services/identity-profile-info/profile-credential-info";
import { capitalizeFirstLetter } from "@utils/strings";
import { Credential } from "./credential";

export class ProfileCredential extends Credential {
  constructor(private profileInfo: ProfileCredentialInfo) {
    super();
  }

  protected prepareDisplayTitle() {
    const displayableCredentialTitle = this.getDisplayableCredentialTitle();
    if (displayableCredentialTitle)
      this.displayTitle = displayableCredentialTitle;
    else {
      this.displayTitle = capitalizeFirstLetter(this.profileInfo.key); // TODO: replace with a real nice title put inside info objects
    }
  }

  protected prepareDisplayValue() {
    const displayableCredentialTitle = this.getDisplayableCredentialTitle();
    if (displayableCredentialTitle)
      this.displayValue = displayableCredentialTitle;
    else {
      this.displayValue = this.profileInfo.options.converter.toDisplayableValue(this);
    }
  }

  /**
   * Profile info to use to generate, edit and display this credential
   */
  public getProfileInfo(): ProfileCredentialInfo {
    return this.profileInfo;
  }
}