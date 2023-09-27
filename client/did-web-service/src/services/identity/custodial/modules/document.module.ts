import { Document } from "@model/document/document";
import { IdentityProviderDocument } from "@services/identity/did.provider";

export class DocumentModule implements IdentityProviderDocument {
  addDIDDocumentService(identityDid: string, id: string, type: string, endpoint: string, properties?: any): boolean {
    throw new Error("Method not implemented.");
  }

  removeDIDDocumentService(identityDid: string, id: string): boolean {
    throw new Error("Method not implemented.");
  }

  getLocalDIDDocument(identityDid: string): Promise<Document> {
    throw new Error("Method not implemented.");
  }

  synchronize(identityDid: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  setCredentialVisibility(credentialId: string, visible: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }
}