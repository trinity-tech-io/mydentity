import { Identity } from "@model/identity/identity";
import { getRandomQuickStartHiveNodeAddress } from "@services/hive/hive.service";
import { identityService } from "@services/identity/identity.service";
import { logger } from "@services/logger";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { User } from "../../user";
import { UserFeature } from "../user-feature";

export class IdentityFeature implements UserFeature {
  public identities$ = new AdvancedBehaviorSubject<Identity[]>([], () => this.fetchIdentities());

  constructor(protected user: User) {
  }

  public async createIdentity(name: string): Promise<Identity> {
    logger.log("identities", "Creating a new identity", name);

    const hiveAddress = getRandomQuickStartHiveNodeAddress();
    const identity = await identityService.createIdentity(name, hiveAddress);
    this.identities$.next([identity, ...this.identities$.value]);
    return identity;
  }

  public async deleteIdentity(didString: string): Promise<boolean> {
    logger.log("identities", "Deleting identity");

    const successfulDeletion = await identityService.deleteIdentity(didString);
    this.identities$.next(this.identities$.value.filter(i => i.did != didString));
    return successfulDeletion;
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

  private async fetchIdentities(): Promise<Identity[]> {
    logger.log("identities", "Fetching identities", this.user);
    return identityService.listIdentities();
  }
}