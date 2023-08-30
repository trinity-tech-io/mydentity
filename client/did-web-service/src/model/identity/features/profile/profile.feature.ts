import { ProfileCredential } from "@model/credential/profile-credential";
import { Identity } from "@model/identity/identity";
import { findProfileInfoByTypes } from "@services/identity-profile-info/identity-profile-info.service";
import { logger } from "@services/logger";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";
import { randomIntString } from "@utils/random";
import moment from "moment";
import { map } from "rxjs";
import { IdentityFeature } from "../identity-feature";

export class ProfileFeature implements IdentityFeature {
  public get profileCredentials$() { return this._profileCredentials$.getSubject(); }
  private _profileCredentials$ = new LazyBehaviorSubjectWrapper<ProfileCredential[]>(null, async () => {
    this.identity.get("credentials").credentials$.pipe(map((creds) => creds.filter(c => c instanceof ProfileCredential))).subscribe(creds => {
      this.profileCredentials$.next(<ProfileCredential[]>creds);
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

  public async createProfileCredential(credentialId: string = null, types: string[], key: string, editionValue: any): Promise<boolean> {
    let credentialType: string[] = [];
    try {
      let finalCredentialId;
      if (!credentialId) {
        finalCredentialId = this.identity.did + "#" + key + randomIntString();
      } else {
        finalCredentialId = credentialId;
      }

      const entry = findProfileInfoByTypes(types);
      for (let index = 0; index < types.length; index++) {
        credentialType.push(types[index])
      }
      credentialType.push(entry.context + "#" + entry.shortType);

      const expirationDate = moment().add(5, "years").toDate();

      let credentialSubject = entry.options.converter.toSubject(editionValue);

      await this.identity.get("credentials").createCredential(finalCredentialId, credentialType, expirationDate, credentialSubject);
      return true;
    } catch (error) {
      logger.error("profile", error);
      return false;
    }
  }

  public async updateProfileCredential(credential: ProfileCredential, newValue: string) {
    const credentialId = credential.verifiableCredential.getId().toString();
    const profileInfoEntry = findProfileInfoByTypes(credential.verifiableCredential.getType());

    try {
      await this.deleteProfileCredential(credentialId);
      await this.createProfileCredential(
        credentialId,
        credential.verifiableCredential.getType(),
        profileInfoEntry.key,
        newValue);
      return true;
    } catch (error) {
      logger.error("profile", error);
      return false;
    }
  }
}