import { DIDDocument } from "@elastosfoundation/did-js-sdk";
import { didDocumentService } from "./diddocuments.service";
import { rawImageToBase64DataUrl } from "./picture.helpers";

class IssuerService {
  async getIssuerName(didString: string) {
    const didDocument = await this.fetchDIDDocument(didString);

    // Get the issuer name
    return await didDocumentService.getRepresentativeOwnerName(didDocument);
  }

  async getIssuerAvatar(didString: string): Promise<string> {
    return new Promise(async resolve => {
      const didDocument = await this.fetchDIDDocument(didString);

      // Get the issuer icon
      let representativeIconSubject = await didDocumentService.getRepresentativeIcon(didDocument);
      if (representativeIconSubject) {
        representativeIconSubject.subscribe(async iconBuffer => {
          if (iconBuffer) {
            const issuerIcon = await rawImageToBase64DataUrl(iconBuffer);
            resolve(issuerIcon);
          } else
            resolve(null);
        });
      } else
        resolve(null);
    });
  }

  async isPublished(didString: string) {
    const didDocument = await this.fetchDIDDocument(didString);

    return didDocument != null;
  }

  /**
   * Fetches the issuer Document
   */
  private async fetchDIDDocument(didString: string, forceRemote = false): Promise<DIDDocument> {
    // for test
    // didString = "did:elastos:iqjN3CLRjd7a4jGCZe6B3isXyeLy7KKDuK"; // Kyc

    let didDocumentStatus = await didDocumentService.fetchOrAwaitDIDDocumentWithStatus(
      didString,
      forceRemote
    );
    if (didDocumentStatus.checked)
      return didDocumentStatus.document;

    return null;
  }
}


export const issuerService = new IssuerService();