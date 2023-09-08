import { Credential } from "@model/credential/credential";
import { CredentialValueConverter } from "../credential-value-converter";
import { ProfileCredentialInfoEditionType } from "../profile-credential-info";
import { initialsString, converGenderFullName } from "@utils/strings";

/**
 * Gender
 */
export class CredentialValueConverterGender extends CredentialValueConverter<string> {
  constructor(private subjectKey: string) {
    super(ProfileCredentialInfoEditionType.Gender);
  }

  // return: male/famle
  public toEditableValue(credential: Credential): string {
    return converGenderFullName(credential.verifiableCredential.getSubject().getProperty(this.subjectKey))
  }

  // return: male/famle
  public toDisplayableValue(credential: Credential): string {
    return converGenderFullName(credential.verifiableCredential.getSubject().getProperty(this.subjectKey))
  }

  // return: {gender: M/F}
  public toSubject(editedValue: string): any {
    return {
      [this.subjectKey]: initialsString(editedValue)
    }
  }
}
