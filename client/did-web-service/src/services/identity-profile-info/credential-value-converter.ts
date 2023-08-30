import { Credential } from "@model/credential/credential";
import { findProfileInfoByTypes } from "@services/identity-profile-info/identity-profile-info.service";
import { ProfileCredentialInfo, ProfileCredentialInfoEditionType } from "./profile-credential-info";

/**
 * Interface to customize the behaviour when trying to display a PROFILE credential value on the UI, from its subject,
 * or when trying to produce a credential after edition on the UI.
 */
export abstract class CredentialValueConverter<DisplayType> {
  constructor(protected editionType: ProfileCredentialInfoEditionType) { }

  public abstract toDisplayableValue(credential: Credential): DisplayType;
  public abstract toSubject(editedValue: DisplayType): any;

  protected getInfo(credential: Credential): ProfileCredentialInfo {
    return findProfileInfoByTypes(credential.verifiableCredential.getType());
  }

  /**
   * Tells the kidn of UI component expected to edit this kind of credential info.
   */
  public getEditionType(): ProfileCredentialInfoEditionType {
    return this.editionType;
  }
}