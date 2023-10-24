import { gql } from "@apollo/client";
import { callWithUnlock } from "@components/security/unlock-key-prompt/call-with-unlock";
import { gqlIdentityFields } from "@graphql/identity.fields";
import { ApplicationIdentity } from "@model/application-identity/application-identity";
import { IdentityClaimRequest } from "@model/identity-claim-request/identity-claim-request";
import { IdentityRoot } from "@model/identity-root/identity-root";
import { Identity } from "@model/identity/identity";
import { IdentityType } from "@model/identity/identity-type";
import { IdentityDTO } from "@model/identity/identity.dto";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { getRandomQuickStartHiveNodeAddress } from "@services/hive/hive.service";
import { custodialIdentityProvider, identityService } from "@services/identity/identity.service";
import { logger } from "@services/logger";
import { fetchSelfUser } from "@services/user/user.service";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { filter, map } from "rxjs";
import { User } from "../../user";
import { UserFeature } from "../user-feature";
import { ClaimIdentityInput } from "./claim-identity.input";

export class IdentityFeature implements UserFeature {
  public identities$ = new AdvancedBehaviorSubject<Identity[]>(null, () => this.fetchIdentities());
  public identityRoots$ = new AdvancedBehaviorSubject<IdentityRoot[]>([], () => this.fetchIdentityRoots());

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
    const identity = <ApplicationIdentity>await identityService.createIdentity(name, IdentityType.APPLICATION, hiveAddress, null, true);
    this.identities$.next([identity, ...this.identities$.value]);
    return identity;
  }

  public async importIdentity(mnemonic: string): Promise<Identity[]> {
    logger.log("identity", "Importing identities from mnemonic words");

    const identities = <Identity[]>await custodialIdentityProvider.identity.importIdentity(IdentityType.REGULAR, mnemonic);
    if (identities) {
      this.identities$.next([...identities, ...this.identities$.value]);
    }

    return identities;
  }

  public async deleteIdentity(didString: string): Promise<boolean> {
    logger.log("identity", "Deleting identity");

    const successfulDeletion = await identityService.deleteIdentity(didString);
    this.identities$.next(this.identities$.value.filter(i => i.did != didString));
    return successfulDeletion;
  }

  public async listIdentityRoots(): Promise<IdentityRoot[]> {
    logger.log("identity", "list Root Identities identity");

    const identityRoots = await identityService.listIdentityRoots();
    this.identityRoots$.next(this.identityRoots$.value.filter(i => i.id));
    return identityRoots
  }

  private async fetchIdentities(): Promise<Identity[]> {
    logger.log("identity", "Fetching identities", this.user);
    return identityService.listIdentities();
  }

  private async fetchIdentityRoots(): Promise<IdentityRoot[]> {
    logger.log("identity", "Fetching root identities", this.user);
    return identityService.listIdentityRoots();
  }

  /**
   * Requests to transfer a managed identity created by a third party app, into current user's account.
   * During this operation, all identity data is migrated to fully become owned by the user.
   *
   * The newly owned identity is returned and added to user's identities list.
   */
  public async claimManagedIdentity(claimRequest: IdentityClaimRequest, claimRequestNonce: string): Promise<Identity> {
    const input: ClaimIdentityInput = {
      requestId: claimRequest.id,
      nonce: claimRequestNonce
    };

    const result = await callWithUnlock(() => withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ claimManagedIdentity: IdentityDTO }>({
        mutation: gql`
          mutation claimManagedIdentity($input: ClaimIdentityInput!) {
            claimManagedIdentity(input: $input) {
              ${gqlIdentityFields}
            }
          }
        `,
        variables: {
          input
        }
      });
    }));

    if (result?.data?.claimManagedIdentity) {
      const { identityFromJson } = await import("@model/identity/identity-builder");
      const identity = await identityFromJson(result.data.claimManagedIdentity, custodialIdentityProvider);
      this.identities$.next([identity, ...this.identities$.value]);

      logger.log("identity", "Managed identity claimed successfully", identity);
      return identity;
    }
    else {
      throw new Error("Failed to claim identity");
    }
  }

  public exportMnemonic(identityRootId: string): Promise<string> {
    return identityService.exportMnemonic(identityRootId);
  }
}