import { gql } from "@apollo/client";
import { callWithUnlock } from "@components/security/unlock-key-prompt/call-with-unlock";
import { gqlMnemonicFields } from "@graphql/mnemonic.fields";
import { Identity } from "@model/identity/identity";
import { MnemonicDTO } from "@model/identity/mnemonic.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { IdentityProvider } from "@services/identity/did.provider";
import { logger } from "@services/logger";
import { RootIdentityDTO } from "./root-identity.dto";

export class RootIdentity {
  id: string;
  didStoreRootIdentityId: string;
  createdAt: Date;
  Identity: Identity[];

  // Local bindings
  public provider: IdentityProvider;

  public static async fromJson(json: RootIdentityDTO, provider: IdentityProvider=null): Promise<RootIdentity> {
    const rootIdentity = new RootIdentity();
    Object.assign(rootIdentity, json);

    rootIdentity.createdAt = new Date(json.createdAt);

    const { identityFromJson } = await import("@model/identity/identity-builder");
    rootIdentity.Identity = await Promise.all(json.Identity.map(identity => identityFromJson(identity, provider)));

    rootIdentity.provider = provider;
    return rootIdentity;
  }

  async exportMnemonic(rootIdentityId: string): Promise<string> {
    logger.log("Root identity", "Export mnemonic ");
    return callWithUnlock(() => this.exportingMnemonic(rootIdentityId));
  }

  private async exportingMnemonic(rootIdentityId: string): Promise<string> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ exportMnemonic: MnemonicDTO }>({
        mutation: gql`
        mutation exportMnemonic($rootIdentityId: String!) {
          exportMnemonic(rootIdentityId: $rootIdentityId) {
            ${gqlMnemonicFields}
          }
        }
      `,
        variables: {
          rootIdentityId
        }
      });
    });

    return result?.data?.exportMnemonic.mnemonic;
  }
}