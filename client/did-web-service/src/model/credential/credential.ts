import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { JSONObject } from "@model/json";
import { evalObjectFieldPath } from "@utils/objects";
import { capitalizeFirstLetter } from "@utils/strings";

type ValueItem = {
  name: string,
  value: string
};

export class Credential {
  // Backend data
  public id: string = null;
  public createdAt: Date = null;
  public verifiableCredential: VerifiableCredential;

  // Computed client data
  protected displayTitle: string;
  protected displayValue: string = null;
  private iconSrc: string = null;
  private onIconReadyCallback: (iconSrc: string) => void = null;

  /**
   * Prepare all display data.
   */
  public prepareForDisplay() {
    this.prepareDisplayTitle();
    this.prepareDisplayValue();
    void this.prepareIcon();
  }

  protected getDisplayableCredentialTitle(): string {
    // If the credential implements the DisplayableCredential type, get the title from there.
    let credProps = this.verifiableCredential.getSubject();
    if ("displayable" in credProps) {
      this.displayTitle = (credProps["displayable"] as JSONObject)["title"] as string;
    }
    else {
      return null;
    }
  }

  protected prepareDisplayTitle() {
    const displayableCredentialTitle = this.getDisplayableCredentialTitle();
    if (displayableCredentialTitle)
      this.displayTitle = displayableCredentialTitle;
    else {
      // Fallback try to guess a name, or use a default display
      let fragment = this.verifiableCredential.getId().getFragment();
      this.displayTitle = capitalizeFirstLetter(fragment);
    }
  }

  protected getDisplayableCredentialDescription(): string {
    let credProps = this.verifiableCredential.getSubject();
    if ("displayable" in credProps) {
      // rawDescription sample: hello ${firstName} ${lastName.test}
      let rawDescription = (credProps["displayable"] as JSONObject)["description"] as string;

      // From a raw description, find all special ${...} tags and replace them with values from the subject.
      if (rawDescription) {
        let tagsMatch = rawDescription.match(/\${([a-zA-Z0-9.]+)}/g);
        let keywordTags = tagsMatch ? Array.from(tagsMatch) : [];

        let description = rawDescription;
        for (let tag of keywordTags) {
          // tag: ${xxx}
          // matchingGroup: ['${...}', '...'];
          let matchingGroup = tag.match(/\${([a-zA-Z0-9.]+)}/);
          if (matchingGroup && matchingGroup.length > 1) {
            let jsonFieldPath = matchingGroup[1];
            let evaluatedField = evalObjectFieldPath(credProps, jsonFieldPath);
            description = description.replace(tag, evaluatedField);
          }
        }
        return description;
      }
    }
    else {
      return null;
    }
  }

  /**
   * Tries to extract a user friendly "description" of the credential, ie a readable summary
   * of its content.
   */
  protected prepareDisplayValue() {
    const displayableCredentialDescription = this.getDisplayableCredentialDescription();
    if (displayableCredentialDescription)
      this.displayValue = displayableCredentialDescription;
    else {
      // TODO: if only one field, show the field value instead of a json data
      this.displayValue = JSON.stringify(this.getValueItems());
    }
  }

  public getDisplayValue(): any {
    return this.displayValue;
  }

  /**
   * Values representing the credential content, if the credential is not a DisplayableCredential.
   * typically, this is the list JSON fields.
   * Returns null if nothing can be displayed easily.
   */
  public getValueItems = (): ValueItem[] => {
    let fragment = this.verifiableCredential.getId().getFragment();
    if (fragment === "avatar")
      return null;

    let subject = this.verifiableCredential.getSubject().getProperties();
    // TODO: rework with displayable credential - for now, display raw properties
    return Object.keys(subject)
      .filter((key) => key != "id")
      .filter((key) => key != "displayable")
      .sort()
      .map((prop) => {
        let value = '';
        if (prop == 'wallet') {
          value = 'wallet';
          if (subject[prop]) {
            //TODO
            //   let networkWallet = WalletService.instance.getNetworkWalletByWalletCredential(subject[prop]);
            //   if (networkWallet) {
            //     value += ' - ' + networkWallet.masterWallet.name;
            //   }
          }
        } else if (prop == 'gender') {
          // TODO: NOT OK, "gender" can be used with various VC types, not especially M/F
          if (subject[prop] == 'M' || subject[prop] == 'male') {
            value = "male";
          } else if (subject[prop] == 'F' || subject[prop] == 'female') {
            value = "female";
          }
        } else {
          value = subject[prop].toString() != ""
            ? subject[prop].toString()
            : "not set";
        }

        return {
          name: prop,
          value: value
        };
      });
  }


