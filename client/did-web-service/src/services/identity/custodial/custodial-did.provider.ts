import { gql } from "@apollo/client";
import { gqlIdentityFields } from "@graphql/identity.fields";
import { Identity } from "@model/identity/identity";
import { IdentityDTO } from "@model/identity/identity.dto";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { IdentityProvider } from "../did.provider";

export class CustodialDIDProvider implements IdentityProvider {
  async createIdentity(): Promise<Identity> {
    const { data } = await getApolloClient().mutate<{ createDID: IdentityDTO }>({
      mutation: gql`
        mutation createDID($name: String!) {
          createDID(input: { name: $name }) {
            ${gqlIdentityFields}
          }
        }
      `,
      variables: {
        name: "Ben"
      }
    });

    console.log(data)

    if (data?.createDID) {
      return Identity.fromJson(data.createDID);
    }
    else {
      throw new Error("Failed to create DID");
    }
  }

  async listIdentities(): Promise<Identity[]> {
    const { data } = await getApolloClient().query<{ identities: IdentityDTO[] }>({
      query: gql`
        query ListIdentities {
          identities {
            ${gqlIdentityFields}
          }
        }
      `
    });

    if (data && data.identities) {
      const identities = await Promise.all(data!.identities.map(identity => Identity.fromJson(identity)));
      logger.log("custodial-provider", "Fetched identities:", identities);
      return identities;
    }

    return null;
  }
}