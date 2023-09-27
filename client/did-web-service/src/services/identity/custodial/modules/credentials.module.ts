import { gql } from "@apollo/client";
import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { gqlCredentialFields, gqlIssueCredentialFields } from "@graphql/credential.fields";
import { Credential } from "@model/credential/credential";
import { credentialFromJson } from "@model/credential/credential-builder";
import { CredentialDTO, IssueCredentialDTO } from "@model/credential/credential.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { IdentityProviderCredentials } from "@services/identity/did.provider";
import { logger } from "@services/logger";
import { lazyElastosDIDSDKImport } from "@utils/import-helper";
import { ImportCredentialInput } from "../import-credential.input";

export class CredentialsModule implements IdentityProviderCredentials {
  async createCredential(identityDid: string, credentialId: string, types: string[],
    expirationDate: Date, properties: any): Promise<Credential> {

    logger.log("custodial-provider", "Creating credential", credentialId, types, properties);

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
    const { VerifiableCredential } = await lazyElastosDIDSDKImport();

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

  async importCredential(identityDid: string, credential: VerifiableCredential, importingApplicationDid?: string): Promise<Credential> {
    const input: ImportCredentialInput = {
      identityDid,
      credentialString: credential.toString(),
      importingApplicationDid
    }

    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ importCredential: CredentialDTO }>({
        mutation: gql`
          mutation importCredential($input: ImportCredentialInput!) {
            importCredential(input: $input) {
              ${gqlCredentialFields}
            }
          }
        `,
        variables: {
          input
        }
      });
    });
    if (result?.data?.importCredential) {
      return credentialFromJson(result.data.importCredential);
    }

    return null;
  }

  async listCredentials(identityDid: string): Promise<Credential[]> {
    const result = await withCaughtAppException(async () => {
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

    if (result?.data?.credentials) {
      const credentials = await Promise.all(result.data.credentials.map(credential => credentialFromJson(credential)));
      logger.log("custodial-provider", "Fetched credentials:", credentials);
      return credentials;
    }

    return null;
  }

  async deleteCredential(id: string): Promise<boolean> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ deleteCredential: boolean }>({
        mutation: gql`
        mutation deleteCredential($id: String!) {
          deleteCredential(id: $id)
        }
      `,
        variables: {
          id
        }
      });
    });

    if (result?.data?.deleteCredential) {
      return true;
    }
    else {
      throw new Error("Failed to delete Credential");
    }
  }

}