import { ApplicationIdentity } from "@model/application-identity/application-identity";
import { Identity } from "@model/identity/identity";
<<<<<<< HEAD
import { RootIdentity } from "@model/root-identity/root-identity";
=======
>>>>>>> e2133ad (WIP Developers page + fixed server build error)
import { IdentityType } from "@model/identity/identity-type";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { RootIdentity } from "@model/root-identity/root-identity";
import { getRandomQuickStartHiveNodeAddress } from "@services/hive/hive.service";
import { identityService } from "@services/identity/identity.service";
import { logger } from "@services/logger";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { filter, map } from "rxjs";
import { User } from "../../user";
import { UserFeature } from "../user-feature";

export class IdentityFeature implements UserFeature {
  public identities$ = new AdvancedBehaviorSubject<Identity[]>(null, () => this.fetchIdentities());
  public rootIdentities$ = new AdvancedBehaviorSubject<RootIdentity[]>([], () => this.fetchRootIdentities());

  /**
   * Basic user identities showed to all users. Not including application identities.
   */
  public regularIdentities$ = new AdvancedBehaviorSubject<RegularIdentity[]>(null, async () => {
    this.identities$.pipe(filter(ids => !!ids), map(ids => ids.filter(i => i.type === IdentityType.REGULAR))).subscribe(identities => {
      this.regularIdentities$.next(identities as RegularIdentity[]);
    });
  });

  /**
   * Basic user identities showed to all users. Not including application identities.
   */
  public applicationIdentities$ = new AdvancedBehaviorSubject<ApplicationIdentity[]>(null, async () => {
    this.identities$.pipe(filter(ids => !!ids), map(ids => ids?.filter(i => i.type === IdentityType.APPLICATION))).subscribe(identities => {
      this.applicationIdentities$.next(identities as ApplicationIdentity[]);
    });
  });

  constructor(protected user: User) {
  }

  public async createRegularIdentity(name: string): Promise<RegularIdentity> {
    logger.log("identity", "Creating a new identity", name);

    const hiveAddress = getRandomQuickStartHiveNodeAddress();
    const identity = <RegularIdentity>await identityService.createIdentity(name, IdentityType.REGULAR, hiveAddress);
    this.identities$.next([identity, ...this.identities$.value]);
    return identity;
  }

  public async createApplicationIdentity(name: string): Promise<ApplicationIdentity> {
    logger.log("identity", "Creating a new application identity", name);

    const hiveAddress = getRandomQuickStartHiveNodeAddress();
    const identity = <ApplicationIdentity>await identityService.createIdentity(name, IdentityType.APPLICATION, hiveAddress);
    this.identities$.next([identity, ...this.identities$.value]);
    return identity;
  }

  public async deleteIdentity(didString: string): Promise<boolean> {
    logger.log("identity", "Deleting identity");

    const successfulDeletion = await identityService.deleteIdentity(didString);
    this.identities$.next(this.identities$.value.filter(i => i.did != didString));
    return successfulDeletion;
  }

  public async listRootIdentities(): Promise<RootIdentity[]> {
<<<<<<< HEAD
    logger.log("identities", "list Root Identities identity");
=======
    logger.log("identity", "list Root Identities identity");
>>>>>>> e2133ad (WIP Developers page + fixed server build error)

    const rootIdentities = await identityService.listRootIdentities();
    this.rootIdentities$.next(this.rootIdentities$.value.filter(i => i.id));
    return rootIdentities
  }

  /* public async createDIDPublishTransaction(didString: string): Promise<string> {
    logger.log("identity", "Creating identity publication transaction");

    return await identityService.createDIDPublishTransaction(didString);
  } */

  // Call createDIDPublishTransaction to obtain the payload
  /* public async publishIdentity(didString: string, payload: string): Promise<string> {
    logger.log("identity", "Publishing identity");

    return await identityService.publishIdentity(didString, payload);
  } */

  private async fetchIdentities(): Promise<Identity[]> {
    logger.log("identity", "Fetching identities", this.user);
    return identityService.listIdentities();
  }

  private async fetchRootIdentities(): Promise<RootIdentity[]> {
<<<<<<< HEAD
    logger.log("identities", "Fetching root identities", this.user);
=======
    logger.log("identity", "Fetching root identities", this.user);
>>>>>>> e2133ad (WIP Developers page + fixed server build error)
    return identityService.listRootIdentities();
  }

}