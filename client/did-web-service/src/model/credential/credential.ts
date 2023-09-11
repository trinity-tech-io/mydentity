import AccountIcon from '@assets/images/account.svg';
import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { JSONObject } from "@model/json";
import { credentialTypesService } from "@services/credential-types/credential.types.service";
import { getHiveScriptPictureDataUrl } from "@services/hive/hive-pictures.service";
import { activeIdentity$ } from "@services/identity/identity.events";
import { identityService } from "@services/identity/identity.service";
import { issuerService } from "@services/identity/issuer.service";
import { logger } from "@services/logger";
import { evalObjectFieldPath } from "@utils/objects";
import { capitalizeFirstLetter, isDefaultLocalIcon } from "@utils/strings";
import { BehaviorSubject } from "rxjs";
import { IssuerInfo } from "./issuer-info";
import { defaultProfileIcons } from "./profile-info-icons";
import { LazyBehaviorSubject } from '@utils/lazy-behavior-subject';

type ValueItem = {
  name: string,
  value: string
};

export class Credential {
  public issuerInfo$ = new LazyBehaviorSubject<IssuerInfo>(null, () => this.fetchIssuerInfo());

  public isConform$ = new LazyBehaviorSubject<boolean>(null, () => this.verifyCredential());

  // Path to display the icon that best represents this credential.
  public representativeIcon$ = new BehaviorSubject<string | JSX.Element>(null);

  // Backend data
  public id: string = null;
  public createdAt: Date = null;
  public verifiableCredential: VerifiableCredential;

  // Computed client data
  protected displayTitle: string;
  protected displayValue: any = null;
  private onIconReadyCallback: (iconSrc: string | JSX.Element) => void = null;

  /**
   * Prepare all display data.
   */
  public prepareForDisplay(): void {
    this.prepareDisplayTitle();
    this.prepareDisplayValue();
    void this.prepareIcon();
  }

  protected getDisplayableCredentialTitle(): string {
    // If the credential implements the DisplayableCredential type, get the title from there.
    const credProps = this.verifiableCredential.getSubject();
    if ("displayable" in credProps) {
      this.displayTitle = (credProps["displayable"] as JSONObject)["title"] as string;
    }
    else {
      return null;
    }
  }

  protected prepareDisplayTitle(): void {
    const displayableCredentialTitle = this.getDisplayableCredentialTitle();
    if (displayableCredentialTitle)
      this.displayTitle = displayableCredentialTitle;
    else {
      // Fallback try to guess a name, or use a default display
      const fragment = this.verifiableCredential.getId().getFragment();
      this.displayTitle = capitalizeFirstLetter(fragment);
    }
  }

