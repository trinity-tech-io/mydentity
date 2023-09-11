import { Credential } from "@model/credential/credential";
import { ProfileCredential } from "@model/credential/profile-credential";
import { Identity } from "@model/identity/identity";
import { withCaughtAppException } from "@services/error.service";
import { AvatarInfoToSubject } from "@services/identity-profile-info/converters/avatar-converter";
import { findProfileInfoByKey, findProfileInfoByTypes } from "@services/identity-profile-info/identity-profile-info.service";
import { PermanentCache } from "@utils/caches/permanent-cache";
import { isClientSide } from "@utils/client-server";
import { randomIntString } from "@utils/random";
import moment from "moment";
import { BehaviorSubject, map } from "rxjs";
import { IdentityFeature } from "../identity-feature";
import { editAvatarOnHive } from "./upload-avatar";
import { LazyBehaviorSubject } from "@utils/lazy-behavior-subject";

/**
 * Caches to store identities names and avatars, so we can show their base information
 * without fetching all their content (credentials).
 *
 * No indexed db on server, initialize cache only on the client side
 */
const identityInfoNames = isClientSide() && new PermanentCache<string, null>('identity-info-names');
const identityInfoIcons = isClientSide() && new PermanentCache<string, null>('identity-info-icons');

export class ProfileFeature implements IdentityFeature {
  public activeCredential$ = new BehaviorSubject<Credential>(null);

  public profileCredentials$ = new LazyBehaviorSubject<ProfileCredential[]>(null, async () => {
    this.identity.get("credentials").credentials$.pipe(map((creds) => creds?.filter(c => c instanceof ProfileCredential))).subscribe(creds => {
      this.profileCredentials$.next(<ProfileCredential[]>creds);

      // When credentials change, update name and avatar caches
      const newName = this.getName();
      this.name$.next(newName); // Update this subject
      identityInfoNames.put(this.identity.did, newName); // Update the cache
    });
  });

  public avatarCredential$ = new LazyBehaviorSubject<ProfileCredential>(null, async () => {
    this.profileCredentials$.subscribe(creds => {
      this.avatarCredential$.next(creds?.find(c => c.verifiableCredential.getId().getFragment() === "avatar"));
    });
  });

  /**
   * Cached identity name. Gets updated when the name credential changes by lazily listening
   * to profile credential changes (in order to not fetch credentials and just use the cache initially).
   */
  public get name$(): BehaviorSubject<string> { return identityInfoNames.listen(this.identity.did); }
  /**
   * Cached identity icon. Gets updated when the avatar credential changes by lazily listening
   * to profile credential changes (in order to not fetch credentials and just use the cache initially).
   */
  public get icon$(): BehaviorSubject<string> { return identityInfoIcons.listen(this.identity.did); }

  constructor(protected identity: Identity) { }

  public setActiveCredential(credential: Credential): void {
    this.activeCredential$.next(credential)
  }

  public async createProfileCredential(credentialId: string = null, fullTypes: string[], key: string, editionValue: any): Promise<Credential> {
    const credentialType: string[] = [];

    return withCaughtAppException(async () => {
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
    }, null);
  }

  // NOTE: Do NOT try catch inside this method to let unlock key exceptions go through
  public async updateProfileCredential(credential: ProfileCredential, newValue: string): Promise<boolean> {
    const credentialId = credential.verifiableCredential.getId().toString();
    const profileInfoEntry = findProfileInfoByTypes(credential.verifiableCredential.getType());

    const deleted = await this.identity.get("credentials").deleteCredential(credential);
    if (!deleted)
      return false;

    const createdCredential = await this.createProfileCredential(
      credentialId,
      profileInfoEntry.typesForCreation(),
      profileInfoEntry.key,
      newValue);

    return !!createdCredential;
  }

  public async deleteProfileCredential(did: string): Promise<boolean> {
    // TODO: just for fixing build error.
    return false;
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