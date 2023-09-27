import { gql } from "@apollo/client";
import { gqlMnemonicFields } from "@graphql/mnemonic.fields";
import { Identity } from "@model/identity/identity";
import { identityFromJson } from "@model/identity/identity-builder";
import { MnemonicDTO } from "@model/identity/mnemonic.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { IdentityProvider } from "@services/identity/did.provider";
import { IdentityRootDTO } from "./identity-root.dto";


export class IdentityRoot {
  id: string;
  didStoreRootIdentityId: string;
  userId: string;
  createdAt: Date;
  Identity: Identity[];

  // Local bindings
  public provider: IdentityProvider;

  public static async fromJson(json: IdentityRootDTO, provider: IdentityProvider = null): Promise<IdentityRoot> {
    const identityRoot = new IdentityRoot();
    Object.assign(identityRoot, json);

    identityRoot.provider = provider;
    identityRoot.createdAt = new Date(json.createdAt);

    identityRoot.Identity = await Promise.all(json.Identity.map(identityJson => identityFromJson(identityJson, identityRoot.provider)));

    return identityRoot;
  }

  async exportMnemonic(identityRootId: string): Promise<string> {
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