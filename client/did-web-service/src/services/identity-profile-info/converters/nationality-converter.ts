import { Credential } from "@model/credential/credential";
import { CredentialValueConverter } from "../credential-value-converter";
import { ProfileCredentialInfoEditionType } from "../profile-credential-info";

type NationalityCredentialSubject = {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

/**
 * Nationality 
 */
export class CredentialValueConverterNationality extends CredentialValueConverter<NationalityCredentialSubject> {
  constructor(private subjectKey: string) {
    super(ProfileCredentialInfoEditionType.Country);
  }

  public toEditableValue(credential: Credential): NationalityCredentialSubject {
    return credential.verifiableCredential.getSubject().getProperty(this.subjectKey);
  }

  public toDisplayableValue(credential: Credential): string {
    console.log("TODO: REMOVE: nationality-converter toDisplayableValue >>>>>>>>>>>>>>>>>>>>>>> displayableCredentialDescription:", credential.verifiableCredential.getSubject().getProperty(this.subjectKey))
    return credential.verifiableCredential.getSubject().getProperty(this.subjectKey).label
  }

  public toSubject(editedValue: NationalityCredentialSubject): any {
    return {
      [this.subjectKey]: editedValue
    }
  }
}
