import { gql } from "@apollo/client";
import { VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { gqlCredentialFields } from "@graphql/credential.fields";
import { gqlIdentityFields } from "@graphql/identity.fields";
import { gqlPresentationFields } from "@graphql/presentation.fields";
import { gqlPublishFields } from "@graphql/publish.fields";
import { Credential } from "@model/credential/credential";
import { CredentialDTO } from "@model/credential/credential.dto";
import { Identity } from "@model/identity/identity";
import { IdentityDTO } from "@model/identity/identity.dto";
import { PresentationDTO } from "@model/presentation/presenttation.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { IdentityProvider } from "../did.provider";

export class CustodialDIDProvider implements IdentityProvider {
  async createIdentity(name: string): Promise<Identity> {
    const { data } = await withCaughtAppException(() => {
      return getApolloClient().mutate<{ createIdentity: IdentityDTO }>({
        mutation: gql`
        mutation createIdentity($name: String!) {
          createIdentity(input: { name: $name }) {
            ${gqlIdentityFields}
          }
        }
      `,
        variables: {
          name
        }
      });
    });

    console.log(data)

    if (data?.createIdentity) {
      return Identity.fromJson(data.createIdentity, this);
    }
    else {
      throw new Error("Failed to create DID");
    }
  }

  async deleteIdentity(didString: string): Promise<boolean> {
    const { data } = await withCaughtAppException(() => {
      return getApolloClient().mutate<{ deleteIdentity: boolean }>({
        mutation: gql`
        mutation deleteIdentity($didString: String!) {
          deleteIdentity(didString: $didString)
        }
      `,
        variables: {
          didString
        }
      });
    });

    console.log(data)

    if (data?.deleteIdentity) {
      return true;
    }
    else {
      throw new Error("Failed to delete DID");
    }
  }

  async listIdentities(): Promise<Identity[]> {
    const { data } = await withCaughtAppException(() => {
      return getApolloClient().query<{ identities: IdentityDTO[] }>({
        query: gql`
        query ListIdentities {
          identities {
            ${gqlIdentityFields}
          }
        }
      `
      });
    });

    if (data && data.identities) {
      const identities = await Promise.all(data!.identities.map(identity => Identity.fromJson(identity, this)));
      logger.log("custodial-provider", "Fetched identities:", identities);
      return identities;
    }

    return null;
  }

  async publish(didString: string): Promise<string> {
    const { data } = await withCaughtAppException(() => {
      return getApolloClient().mutate<{ payload: string }>({
        mutation: gql`
        mutation publish($didString: String!) {
          publish(didString: $didString) {
            ${gqlPublishFields}
          }
        }
      `,
        variables: {
          didString
        }
      });
    });

    console.log(data)

    if (data?.payload) {
      return data.payload;
    }
    else {
      throw new Error("Failed to publish DID");
    }
  }

  async createCredential(identityDid: string, credentialId: string, types: string[],
        expirationDate: Date, properties: any): Promise<Credential> {
    const { data } = await withCaughtAppException(() => {
      return getApolloClient().mutate<{ createCredential: CredentialDTO }>({
        mutation: gql`
        mutation createCredential($identityDid: String!, $credentialId: String!, $types: Json!, $expirationDate: String!, $properties: Json!) {
          createCredential(input: { identityDid: $identityDid, credentialId: $credentialId, types: $types, expirationDate: $expirationDate, properties: $properties}) {
            ${gqlCredentialFields}
          }
        }
      `,
        variables: {
          identityDid,
          credentialId,
          types,
          expirationDate,
          properties
        }
      });
    });
    if (data && data.createCredential) {
      return Credential.fromJson(data!.createCredential);
    }

    return null;
  }

  async listCredentials(identityDid: string): Promise<Credential[]> {
    const { data } = await withCaughtAppException(() => {
      return getApolloClient().query<{ credentials: CredentialDTO[] }>({
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
    });

    if (data && data.credentials) {
      const credentials = await Promise.all(data!.credentials.map(credential => Credential.fromJson(credential)));
      logger.log("custodial-provider", "Fetched credentials:", credentials);
      return credentials;
    }

    return null;
  }

  async deleteCredential(credentialId: string): Promise<boolean> {
    const { data } = await withCaughtAppException(() => {
      return getApolloClient().mutate<{ deleteCredential: boolean }>({
        mutation: gql`
        mutation deleteCredential($credentialId: String!) {
          deleteCredential(credentialId: $credentialId)
        }
      `,
        variables: {
          credentialId
        }
      });
    });

    if (data?.deleteCredential) {
      return true;
    }
    else {
      throw new Error("Failed to remove Credential");
    }
  }

  public async createVerifiablePresentation(identityDid: string, credentialsArg: VerifiableCredential[], realm: string, nonce: string): Promise<VerifiablePresentation> {
    let credentials = [];
    credentialsArg.forEach( c => {
      credentials.push(c.toJSON())
    })

    const { data } = await withCaughtAppException(() => {
      return getApolloClient().mutate<{ createVerifiablePresentation: PresentationDTO }>({
        mutation: gql`
        mutation createVerifiablePresentation($identityDid: String!, $credentials: Json!, $realm: String!, $nonce: String!) {
          createVerifiablePresentation(input: { identityDid: $identityDid, credentials: $credentials, realm: $realm, nonce: $nonce}) {
            ${gqlPresentationFields}
          }
        }
      `,
        variables: {
          identityDid,
          credentials,
          realm,
          nonce
        }
      });
    });

    if (data && data.createVerifiablePresentation) {
      return VerifiablePresentation.parse(data!.createVerifiablePresentation.verifiablePresentation);
    }
    return null;
  }
}