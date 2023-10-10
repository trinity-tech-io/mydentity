import { getHiveScriptPictureDataUrl } from "@services/hive/hive-pictures.service";
import { BehaviorSubject } from "rxjs";
import { Credential } from "./credential";

export class AppInfoCredential extends Credential {
  public name$ = new BehaviorSubject<string>(null);

  constructor() {
    super();
  }

  protected prepareVerifiableCredential(): void | Promise<void> {
    this.name$.next(this.verifiableCredential?.getSubject().getProperty("name"));
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