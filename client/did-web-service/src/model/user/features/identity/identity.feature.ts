import { Identity } from "@model/identity/identity";
import { PublicationStatus } from "@model/publication/publish.dto";
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

  public async createIdentity(name: string): Promise<Identity> {
    logger.log("identities", "Creating a new identity", name);

    const identity = await identityService.createIdentity(name);
    this.identities$.next([identity, ...this.identities$.value]);
    return identity;
  }

  public async deleteIdentity(didString: string): Promise<boolean> {
    logger.log("identities", "Deleting identity");

    const identity = await identityService.deleteIdentity(didString);
    this.identities$.next(this.identities$.value.filter(i => i.did != didString));
    return identity;
  }

  public async createDIDPublishTransaction(didString: string): Promise<string> {
    logger.log("identities", "Creating identity publication transaction");

    return await identityService.createDIDPublishTransaction(didString);
  }

  // Call createDIDPublishTransaction to obtain the payload
  public async publishIdentity(didString: string, payload: string): Promise<string> {
    logger.log("identities", "Publishing identity");

    return await identityService.publishIdentity(didString, payload);
  }

  public async getPublicationStatus(didString: string, publicationId: string): Promise<PublicationStatus> {
    logger.log("identities", "Getting publication status");

    return await identityService.getPublicationStatus(didString, publicationId);
  }

  private async fetchIdentities(): Promise<Identity[]> {
    logger.log("identities", "Fetching identities");
    return identityService.listIdentities();
  }
}