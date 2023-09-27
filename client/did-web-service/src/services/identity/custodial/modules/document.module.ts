import { IdentityProviderDocument } from "@services/identity/did.provider";

export class DocumentModule implements IdentityProviderDocument {
  addDIDDocumentService(identityDid: string, id: string, type: string, endpoint: string, properties?: any): boolean {
    throw new Error("Method not implemented.");
  }

  removeDIDDocumentService(identityDid: string, id: string): boolean {
    throw new Error("Method not implemented.");
  }
}