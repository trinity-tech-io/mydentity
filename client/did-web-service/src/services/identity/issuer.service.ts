import { DIDDocument } from "@elastosfoundation/did-js-sdk";
import { logger } from "@services/logger";
import { didDocumentService } from "./diddocuments.service";

class IssuerService {
  async getIssuerName(didString: string): Promise<string> {
    const didDocument = await this.fetchDIDDocument(didString);

    // Get the issuer name
    return await didDocumentService.getRepresentativeOwnerName(didDocument);
  }

  async getIssuerAvatar(didString: string): Promise<string> {
    const didDocument = await this.fetchDIDDocument(didString);

    // Get the issuer icon
    const dataUrl = await didDocumentService.getRepresentativeIcon(didDocument);
    if (dataUrl) {
      logger.log('identity', 'dataUrl', dataUrl)
      return dataUrl;
    } else
      return null;
  }

  async isPublished(didString: string): Promise<boolean> {
    const didDocument = await this.fetchDIDDocument(didString);
    return !!didDocument;
  }

  /**
   * Fetches the issuer Document
   */
  private async fetchDIDDocument(didString: string, forceRemote = false): Promise<DIDDocument> {
    // for test
    didString = "did:elastos:iqjN3CLRjd7a4jGCZe6B3isXyeLy7KKDuK"; // Kyc

    const didDocumentStatus = await didDocumentService.fetchOrAwaitDIDDocumentWithStatus(
      didString,
      forceRemote
    );

    if (didDocumentStatus.checked)
      return didDocumentStatus.document;

    return null;
  }
}


export const issuerService = new IssuerService();