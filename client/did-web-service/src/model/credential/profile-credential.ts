import { ProfileCredentialInfo } from "@services/identity-profile-info/profile-credential-info";
import { capitalizeFirstLetter } from "@utils/strings";
import { Credential } from "./credential";

export class ProfileCredential extends Credential {
  constructor(private profileInfo: ProfileCredentialInfo) {
    super();
  }

  protected prepareDisplayTitle(): void {
    const displayableCredentialTitle = this.getDisplayableCredentialTitle();
    if (displayableCredentialTitle)
      this.displayTitle = displayableCredentialTitle;
    else {
      this.displayTitle = capitalizeFirstLetter(this.profileInfo.key); // TODO: replace with a real nice title put inside info objects
    }
  }

  protected prepareDisplayValue(): void {
    this.displayValue = this.profileInfo.options.converter.toDisplayableValue(this);
  }

  /**
   * Profile info to use to generate, edit and display this credential
   */
  public getProfileInfo(): ProfileCredentialInfo {
    return this.profileInfo;
  }
}