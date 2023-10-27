import { Credential } from "@model/credential/credential";
import { CredentialValueConverter } from "../credential-value-converter";
import { ProfileCredentialInfoEditionType } from "../profile-credential-info";

/**
 * Default string management: single string during edition, single string in the subject.
 */
export class CredentialValueConverterString extends CredentialValueConverter<string> {
  constructor(private subjectKey: string) {
    super(ProfileCredentialInfoEditionType.SingleLineString);
  }

  public toEditableValue(credential: Credential): string {
    return credential.verifiableCredential.getSubject().getProperty(this.subjectKey);
  }

  public toDisplayableValue(credential: Credential): string {
    return credential.verifiableCredential.getSubject().getProperty(this.subjectKey);
  }

  public toFormatDisplayableValue(preprocessedValue: any): string {
    return preprocessedValue
  }

  public toSubject(editedValue: string): any {
    return {
      [this.subjectKey]: editedValue
    }
  }
}
