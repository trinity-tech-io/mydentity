import { Credential } from "@model/credential/credential";
import { CredentialValueConverter } from "../credential-value-converter";
import { ProfileCredentialInfoEditionType } from "../profile-credential-info";
import { convertUtcToLocaleDateTime } from "@utils/strings";

export class CredentialValueConverterDate extends CredentialValueConverter<Date> {
  constructor(private subjectKey: string) {
    super(ProfileCredentialInfoEditionType.Date);
  }

  public toEditableValue(credential: Credential): Date {
    return credential.verifiableCredential.getSubject().getProperty(this.subjectKey);
  }

  public toDisplayableValue(credential: Credential): string {
    return convertUtcToLocaleDateTime(credential.verifiableCredential.getSubject().getProperty(this.subjectKey))
  }

  public toSubject(editedValue: Date): any {
    return {
      [this.subjectKey]: editedValue
    }
  }
}
