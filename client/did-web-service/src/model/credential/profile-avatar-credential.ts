import { getHiveScriptPictureDataUrl } from "@services/hive/hive-pictures.service";
import { ProfileCredential } from "./profile-credential";

/**
 * Credential to hold regular identities profile avatar (= main profile icon)
 */
export class ProfileAvatarCredential extends ProfileCredential {
  protected async prepareRepresentativeIcon(): Promise<void> {
    console.log("AVATAR prepareRepresentativeIcon")
    const subject = <any>this.verifiableCredential.getSubject().getProperties();

    const iconUrl: string = subject.avatar.data;
    if (iconUrl.startsWith("hive://")) {
      this.representativeIcon$.next(await getHiveScriptPictureDataUrl(iconUrl));
      this.loadIconWithFallback();
    }
    else {
      // Assume base64.
      /* const avatar = await Avatar.fromAvatarCredential(subject.avatar as CredentialAvatar);
      this.iconSrc = avatar.toBase64DataUrl();
      this.loadIconWithFallback(); */

      // TODO:
      console.warn("Unhandled avatar credentials format");
    }
  }
}