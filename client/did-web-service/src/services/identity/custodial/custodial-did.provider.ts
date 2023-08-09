import { gql } from "@apollo/client";
import { VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { gqlCredentialFields } from "@graphql/credential.fields";
import { gqlIdentityFields } from "@graphql/identity.fields";
import { Credential } from "@model/credential/credential";
import { CredentialDTO } from "@model/credential/credential.dto";
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
      return Identity.fromJson(data.createDID, this);
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
      const identities = await Promise.all(data!.identities.map(identity => Identity.fromJson(identity, this)));
      logger.log("custodial-provider", "Fetched identities:", identities);
      return identities;
    }

    return null;
  }

  async listCredentials(identityDid: string): Promise<Credential[]> {
    const { data } = await getApolloClient().query<{ credentials: CredentialDTO[] }>({
      query: gql`
        query ListCredentials($identityDid: String!) {
          credentials(identityDid: $identityDid) {
            ${gqlCredentialFields}
          }
        }
      `,
      variables: {
        identityDid
      }
    });

    if (data && data.credentials) {
      const credentials = await Promise.all(data!.credentials.map(credential => Credential.fromJson(credential)));
      logger.log("custodial-provider", "Fetched credentials:", credentials);
      return credentials;
    }

    return null;
  }

  public async createVerifiablePresentation(identityDid: string, credentials: VerifiableCredential[], realm: string, nonce: string): Promise<VerifiablePresentation> {
    return null;
  }
}