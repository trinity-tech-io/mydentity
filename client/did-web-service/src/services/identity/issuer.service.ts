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
    return new Promise(async resolve => {
      const didDocument = await this.fetchDIDDocument(didString);

      // Get the issuer icon
      const representativeIconSubject = await didDocumentService.getRepresentativeIcon(didDocument);
      if (representativeIconSubject) {
        representativeIconSubject.subscribe(dataUrl => {
          if (dataUrl) {
            logger.log('identity', 'dataUrl', dataUrl)
            resolve(dataUrl);
          } else
            resolve(null);
        });
      } else
        resolve(null);
    });
  }

  async isPublished(didString: string): Promise<boolean> {
    const didDocument = await this.fetchDIDDocument(didString);

    return didDocument != null;
  }

  /**
   * Fetches the issuer Document
   */
  private async fetchDIDDocument(didString: string, forceRemote = false): Promise<DIDDocument> {
    // for test
    didString = "did:elastos:iqjN3CLRjd7a4jGCZe6B3isXyeLy7KKDuK"; // Kyc

    console.log("fetchDIDDocument", didString)

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