  protected getDisplayableCredentialDescription(): string {
    const credProps = this.verifiableCredential.getSubject().getProperties();
    if ("displayable" in credProps) {
      // rawDescription sample: hello ${firstName} ${lastName.test}
      const rawDescription = (credProps["displayable"] as JSONObject)["description"] as string;

      // From a raw description, find all special ${...} tags and replace them with values from the subject.
      if (rawDescription) {
        const tagsMatch = rawDescription.match(/\${([a-zA-Z0-9.]+)}/g);
        const keywordTags = tagsMatch ? Array.from(tagsMatch) : [];

        let description = rawDescription;
        for (const tag of keywordTags) {
          // tag: ${xxx}
          // matchingGroup: ['${...}', '...'];
          const matchingGroup = tag.match(/\${([a-zA-Z0-9.]+)}/);
          if (matchingGroup && matchingGroup.length > 1) {
            const jsonFieldPath = matchingGroup[1];
            const evaluatedField = evalObjectFieldPath(credProps, jsonFieldPath);
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
  protected prepareDisplayValue(): void {
    const displayableCredentialDescription = this.getDisplayableCredentialDescription();
    if (displayableCredentialDescription)
      this.displayValue = displayableCredentialDescription;
    else {
      const valueItems = this.getValueItems();
      if (valueItems.length <= 1) {
        this.displayValue = valueItems[0]?.value;
      } else {
        this.displayValue = JSON.stringify(valueItems);
      }
    }
  }

  public getDisplayValue(): any {
    return this.displayValue
  }

  /**
   * Values representing the credential content, if the credential is not a DisplayableCredential.
   * typically, this is the list JSON fields.
   * Returns null if nothing can be displayed easily.
   */
  public getValueItems = (): ValueItem[] => {
    const fragment = this.verifiableCredential.getId().getFragment();
    if (fragment === "avatar")
      return null;

    const subject = this.verifiableCredential.getSubject().getProperties();
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
    const activeIdentity = activeIdentity$.value;
    const subject = <any>this.verifiableCredential.getSubject().getProperties();

    if (this.hasRemotePictureToFetch()) { // Remote picture to fetch
      if (subject.avatar && subject.avatar?.data) {
        const hiveAssetUrl: string = subject.avatar.data;
        const avatarCacheKey = hiveAssetUrl;

        if (hiveAssetUrl.startsWith("hive://")) {
          logger.log("credential", "Refreshing picture from hive url", hiveAssetUrl);
          // NOTE: assume we use the currently active identity to authenticate to target hive vault for calling the picture script
          const dataUrl = await getHiveScriptPictureDataUrl(hiveAssetUrl, activeIdentity.did);
          if (dataUrl) {
            logger.log("credential", "Got picture data from hive");
            this.representativeIcon$.next(dataUrl);
          }
          else {
            logger.log("idencredentialtity", "Got empty picture data from the hive cache service (real picture may come later)");
            this.representativeIcon$.next(null);
          }
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
    else { // No remote picture to fetch
      // If the credential implements the DisplayableCredential interface, we get the icon from this.
      if ("displayable" in subject) {
        this.representativeIcon$.next((subject["displayable"] as JSONObject)["icon"] as string);
      }
      else {
        // Fallback for old style credentials - try to guess an icon, or use a defaut one.

        // let fragment = this.verifiableCredential.getId().getFragment();
        // TODO: NOT GOOD HERE - SHOULD BE IN THE PROFILE CREDENTIAL CLASS
        // const profileInfo = findProfileInfoByTypes([fragment]);
        // fragment = profileInfo?.key || FingerPrintIcon;

        const key = defaultProfileIcons[this.getDisplayableTitle()]

        this.representativeIcon$.next(key);
      }

      this.loadIconWithFallback();
    }
  }

  /**
   * Tries to load the target picture, and in case of error, replaces the icon src with
   * a placeholder.
   */
  private loadIconWithFallback(): void {
    if (this.representativeIcon$.value == null) {
      this.representativeIcon$.next(this.getFallbackIcon());
    }

    if (isDefaultLocalIcon(this.representativeIcon$.value as string)) return
    const image = new Image();
    image.crossOrigin = 'anonymous';

    image.onload = (): void => {
      this.representativeIcon$.next(image.src);
      this.onIconReadyCallback?.(this.representativeIcon$.value as string);
    };
    image.onerror = (): void => {
      this.representativeIcon$.next(this.getFallbackIcon());
      this.onIconReadyCallback?.(this.representativeIcon$.value);
    };

    // Try to load the picture
    image.src = this.representativeIcon$.value as string;
  }

  /**
   * Fallback icon used either when the real icon is not loaded yet, or failed to load
   */ // TODO: icon
  public getFallbackIcon(): string | JSX.Element {
    if (!this.isUserAvatar())
      return AccountIcon;
    else
      return AccountIcon;
  }

  // TODO - rework - basic way of checking if the credential is an avatar.
  // Rework using a specific avatar credential type.
  private hasRemotePictureToFetch(): boolean {
    const fragment = this.verifiableCredential.getId().getFragment();
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
    const fragment = this.verifiableCredential.getId().getFragment();
    return (fragment === "avatar");
  }

  /**
   * "Title" best representing this credential on the UI
   */
  public getDisplayableTitle(): string {
    return this.displayTitle;
  }

  public onIconReady(callback: (iconSrc: string | JSX.Element) => void): void {
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

  /**
  * Tells if the issuer of credential is the active user (self) or not
  */
  public selfIssued(): boolean {
    return this.verifiableCredential.getIssuer().toString() === identityService.getActiveIdentityId();
  }

  public getIssuer(): string {
    return this.verifiableCredential.getIssuer().toString();
  }

  private async fetchIssuerInfo(): Promise<IssuerInfo> {
    const issuerDidString = this.verifiableCredential.getIssuer().toString();
    logger.log('credential', 'fetchIssuerInfo:', issuerDidString)

    let issuerName = null;
    let issuerIcon = null;

    const isPublished = await issuerService.isPublished(issuerDidString);
    if (isPublished) {
      issuerName = await issuerService.getIssuerName(issuerDidString);
      issuerIcon = await issuerService.getIssuerAvatar(issuerDidString);
    }
    const issuerInfo = { avatarIcon: issuerIcon, didString: issuerDidString, name: issuerName, isPublished: isPublished };
    logger.log('credential', 'got issuer info:', issuerInfo)
    return issuerInfo;
  }

  /**
   * Checks confirmity of this credentials to credential contexts/types and tells if the
   * credential is "conform" or not.
   */
  private async verifyCredential(): Promise<boolean> {
    return await credentialTypesService.verifyCredential(this.verifiableCredential);
  }

  public equals(otherCredential: Credential): boolean {
    return this.id === otherCredential.id;
  }
}