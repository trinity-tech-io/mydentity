import { Identity } from "@model/identity/identity";
import { identityService } from "@services/identity/identity.service";
import { logger } from "@services/logger";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";
import { User } from "../../user";
import { UserFeature } from "../user-feature";

export class IdentityFeature implements UserFeature {
  private _identities$ = new LazyBehaviorSubjectWrapper<Identity[]>([], () => this.fetchIdentities());
  public get identities$() { return this._identities$.getSubject(); }

  constructor(protected user: User) {
  }

  public async createIdentity() {
    logger.log("identities", "Creating a new identity");

    const identity = await identityService.createIdentity();
    this.identities$.next([identity, ...this.identities$.value]);
  }

  private async fetchIdentities() {
    logger.log("identities", "Fetching identities");

    const identities = await identityService.listIdentities();
    this.identities$.next(identities);
  }
}