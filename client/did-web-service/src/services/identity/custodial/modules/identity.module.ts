import { gql } from "@apollo/client";
import { gqlIdentityFields } from "@graphql/identity.fields";
import { gqlRootIdentityFields } from "@graphql/root-identity.fields";
import type { Identity } from "@model/identity/identity";
import { IdentityType } from "@model/identity/identity-type";
import type { IdentityDTO } from "@model/identity/identity.dto";
import { RootIdentity } from "@model/root-identity/root-identity";
import { RootIdentityDTO } from "@model/root-identity/root-identity.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { IdentityProvider, IdentityProviderIdentity } from "@services/identity/did.provider";
import { CreateIdentityInput } from "@services/identity/dto/create-identity.input.dto";
import { logger } from "@services/logger";

export class IdentityModule implements IdentityProviderIdentity {
  constructor(public provider: IdentityProvider) { }

  async createIdentity(name: string, identityType: IdentityType, hiveVaultProvider: string, rootIdentityId: string = null): Promise<Identity> {
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
  }

  async deleteIdentity(identityDid: string): Promise<boolean> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ deleteIdentity: boolean }>({
        mutation: gql`
        mutation deleteIdentity($identityDid: String!) {
          deleteIdentity(identityDid: $identityDid)
        }
      `,
        variables: {
          identityDid
        }
      });
    });

    if (result?.data?.deleteIdentity) {
      return true;
    }
    else {
      throw new Error("Failed to delete DID");
    }
  }

  async listIdentities(): Promise<Identity[]> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).query<{ identities: IdentityDTO[] }>({
        query: gql`
        query ListIdentities {
          identities {
            ${gqlIdentityFields}
          }
        }
      `
      });
    });

    if (result?.data?.identities) {
      const { identityFromJson } = await import("@model/identity/identity-builder");
      const identities = await Promise.all(result.data.identities.map(identity => identityFromJson(identity, this.provider)));
      logger.log("custodial-provider", "Fetched identities:", identities);
      return identities;
    }

    return null;
  }

  async listRootIdentities(): Promise<RootIdentity[]> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).query<{ listRootIdentities: RootIdentityDTO[] }>({
        query: gql`
        query listRootIdentities {
          listRootIdentities {
            ${gqlRootIdentityFields}
          }
        }
      `
      });
    });

    if (result?.data?.listRootIdentities) {
      const rootIdentities = await Promise.all(result.data.listRootIdentities.map(rootIdentity => RootIdentity.fromJson(rootIdentity, this.provider)));
      logger.log("custodial-provider", "Fetched root identities:", rootIdentities);
      return rootIdentities;
    }

    return null;
  }
}