import { ApplicationIdentity } from "@model/application-identity/application-identity";
import { IdentityClaimRequest } from "@model/identity-claim-request/identity-claim-request";
import { Identity } from "@model/identity/identity";
import { IdentityType } from "@model/identity/identity-type";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { RootIdentity } from "@model/root-identity/root-identity";
import { getRandomQuickStartHiveNodeAddress } from "@services/hive/hive.service";
import { identityService } from "@services/identity/identity.service";
import { logger } from "@services/logger";
import { fetchSelfUser } from "@services/user/user.service";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { filter, identity, map } from "rxjs";
import { User } from "../../user";
import { UserFeature } from "../user-feature";
import { gql } from "@apollo/client";
import { gqlIdentityFields } from "@graphql/identity.fields";
import { IdentityDTO } from "@model/identity/identity.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { CreateIdentityInput } from "@services/identity/dto/create-identity.input.dto";

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
    const identity = <RegularIdentity>await identityService.createIdentity(name, IdentityType.REGULAR, hiveAddress, this.user.defaultRootIdentityId);
    this.identities$.next([identity, ...this.identities$.value]);

    if (!this.user.defaultRootIdentityId) {
      // Update the user.defaultRootIdentityId
      await fetchSelfUser();
    }
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
    logger.log("identity", "list Root Identities identity");

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
    logger.log("identity", "Fetching root identities", this.user);
    return identityService.listRootIdentities();
  }

  /**
   * Requests to transfer a manage identity created by a third party app, into current user's account.
   * During this operation, all identity data is migrated to fully become owned by the user.
   * 
   * The newly owned identity is returned and added to user's identities list.
   */
  public async claimManagedIdentity(claimRequest: IdentityClaimRequest): Promise<Identity> {
    const input: CreateIdentityInput = {
      name,
      hiveVaultProvider,
      identityType,
      rootIdentityId
    };

    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ createIdentity: IdentityDTO }>({
        mutation: gql`
          mutation createIdentity($input: CreateIdentityInput!) {
            createIdentity(input: $input) {
              ${gqlIdentityFields}
            }
          }
        `,
        variables: {
          input
        }
      });
    });

    if (result?.data?.createIdentity) {
      const { identityFromJson } = await import("@model/identity/identity-builder");
      return identityFromJson(result.data.createIdentity, this.provider);
    }
    else {
      throw new Error("Failed to create DID");
    }

    this.identities$.next([identity, ...this.identities$.value]);
  }
}