import { Identity } from "@model/identity/identity";
import { identityService } from "@services/identity/identity.service";
import { logger } from "@services/logger";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";
import { User } from "../../user";
import { UserFeature } from "../user-feature";
import {getActiveUser} from "@services/user/user.events";

export class IdentityFeature implements UserFeature {
  private _identities$ = new LazyBehaviorSubjectWrapper<Identity[]>([], async () => {
    if (getActiveUser())
      return await this.fetchIdentities()
  });
  public get identities$() { return this._identities$.getSubject(); }
  constructor(protected user: User) {
  }

  public async createIdentity(name: string): Promise<Identity> {
    logger.log("identities", "Creating a new identity", name);

    const identity = await identityService.createIdentity(name);
    this.identities$.next([identity, ...this.identities$.value]);
    return identity;
  }

  public async deleteIdentity(didString: string): Promise<boolean> {
    logger.log("identities", "Deleting identity");

    const identity = await identityService.deleteIdentity(didString);
    this.identities$.next(this.identities$.value.filter( i => i.did != didString));
    return identity;
  }

  private async fetchIdentities() {
    logger.log("identities", "Fetching identities");

    const identities = await identityService.listIdentities();
    this.identities$.next(identities);
  }
}