  private async prepareIcon(): Promise<void> {
    // if (this.hasRemotePictureToFetch()) { // Remote picture to fetch
    //     let avatarCredential = this.pluginVerifiableCredential;
    //     if (avatarCredential.getSubject() && avatarCredential.getSubject().avatar && avatarCredential.getSubject().avatar.data) {
    //         let hiveAssetUrl: string = avatarCredential.getSubject().avatar.data;
    //         let avatarCacheKey = hiveAssetUrl;

    //         if (hiveAssetUrl.startsWith("hive://")) {
    //             Logger.log("identity", "Refreshing picture from hive url", hiveAssetUrl);
    //           // eslint-disable-next-line @typescript-eslint/no-misused-promises
    //           /* this.hiveCacheDataUrlSub = */ GlobalHiveCacheService.instance.getAssetByUrl(avatarCacheKey, hiveAssetUrl).subscribe(async rawData => {
    //                 //console.log("DEBUG HIVE CACHE CHANGED IN PROFILE SERVICE, NEXT", /* rawData */)
    //                 if (rawData) {
    //                     Logger.log("identity", "Got raw picture data from hive");
    //                     let base64DataUrl = await rawImageToBase64DataUrl(rawData);
    //                     //console.log("DEBUG BASE64 ENCODED", /* base64DataUrl */);
    //                     this.iconSrc = base64DataUrl;
    //                 }
    //                 else {
    //                     Logger.log("identity", "Got empty picture data from the hive cache service (real picture may come later)");
    //                     this.iconSrc = null;
    //                 }
    //                 this.loadIconWithFallback();
    //             });
    //         }
    //         else {
    //             // Assume base64.
    //             let avatar = await Avatar.fromAvatarCredential(avatarCredential.getSubject().avatar as CredentialAvatar);
    //             this.iconSrc = avatar.toBase64DataUrl();
    //             this.loadIconWithFallback();
    //         }
    //     }
    // }
    // else { // No remote picture to fetch
    //     // If the credential implements the DisplayableCredential interface, we get the icon from this.
    //     let credProps = this.pluginVerifiableCredential.getSubject();
    //     if ("displayable" in credProps) {
    //         this.iconSrc = (credProps["displayable"] as JSONObject)["icon"] as string;
    //     }
    //     else {
    //         // Fallback for old style credentials - try to guess an icon, or use a defaut one.
    //         let fragment = this.pluginVerifiableCredential.getFragment();

    //         if (!BasicCredentialsService.instance.getBasicCredentialkeys().some(x => x == fragment)) {
    //             fragment = "finger-print";
    //         }

    //         this.iconSrc = `/assets/identity/smallIcons/dark/${fragment}.svg`;
    //     }

    //     this.loadIconWithFallback();
    // }
  }

  /**
   * Tries to load the target picture, and in case of error, replaces the icon src with
   * a placeholder.
   */
  private loadIconWithFallback() {
    if (this.iconSrc == null) {
      this.iconSrc = this.getFallbackIcon();
    }

    let image = new Image();
    image.crossOrigin = 'anonymous';

    image.onload = () => {
      this.iconSrc = image.src;
      this.onIconReadyCallback?.(this.iconSrc);
    };
    image.onerror = () => {
      this.iconSrc = this.getFallbackIcon();
      this.onIconReadyCallback?.(this.iconSrc);
    };

    // Try to load the picture
    image.src = this.iconSrc;
  }

  /**
   * Fallback icon used either when the real icon is not loaded yet, or failed to load
   */
  public getFallbackIcon(): string {
    if (!this.isUserAvatar())
      return "assets/identity/smallIcons/dark/finger-print.svg";
    else
      return "assets/identity/smallIcons/dark/name.svg";
  }

  // TODO - rework - basic way of checking if the credential is an avatar.
  // Rework using a specific avatar credential type.
  private hasRemotePictureToFetch(): boolean {
    let fragment = this.verifiableCredential.getId().getFragment();
    if (fragment === "avatar") {
      return true;
    } else {
      return false;
    }
  }

  /**
  * Similar to hasRemotePictureToFetch() but more narrow (only for pictures representing faces)
  */
  private isUserAvatar(): boolean {
    let fragment = this.verifiableCredential.getId().getFragment();
    return (fragment === "avatar");
  }

  /**
   * Icon source directly display in a HTML <img>. Either a url, or a base64 image.
   */
  public getDisplayableIconSrc(): string {
    return this.iconSrc;
  }

  /**
   * "Title" best representing this credential on the UI
   */
  public getDisplayableTitle(): string {
    return this.displayTitle;
  }

  public onIconReady(callback: (iconSrc: string) => void) {
    this.onIconReadyCallback = callback;
  }

  /**
   * Convenient shortcut to the real credential
   */
  public getSubject(): VerifiableCredential.Subject {
    return this.verifiableCredential.getSubject();
  }

  /**
   * Convenient shortcut to the real credential
   */
  public getFragment(): any {
    return this.verifiableCredential.getId().getFragment();
  }

  /**
   * Convenient shortcut to the real credential
   */
  public getTypes(): any {
    return this.verifiableCredential.getType();
  }

  /**
   * Convenient shortcut to the real credential
   */
  public getId(): any {
    return this.verifiableCredential.getId();
  }

  /**
   * Tells if this credentials is considered as sensitive, meaning that users should be careful
   * while publishing or sharing such credential.
   */
  public isSensitiveCredential(): boolean {
    return this.verifiableCredential.getType().indexOf("SensitiveCredential") >= 0;
  }

  public getIssuer(): string {
    return this.verifiableCredential.getIssuer().toString();
  }

  public equals(otherCredential: Credential): boolean {
    return this.id === otherCredential.id;
  }
}