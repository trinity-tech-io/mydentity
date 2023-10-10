import { gql } from '@apollo/client';
import AccountIcon from '@assets/images/account.svg';
import type { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { gqlIdentityInteractingApplicationFields } from '@graphql/identity-interacting-application.fields';
import { IdentityInteractingApplication } from '@model/identity-interacting-application/identity-interacting-application';
import type { IdentityInteractingApplicationDTO } from '@model/identity-interacting-application/identity-interacting-application.dto';
import type { JSONObject } from "@model/json";
import { credentialTypesService } from "@services/credential-types/credential.types.service";
import { withCaughtAppException } from '@services/error.service';
import { getApolloClient } from '@services/graphql.service';
import { identityService } from "@services/identity/identity.service";
import { issuerService } from "@services/identity/issuer.service";
import { logger } from "@services/logger";
import { AdvancedBehaviorSubject } from '@utils/advanced-behavior-subject';
import { evalObjectFieldPath } from "@utils/objects";
import { capitalizeFirstLetter } from "@utils/strings";
import type { IssuerInfo } from "./issuer-info";

type ValueItem = {
  name: string,
  value: string
};

export abstract class Credential {
  public issuerInfo$ = new AdvancedBehaviorSubject<IssuerInfo>(null, () => this.fetchIssuerInfo());
  public isConform$ = new AdvancedBehaviorSubject<boolean>(null, () => this.verifyCredential());
  public requestingApplications$ = new AdvancedBehaviorSubject<IdentityInteractingApplication[]>(null, () => this.fetchRequestingApplications());

  // Path to display the icon that best represents this credential.
  public representativeIcon$ = new AdvancedBehaviorSubject<string | JSX.Element>(null, async () => {
    this.prepareRepresentativeIcon();
  });

  // Backend data
  public id: string = null;
  public createdAt: Date = null;
  public verifiableCredential: VerifiableCredential;

  // Computed client data
  protected displayTitle: string;
  protected displayValue: any = null;
  //private onIconReadyCallback: (iconSrc: string | JSX.Element) => void = null;

  /**
   * Prepare all display data.
   */
  public prepareForDisplay(): void {
    this.prepareDisplayTitle();
    this.prepareDisplayValue();
  }

  protected getDisplayableCredentialTitle(): string {
    // If the credential implements the DisplayableCredential type, get the title from there.
    const credProps = this.verifiableCredential.getSubject().getProperties();
    if ("displayable" in credProps) {
      this.displayTitle = (credProps["displayable"] as JSONObject)["title"] as string;
      return this.displayTitle
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

  protected getDisplayableCredentialDescription(): any {
    const credProps = this.verifiableCredential.getSubject().getProperties();
    if ("displayable" in credProps) {
      return this.parseDisplayable(credProps).description
    }
    // the type is not displayable
    const otherDescription = this.getOtherDescription()
    if (otherDescription != null && otherDescription != undefined) {
      return otherDescription
    }
    else {
      return null;
    }
  }

  protected parseDisplayable(credProps: JSONObject): any {
    /* When the data structure of credential is as follows (import credential):
        Add prepareRemoveKey field to remove description1 and description2, 
        because description1 and description2 are the content of description and do not need to be displayed repeatedly.
    credProps: {
      displayable: {description: "${prescription1}，${prescription2}",
                    icon:"nowhere",
                    title:"Medical certificate"
                    prescription1:"Drink more'
                    prescription2: "Eat less"
                    }
      subField:{firstSubValue: 'Yes', secondSubValue: 'Tomorrow'}
    }

    At this time, the return data structure is:
    {
      {
          title: title,
          description: "Drink more, Eat less",
          prepareRemoveKey: [prescription1, prescription2],
          icon: icon
        };
    }
    */
    const prepareRemoveKey = []; 

    if ("displayable" in credProps) {

      // rawDescription sample: hello ${firstName} ${lastName.test}
      const rawDescription = (credProps["displayable"] as JSONObject)["description"] as string;
      const title = (credProps["displayable"] as JSONObject)['title'] as string;
      const icon = (credProps["displayable"] as JSONObject)['icon'] as string;
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
            prepareRemoveKey.push(jsonFieldPath)
            const evaluatedField = evalObjectFieldPath(credProps, jsonFieldPath);
            description = description.replace(tag, evaluatedField);
          }
        }
        return {
          title: title,
          description: description,
          prepareRemoveKey: prepareRemoveKey,
          icon: icon
        };
      }
    }
  }

  // the type is not displayable
  protected getOtherDescription(): any {
    const subject = this.verifiableCredential.getSubject().getProperties();
    const concatenatedValues: any[] = [];  // Initialize an array with a single element
    let allValuesValid = true;  // Assume all values are valid initially

    // if the type is not displayable , but the json contains only one field and the field type is string/number/boolean, then we just show that value as value, but without the blue "name" key (don't use json ui tree)
    for (const key in subject) {
      const value = subject[key];
      const type = typeof value;
      if (type === 'string' || type === 'boolean' || type === 'number') {
        concatenatedValues.push(value)
      } else {
        allValuesValid = false;
      }
    }
    if (allValuesValid) {
      return concatenatedValues
    }

    // if the type is not displayable credential, and the json contains more than one string/boolean/number field, then we show the json tree.
    return subject
  }

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

  public getContentTree = (): any => {
    let credProps = this.verifiableCredential.getSubject().getProperties();
    const displayable = this.parseDisplayable(credProps)
    if (!displayable) return null
    // Remove duplicate fields: comment in parseDisplayable() method
    const removeArray = displayable.prepareRemoveKey
    credProps.displayable = displayable;
    delete displayable['prepareRemoveKey']; // Remove specified key
    credProps = this.removeKeysFromJSONObject(credProps, removeArray)

    return credProps
  }
  public removeKeysFromJSONObject(obj: JSONObject, keysToRemove: string[]): JSONObject {
    const clonedObject: JSONObject = { ...obj }; // Clone the original object to avoid modifying it directly
    keysToRemove.forEach(key => {
      if (key in clonedObject) {
        delete clonedObject[key]; // Remove specified key
      }
    });
    return clonedObject;
  }

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

  protected abstract prepareRepresentativeIcon(): Promise<void>;


  /**
   * Tries to load the target picture, and in case of error, replaces the icon src with
   * a placeholder.
   */
  protected loadIconWithFallback(): void {
    if (this.representativeIcon$.value == null) {
      this.representativeIcon$.next(this.getFallbackIcon());
    }

    // Only try to load icons that are string paths such as urls.
    // Icons that are already JSX elements are local and are directly used (can't be loaded with an
    // Image object).
    if (this.isDefaultLocalIcon(this.representativeIcon$.value))
      return;

    const image = new Image();
    image.crossOrigin = 'anonymous';

    image.onload = (): void => {
      this.representativeIcon$.next(image.src);
      // this.onIconReadyCallback?.(this.representativeIcon$.value as string);
    };
    image.onerror = (): void => {
      this.representativeIcon$.next(this.getFallbackIcon());
      // this.onIconReadyCallback?.(this.representativeIcon$.value);
    };

    // Try to load the picture
    image.src = this.representativeIcon$.value as string;
  }

  /**
   * Check whether it is the default icon,
   * If it is the default icon: the type is JSX.Element, return true;
   * otherwise: the icon is url, string type, return false
   */
  private isDefaultLocalIcon(str: string | JSX.Element): boolean {
    if (typeof str === 'string') {
      return false
    }
    return true
  }

  /**
 * Fallback icon used either when the real icon is not loaded yet, or failed to load
 */ // TODO: better icon than a "head"
  protected getFallbackIcon(): string | JSX.Element {
    return AccountIcon;
  }

  /**
   * "Title" best representing this credential on the UI
   */
  public getDisplayableTitle(): string {
    return this.displayTitle;
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
  public getTypes(): string[] {
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
  public isSelfIssued(): boolean {
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

    const issuerInfo = {
      avatarIcon: issuerIcon,
      didString: issuerDidString,
      name: issuerName,
      isPublished
    };
    logger.log('credential', 'got issuer info:', issuerInfo);

    return issuerInfo;
  }

  /**
   * Checks confirmity of this credentials to credential contexts/types and tells if the
   * credential is "conform" or not.
   */
  private async verifyCredential(): Promise<boolean> {
    return await credentialTypesService.verifyCredential(this.verifiableCredential);
  }

  /**
   * Fetches the list of applications that got access to this credential
   */
  private async fetchRequestingApplications(): Promise<IdentityInteractingApplication[]> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).query<{ interactingApplicationsForCredential: IdentityInteractingApplicationDTO[] }>({
        query: gql`
          query interactingApplicationsForCredential($credentialId: String!) {
            interactingApplicationsForCredential(credentialId: $credentialId) {
              ${gqlIdentityInteractingApplicationFields}
            }
          }
        `,
        variables: {
          credentialId: this.id
        }
      });
    });

    if (result?.data?.interactingApplicationsForCredential) {
      const applications = await Promise.all(result.data.interactingApplicationsForCredential.map(app => IdentityInteractingApplication.fromJson(app)));
      logger.log("applications", "Fetched credential interacting applications:", applications);
      return applications;
    }

    return null;
  }

  public equals(otherCredential: Credential): boolean {
    return this.id === otherCredential.id;
  }
}