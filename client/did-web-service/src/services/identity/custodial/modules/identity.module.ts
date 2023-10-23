import { gql } from "@apollo/client";
import { callWithUnlock } from "@components/security/unlock-key-prompt/call-with-unlock";
import { gqlIdentityFields } from "@graphql/identity.fields";
import { gqlMnemonicFields } from "@graphql/mnemonic.fields";
import { gqlIdentityRootFields } from "@graphql/root-identity.fields";
import { IdentityRoot } from "@model/identity-root/identity-root";
import { IdentityRootDTO } from "@model/identity-root/identity-root.dto";
import type { Identity } from "@model/identity/identity";
import { IdentityType } from "@model/identity/identity-type";
import type { IdentityDTO } from "@model/identity/identity.dto";
import { MnemonicDTO } from "@model/identity/mnemonic.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { IdentityProvider, IdentityProviderIdentity } from "@services/identity/did.provider";
import { CreateIdentityInput } from "@services/identity/dto/create-identity.input.dto";
import { logger } from "@services/logger";

export class IdentityModule implements IdentityProviderIdentity {
  constructor(public provider: IdentityProvider) { }

  async createIdentity(name: string, identityType: IdentityType, hiveVaultProvider: string, rootIdentityId: string = null, publish = true): Promise<Identity> {
    const input: CreateIdentityInput = {
      name,
      hiveVaultProvider,
      identityType,
      rootIdentityId,
      publish
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
      throw new Error("Failed to delete the identity");
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

  async listIdentityRoots(): Promise<IdentityRoot[]> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).query<{ listIdentityRoots: IdentityRootDTO[] }>({
        query: gql`
        query listIdentityRoots {
          listIdentityRoots {
            ${gqlIdentityRootFields}
          }
        }
      `
      });
    });

    if (result?.data?.listIdentityRoots) {
      const identityRoots = await Promise.all(result.data.listIdentityRoots.map(rootIdentity => IdentityRoot.fromJson(rootIdentity, this.provider)));
      logger.log("custodial-provider", "Fetched identity roots:", identityRoots);
      return identityRoots;
    }

    return null;
  }

  async exportMnemonic(identityRootId: string): Promise<string> {
    logger.log("Root identity", "Export mnemonic ");
    return callWithUnlock(() => this.exportingMnemonic(identityRootId));
  }

  private async exportingMnemonic(identityRootId: string): Promise<string> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ exportMnemonic: MnemonicDTO }>({
        mutation: gql`
        mutation exportMnemonic($identityRootId: String!) {
          exportMnemonic(identityRootId: $identityRootId) {
            ${gqlMnemonicFields}
          }
        }
      `,
        variables: {
          identityRootId
        }
      });
    });
    return result?.data?.exportMnemonic.mnemonic;
  }
}