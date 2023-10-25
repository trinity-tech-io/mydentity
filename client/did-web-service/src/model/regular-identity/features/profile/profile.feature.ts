import { Credential } from "@model/credential/credential";
import { ProfileCredential } from "@model/credential/profile-credential";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { withCaughtAppException } from "@services/error.service";
import { AvatarInfoToSubject } from "@services/identity-profile-info/converters/avatar-converter";
import { findProfileInfoByKey, findProfileInfoByTypes } from "@services/identity-profile-info/identity-profile-info.service";
import { logger } from "@services/logger";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { PermanentCache } from "@utils/caches/permanent-cache";
import { isClientSide } from "@utils/client-server";
import { randomIntString } from "@utils/random";
import moment from "moment";
import { BehaviorSubject, map } from "rxjs";
import { IdentityFeature } from "../../../identity/features/identity-feature";
import { editAvatarOnHive } from "./upload-avatar";

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

  public profileCredentials$ = new AdvancedBehaviorSubject<ProfileCredential[]>(null, async () => {
    this.identity.credentials().credentials$.pipe(map((creds) => creds?.filter(c => c instanceof ProfileCredential))).subscribe(creds => {
      this.profileCredentials$.next(<ProfileCredential[]>creds);

      // When credentials change, update name subject and its cache so we can later show the
      // identity name without fetching credentials
      this.refreshIdentityName();
    });
  });

  public avatarCredential$ = new AdvancedBehaviorSubject<ProfileCredential>(null, async () => {
    this.profileCredentials$.subscribe(creds => {
      const avatarCredential = creds?.find(c => c.verifiableCredential.getId().getFragment() === "avatar");
      avatarCredential?.representativeIcon$.subscribe(icon => {
        this.refreshIdentityIcon();
      })
      this.avatarCredential$.next(avatarCredential);
      this.refreshIdentityIcon();
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

  constructor(protected identity: RegularIdentity) { }

  public setActiveCredential(credential: Credential): void {
    this.activeCredential$.next(credential)
  }

  private refreshIdentityName(): void {
    const newName = this.getName();
    this.name$.next(newName); // Update this subject
    identityInfoNames.put(this.identity.did, newName); // Update the cache
  }

  private refreshIdentityIcon(): void {
    const avatarIcon = this.avatarCredential$.value?.representativeIcon$.value;
    // Only handle real string data urls from the avataer credential. Not default avatars icons
    // (we don't want to use such icon to represent the identity)
    if (typeof avatarIcon === "string") {
      this.icon$.next(avatarIcon);
      identityInfoIcons.put(this.identity.did, avatarIcon); // Update the cache
    }
    else {
      this.icon$.next(null);
      identityInfoIcons.put(this.identity.did, null); // Update the cache
    }
  }

  /**
   * Convenient method over createProfileCredential() to create the first identity name
   */
  public async createInitialNameCredential(name: string): Promise<boolean> {
    const nameCredentialInfo = findProfileInfoByKey("name");
    return !!await this.createProfileCredential(null, nameCredentialInfo.typesForCreation(), nameCredentialInfo.key, name);
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

      return this.identity.credentials().createCredential(finalCredentialId, credentialType, expirationDate, credentialSubject);
    }, null);
  }

  // NOTE: Do NOT try catch inside this method to let unlock key exceptions go through
  public async updateProfileCredential(credential: ProfileCredential, newValue: string): Promise<Credential> {
    const credentialId = credential.verifiableCredential.getId().toString();
    const profileInfoEntry = findProfileInfoByTypes(credential.verifiableCredential.getType());

    const deleted = await this.identity.credentials().deleteCredential(credential);
    if (!deleted)
      return null;

    const createdCredential = await this.createProfileCredential(
      credentialId,
      profileInfoEntry.typesForCreation(),
      profileInfoEntry.key,
      newValue);

    return createdCredential
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
      logger.error("profile", "Failed to upload avatar to hive");
    }
  }

  public async deleteAvatarCredential(): Promise<void> {
    const avatarCredential = this.avatarCredential$.value;
    if (avatarCredential)
      await this.identity.credentials().deleteCredential(avatarCredential);
  }
}