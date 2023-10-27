import { Credential } from "@model/credential/credential";
import { CredentialValueConverter } from "../credential-value-converter";
import { ProfileCredentialInfoEditionType } from "../profile-credential-info";

export type AvatarInfoToSubject = {
  mimeType: string;
  hiveDownloadScriptUrl: string;
}

/**
 * Representation of an avatar picture inside a DID credential.
 */
type AvatarCredentialSubject = {
  avatar: {
    "content-type": string,
    "type": string,
    "data": string
  }
}

/**
 * Hive avatar image
 */
export class CredentialValueConverterAvatar extends CredentialValueConverter<AvatarInfoToSubject> {
  constructor(private subjectKey: string) {
    super(ProfileCredentialInfoEditionType.Undefined);
  }

  public toEditableValue(credential: Credential): AvatarInfoToSubject {
    return credential.verifiableCredential.getSubject().getProperty(this.subjectKey);
  }

  public toDisplayableValue(credential: Credential): string {
    return null; // Can't find any nice displayable string value for avatars
  }

  public toFormatDisplayableValue(preprocessedValue: any): string {
    return null
  }

  public toSubject(editedValue: AvatarInfoToSubject): any {
    return this.buildAvatar(<any>editedValue.mimeType, "elastoshive", editedValue.hiveDownloadScriptUrl);
  }

  private buildAvatar(contentType: "image/jpeg" | "image/png", type: "base64" | "elastoshive", data: string): AvatarCredentialSubject {
    return {
      avatar: {
        "content-type": contentType,
        "type": type,
        "data": data
      }
    };
  }
}
