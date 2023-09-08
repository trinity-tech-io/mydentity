import { Credential } from "@model/credential/credential";
import { ProfileCredential } from "@model/credential/profile-credential";
import { Identity } from "@model/identity/identity";
import { AvatarInfoToSubject } from "@services/identity-profile-info/converters/avatar-converter";
import { findProfileInfoByKey, findProfileInfoByTypes } from "@services/identity-profile-info/identity-profile-info.service";
import { logger } from "@services/logger";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";
import { randomIntString } from "@utils/random";
import moment from "moment";
import { BehaviorSubject, map } from "rxjs";
import { IdentityFeature } from "../identity-feature";
import { editAvatarOnHive } from "./upload-avatar";

export class ProfileFeature implements IdentityFeature {
  public activeCredential$ = new BehaviorSubject<Credential>(null);

  public get profileCredentials$(): BehaviorSubject<ProfileCredential[]> { return this._profileCredentials$.getSubject(); }
  private _profileCredentials$ = new LazyBehaviorSubjectWrapper<ProfileCredential[]>(null, async () => {
    this.identity.get("credentials").credentials$.pipe(map((creds) => creds.filter(c => c instanceof ProfileCredential))).subscribe(creds => {
      this.profileCredentials$.next(<ProfileCredential[]>creds);
    });
  });

  public get avatarCredential$(): BehaviorSubject<ProfileCredential> { return this._avatarCredential$.getSubject(); }
  private _avatarCredential$ = new LazyBehaviorSubjectWrapper<ProfileCredential>(null, async () => {
    this.profileCredentials$.subscribe(creds => {
      this.avatarCredential$.next(creds?.find(c => c.verifiableCredential.getId().getFragment() === "avatar"));
    });
  });

  public get name$(): BehaviorSubject<string> { return this._name$.getSubject(); }
  private _name$ = new LazyBehaviorSubjectWrapper<string>(null, async () => {
    this.profileCredentials$.subscribe(creds => {
      this.name$.next(this.getName());
    });
  });

  constructor(protected identity: Identity) { }

  public setActiveCredential(credential: Credential): void {
    this.activeCredential$.next(credential)
  }

  public async createProfileCredential(credentialId: string = null, fullTypes: string[], key: string, editionValue: any): Promise<Credential> {
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

      return this.identity.get("credentials").createCredential(finalCredentialId, credentialType, expirationDate, credentialSubject);
    } catch (error) {
      logger.error("profile", error);
      return null;
    }
  }

  public async updateProfileCredential(credential: ProfileCredential, newValue: string): Promise<boolean> {
    const credentialId = credential.verifiableCredential.getId().toString();
    const profileInfoEntry = findProfileInfoByTypes(credential.verifiableCredential.getType());

    try {
      const deleted = await this.identity.get("credentials").deleteCredential(credential);
      if (!deleted)
        return false;

      const createdCredential = await this.createProfileCredential(
        credentialId,
        profileInfoEntry.typesForCreation(),
        profileInfoEntry.key,
        newValue);

      return !!createdCredential;
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

  /**
   * From a file uploaded by the user in the browser:
   * - Resizes it to a maximum dimension
   * - Uploads to identity's hive vault and prepare a hive script to serve the file
   * - Updates the avatar credential with this new data
   */
  public async upsertIdentityAvatar(newAvatarPictureFile: File): Promise<void> {
    const uploadedAvatar = await editAvatarOnHive(this.identity, newAvatarPictureFile);
    if (uploadedAvatar) {
      const avatarInfo = findProfileInfoByKey("avatar");

      const avatarToSubject: AvatarInfoToSubject = {
        mimeType: uploadedAvatar.mimeType,
        hiveDownloadScriptUrl: uploadedAvatar.avatarHiveURL
      }

      // Delete existing avatar credential, if any
      await this.deleteAvatarCredential();

      await this.createProfileCredential("#avatar", avatarInfo.typesForCreation(), avatarInfo.key, avatarToSubject);
    }
    else {
      // TODO - to user
      console.log("Failed to upload avatar to hive");
    }
  }

  public async deleteAvatarCredential(): Promise<void> {
    const avatarCredential = this.avatarCredential$.value;
    if (avatarCredential)
      await this.identity.get("credentials").deleteCredential(avatarCredential);
  }
}