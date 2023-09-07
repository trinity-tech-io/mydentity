import { gql } from "@apollo/client";
import { JSONObject, VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { gqlCredentialFields, gqlIssueCredentialFields } from "@graphql/credential.fields";
import { gqlIdentityFields } from "@graphql/identity.fields";
import { gqlPresentationFields } from "@graphql/presentation.fields";
import { gqlPublishFields } from "@graphql/publish.fields";
import { gqlTransactionFields } from "@graphql/transaction.fields";
import { Credential } from "@model/credential/credential";
import { credentialFromJson } from "@model/credential/credential-builder";
import { CredentialDTO, IssueCredentialDTO } from "@model/credential/credential.dto";
import { IdentityPublicationStatusResult } from "@model/identity-publication/identity-publication-status.dto";
import { Identity } from "@model/identity/identity";
import { IdentityDTO } from "@model/identity/identity.dto";
import { PresentationDTO } from "@model/presentation/presenttation.dto";
import { PublishDTO } from "@model/publication/publish.dto";
import { TransactionDTO } from "@model/publication/transaction.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { IdentityProvider } from "../did.provider";
import { CreateIdentityInput } from "../dto/create-identity.input.dto";

export class CustodialDIDProvider implements IdentityProvider {
  async createIdentity(name: string, hiveVaultProvider: string): Promise<Identity> {
    const input: CreateIdentityInput = {
      name,
      hiveVaultProvider
    };

    const { data } = await withCaughtAppException(async () => {
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

    console.log(data)

    if (data?.createIdentity) {
      return Identity.fromJson(data.createIdentity, this);
    }
    else {
      throw new Error("Failed to create DID");
    }
  }

  async deleteIdentity(identityDid: string): Promise<boolean> {
    const { data } = await withCaughtAppException(async () => {
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

    console.log(data)

    if (data?.deleteIdentity) {
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
      const identities = await Promise.all(result.data.identities.map(identity => Identity.fromJson(identity, this)));
      logger.log("custodial-provider", "Fetched identities:", identities);
      return identities;
    }

    return null;
  }

  async createDIDPublishTransaction(identityDid: string): Promise<string> {
    const { data } = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ createDIDPublishTransaction: TransactionDTO }>({
        mutation: gql`
        mutation createDIDPublishTransaction($identityDid: String!) {
          createDIDPublishTransaction(identityDid: $identityDid) {
            ${gqlTransactionFields}
          }
        }
      `,
        variables: {
          identityDid
        }
      });
    });

    console.log(data)

    if (data?.createDIDPublishTransaction.payload) {
      return data.createDIDPublishTransaction.payload;
    }
    else {
      throw new Error("Failed to create transaction");
    }
  }

  async publishIdentity(identityDid: string, payload: string): Promise<string> {
    const { data } = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ publishIdentity: PublishDTO }>({
        mutation: gql`
        mutation publishIdentity($identityDid: String!, $payload: String!) {
          publishIdentity(input: { identityDid: $identityDid, payload: $payload}) {
            ${gqlPublishFields}
          }
        }
      `,
        variables: {
          identityDid,
          payload
        }
      });
    });

    console.log(data)

    if (data?.publishIdentity.publicationId) {
      return data.publishIdentity.publicationId;
    }
    else {
      throw new Error("Failed to publish DID");
    }
  }

  async getPublicationStatus(identityDid: string): Promise<IdentityPublicationStatusResult> {
    const { data } = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ getPublicationStatus: IdentityPublicationStatusResult }>({
        mutation: gql`
        mutation getPublicationStatus($identityDid: String!) {
          getPublicationStatus(input: { identityDid: $identityDid}) {
            state
          }
        }
      `,
        variables: {
          identityDid
        }
      });
    });

    console.log(data)

    if (data?.getPublicationStatus) {
      return data.getPublicationStatus as IdentityPublicationStatusResult;
    }
    else {
      throw new Error("Failed to get publication status");
    }
  }

  async createCredential(identityDid: string, credentialId: string, types: string[],
    expirationDate: Date, properties: any): Promise<Credential> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ createCredential: CredentialDTO }>({
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

    if (result?.data?.createCredential)
      return credentialFromJson(result.data.createCredential);
    else
      return null;
  }

  async issueCredential(identityDid: string, subjectDid: string, credentialId: string, types: string[],
    expirationDate: Date, properties: any): Promise<VerifiableCredential> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ issueCredential: IssueCredentialDTO }>({
        mutation: gql`
        mutation issueCredential($identityDid: String!, $subjectDid: String!, $credentialId: String!, $types: Json!, $expirationDate: String!, $properties: Json!) {
          issueCredential(input: { identityDid: $identityDid, subjectDid: $subjectDid, credentialId: $credentialId, types: $types, expirationDate: $expirationDate, properties: $properties}) {
            ${gqlIssueCredentialFields}
          }
        }
      `,
        variables: {
          identityDid,
          subjectDid,
          credentialId,
          types,
          expirationDate,
          properties
        }
      });
    });

    if (result?.data?.issueCredential)
      return VerifiableCredential.parse(result.data.issueCredential.verifiableCredential);
    else
      return null;
  }

  async importCredential(identityDid: string, credential: VerifiableCredential): Promise<Credential> {
    const { data } = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ importCredential: CredentialDTO }>({
        mutation: gql`
        mutation importCredential($identityDid: String!, $credentialString: String!) {
          importCredential(input: { identityDid: $identityDid, credentialString: $credentialString}) {
            ${gqlCredentialFields}
          }
        }
      `,
        variables: {
          identityDid,
          credentialString: credential.toString()
        }
      });
    });
    if (data && data.importCredential) {
      return credentialFromJson(data!.importCredential);
    }

    return null;
  }

  async listCredentials(identityDid: string): Promise<Credential[]> {
    const { data } = await withCaughtAppException(async () => {
      return (await getApolloClient()).query<{ credentials: CredentialDTO[] }>({
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
      const credentials = await Promise.all(data!.credentials.map(credential => credentialFromJson(credential)));
      logger.log("custodial-provider", "Fetched credentials:", credentials);
      return credentials;
    }

    return null;
  }

  async deleteCredential(credentialId: string): Promise<boolean> {
    const { data } = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ deleteCredential: boolean }>({
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
    const credentials: JSONObject[] = [];
    credentialsArg.forEach(c => {
      credentials.push(c.toJSON())
    })

    const { data } = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ createVerifiablePresentation: PresentationDTO }>({
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

  addDIDDocumentService(identityDid: string, id: string, type: string, endpoint: string, properties?: any): boolean {
    throw new Error("Method not implemented.");
  }

  removeDIDDocumentService(identityDid: string, id: string): boolean {
    throw new Error("Method not implemented.");
  }
}