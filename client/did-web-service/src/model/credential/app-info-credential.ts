import { getHiveScriptPictureDataUrl } from "@services/hive/hive-pictures.service";
import { Credential } from "./credential";

export class AppInfoCredential extends Credential {
  constructor() {
    super();
  }

  protected async prepareRepresentativeIcon(): Promise<void> {
    const subject = <any>this.verifiableCredential.getSubject().getProperties();

    const iconUrl: string = subject.iconUrl;
    if (iconUrl.startsWith("hive://")) {
      this.representativeIcon$.next(await getHiveScriptPictureDataUrl(iconUrl));
      this.loadIconWithFallback();
    }
    else {
      console.warn("Unhandled app info icon format");
    }
  }
}