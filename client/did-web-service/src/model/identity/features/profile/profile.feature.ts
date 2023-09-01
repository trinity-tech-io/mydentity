import { ImportedCredential } from "@/app/(core)/intent/import-credentials/page";
import { ProfileCredential } from "@model/credential/profile-credential";
import { Identity } from "@model/identity/identity";
import { findProfileInfoByTypes } from "@services/identity-profile-info/identity-profile-info.service";
import { logger } from "@services/logger";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";
import { randomIntString } from "@utils/random";
import moment from "moment";
import { BehaviorSubject, map } from "rxjs";
import { IdentityFeature } from "../identity-feature";

export class ProfileFeature implements IdentityFeature {
  public get profileCredentials$(): BehaviorSubject<ProfileCredential[]> { return this._profileCredentials$.getSubject(); }
  private _profileCredentials$ = new LazyBehaviorSubjectWrapper<ProfileCredential[]>(null, async () => {
    this.identity.get("credentials").credentials$.pipe(map((creds) => creds.filter(c => c instanceof ProfileCredential))).subscribe(creds => {
      this.profileCredentials$.next(<ProfileCredential[]>creds);
    });
  });

  public get name$(): BehaviorSubject<string> { return this._name$.getSubject(); }
  private _name$ = new LazyBehaviorSubjectWrapper<string>(null, async () => {
    this.profileCredentials$.subscribe(creds => {
      this.name$.next(this.getName());
    });
  });

  constructor(protected identity: Identity) { }

  public async deleteProfileCredential(credentialId: string): Promise<boolean> {
    try {
      await this.identity.get("credentials").deleteCredential(credentialId);
      return true;
    } catch (error) {
      logger.error("profile", error);
      return false;
    }
  }

  public async createProfileCredential(credentialId: string = null, fullTypes: string[], key: string, editionValue: any): Promise<boolean> {
    const credentialType: string[] = [];
    try {
      let finalCredentialId;
      if (!credentialId) {
        finalCredentialId = this.identity.did + "#" + key + randomIntString();
      } else {
        finalCredentialId = credentialId;
      }

      const entry = findProfileInfoByTypes(fullTypes);

      credentialType.push(entry.type.getLongType());

      const expirationDate = moment().add(5, "years").toDate();

      const credentialSubject = entry.options.converter.toSubject(editionValue);

      await this.identity.get("credentials").createCredential(finalCredentialId, credentialType, expirationDate, credentialSubject);
      return true;
    } catch (error) {
      logger.error("profile", error);
      return false;
    }
  }

  // Import credential
  public async addProfileCredential(importedCredential: ImportedCredential): Promise<boolean> {
    try {
      await this.identity.get("credentials").addCredential(importedCredential.credential.verifiableCredential);
      return true;
    } catch (error) {
      logger.error("profile", error);
      return false;
    }
  }

  public async updateProfileCredential(credential: ProfileCredential, newValue: string): Promise<boolean> {
    const credentialId = credential.verifiableCredential.getId().toString();
    const profileInfoEntry = findProfileInfoByTypes(credential.verifiableCredential.getType());

    try {
      await this.deleteProfileCredential(credentialId);
      await this.createProfileCredential(
        credentialId,
        profileInfoEntry.typesForCreation(),
        profileInfoEntry.key,
        newValue);
      return true;
    } catch (error) {
      logger.error("profile", error);
      return false;
    }
  }

  /**
   * Convenient method to get a displayable "name" that represents this identity.
   * This looks for Name credentials mostly.
   */
  private getName(): string {
    // NOTE: for now, search only for the base "profile credential" that we manage, not for any other
    // kind of credential type.
    const nameCredential = this.profileCredentials$.value?.find(c => c.getProfileInfo().key === "name");
    if (!nameCredential)
      return null;

    return nameCredential.getDisplayValue();
  }
}