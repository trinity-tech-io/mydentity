import { Identity } from "@model/identity/identity";
import { activeIdentity$ } from "@services/identity/identity.events";
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

  public async createIdentity(): Promise<Identity> {
    logger.log("identities", "Creating a new identity");

    const identity = await identityService.createIdentity();
    this.identities$.next([identity, ...this.identities$.value]);
    return identity;
  }

  private async fetchIdentities() {
    logger.log("identities", "Fetching identities");

    const identities = await identityService.listIdentities();
    this.identities$.next(identities);

    // 1.load local cached active identity,
    // 2.if not found cached data, set a default identity for convenience
    if (activeIdentity$.value) return;
    if (identities.length > 0)
      identityService.setActiveIdentity(identities[0]);
  }
}