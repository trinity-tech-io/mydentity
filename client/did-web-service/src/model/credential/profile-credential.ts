import { ProfileCredentialInfo } from "@services/identity-profile-info/profile-credential-info";
import { capitalizeFirstLetter } from "@utils/strings";
import { Credential } from "./credential";
import { findProfileInfoByTypes } from "@services/identity-profile-info/identity-profile-info.service";
import { defaultProfileIcons } from "./profile-info-icons";

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

  protected formatValue(preprocessedValue: any): string {
    return this.profileInfo.options.converter.toFormatDisplayableValue(preprocessedValue)
  }

  // // TODO: REMOVE : TO BE TEST
  // protected prepareDisplayValue(): void {
  //   this.displayValue = this.profileInfo.options.converter.toDisplayableValue(this);
  // }

  /**
   * Profile info to use to generate, edit and display this credential
   */
  public getProfileInfo(): ProfileCredentialInfo {
    return this.profileInfo;
  }

  protected async prepareRepresentativeIcon(): Promise<void> {
    const fragmentInfo = this.verifiableCredential.getType();
    // TODO: NOT GOOD HERE - SHOULD BE IN THE PROFILE CREDENTIAL CLASS
    const profileInfo = findProfileInfoByTypes(fragmentInfo);
    const fragment = profileInfo?.key;
    const key = defaultProfileIcons[fragment]
    if (key === undefined || key === null) {
      const defaultIcon = defaultProfileIcons['default'];
      this.representativeIcon$.next(defaultIcon);
    }
    else
      this.representativeIcon$.next(key);
  }
}