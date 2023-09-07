import { Credential } from "@model/credential/credential";
import { CredentialValueConverter } from "../credential-value-converter";
import { ProfileCredentialInfoEditionType } from "../profile-credential-info";

/**
 * Gender
 */
export class CredentialValueConverterGender extends CredentialValueConverter<string> {
  constructor(private subjectKey: string) {
    super(ProfileCredentialInfoEditionType.Gender);
  }

  public toEditableValue(credential: Credential): string {
    return credential.verifiableCredential.getSubject().getProperty(this.subjectKey);
  }

  public toDisplayableValue(credential: Credential): string {
    return credential.verifiableCredential.getSubject().getProperty(this.subjectKey);
  }

  public toSubject(editedValue: string): any {
    return {
      [this.subjectKey]: editedValue
    }
  }
}
