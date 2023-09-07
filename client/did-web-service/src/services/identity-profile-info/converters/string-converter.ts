import { Credential } from "@model/credential/credential";
import { CredentialValueConverter } from "../credential-value-converter";
import { ProfileCredentialInfoEditionType } from "../profile-credential-info";

/**
 * Default string management: single string during edition, single string in the subject.
 */
export class CredentialValueConverterString extends CredentialValueConverter<string> {
  constructor(private subjectKey: string) {
    if (subjectKey === "avatar") {
      super(ProfileCredentialInfoEditionType.Undefined);
    } else if (subjectKey === 'email') {
      super(ProfileCredentialInfoEditionType.SingleLineString)
    } else if (subjectKey === "birthDate") {
      super(ProfileCredentialInfoEditionType.Date);
    } else if (subjectKey === "nationality") {
      super(ProfileCredentialInfoEditionType.Country);
    } else if (subjectKey === "gender") {
      super(ProfileCredentialInfoEditionType.Gender);
    }
    else {
      super(ProfileCredentialInfoEditionType.Undefined);
    }
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
