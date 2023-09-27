import { gql } from "@apollo/client";
import { DIDDocument } from "@elastosfoundation/did-js-sdk";
import { gqlLocalDocumentFields } from "@graphql/document.fields";
import { Document } from "@model/document/document";
import { DocumentDTO } from "@model/document/document.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { IdentityProviderDocument } from "@services/identity/did.provider";
import { AddServiceInput } from "@services/identity/dto/add-service.input.dto";
import { RemoveServiceInput } from "@services/identity/dto/remove-service.input.dto";

export class DocumentModule implements IdentityProviderDocument {
  async addDIDDocumentService(identityDid: string, serviceId: string, type: string, endpoint: string, properties?: any): Promise<boolean> {
    const input: AddServiceInput = {
      identityDid,
      serviceId,
      type,
      endpoint,
      properties
    };

    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ addService: boolean }>({
        mutation: gql`
          mutation addService($input: AddServiceInput!) {
            addService(input: $input)
          }
        `,
        variables: {
          input
        }
      });
    });

    if (result?.data?.addService) {
      return true;
    }
    else {
      throw new Error("Failed to add DIDDocument Service");
    }
  }

  async removeDIDDocumentService(identityDid: string, serviceId: string): Promise<boolean> {
    const input: RemoveServiceInput = {
      identityDid,
      serviceId,
    };

    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ removeService: boolean }>({
        mutation: gql`
          mutation removeService($input: RemoveServiceInput!) {
            removeService(input: $input)
          }
        `,
        variables: {
          input
        }
      });
    });

    if (result?.data?.removeService) {
      return true;
    }
    else {
      throw new Error("Failed to remove DIDDocument Service");
    }
  }

  async getLocalDIDDocument(identityDid: string): Promise<Document> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).query<{ getLocalDIDDocument: DocumentDTO }>({
        query: gql`
          query getLocalDIDDocument($identityDid: String!) {
            getLocalDIDDocument(identityDid: $identityDid) {
              ${gqlLocalDocumentFields}
            }
          }
        `,
        variables: {
          identityDid
        }
      });
    });

    if (result?.data?.getLocalDIDDocument) {
      const didDocument = await DIDDocument.parseAsync(result.data.getLocalDIDDocument.didDocument);
      if (didDocument)
        return new Document(didDocument);
      else
        return null;
    }

    return null;
  }

  synchronize(identityDid: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  setCredentialVisibility(credentialId: string, visible: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }
}