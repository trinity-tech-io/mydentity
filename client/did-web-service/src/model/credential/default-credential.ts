import { JSONObject } from "@model/json";
import { Credential } from "./credential";

export class DefaultCredential extends Credential {

  /**
   * Default implementation to determine an icon for this basic credential.
   * Inheriting credentials such as app info credential or avatar credential
   * fully override this method with their own way to get their icons.
   */
  protected async prepareRepresentativeIcon(): Promise<void> {
    const subject = <any>this.verifiableCredential.getSubject().getProperties();

    // If the credential implements the DisplayableCredential interface, we get the icon from this.
    if ("displayable" in subject) {
      const icon = (subject["displayable"] as JSONObject)["icon"] as string
      this.representativeIcon$.next(icon);
    }
    else {
      // Use a default icon, we can't do better
      this.representativeIcon$.next(this.getFallbackIcon());
    }

    this.loadIconWithFallback();
  }
}