import { Document } from "@model/document/document";
import { didDocumentService } from "./diddocuments.service";

class IssuerService {
  async getIssuerName(didString: string): Promise<string> {
    const document = await this.fetchDocument(didString);

    // Get the issuer name
    return document.getRepresentativeOwnerName();
  }

  async getIssuerAvatar(didString: string): Promise<string> {
    const document = await this.fetchDocument(didString);

    // Get the issuer icon
    return document.getRepresentativeIcon();
  }

  async isPublished(didString: string): Promise<boolean> {
    const didDocument = await this.fetchDocument(didString);
    return !!didDocument;
  }

  /**
   * Fetches the issuer Document
   */
  private async fetchDocument(didString: string, forceRemote = false): Promise<Document> {
    // for test
    //didString = "did:elastos:iqjN3CLRjd7a4jGCZe6B3isXyeLy7KKDuK"; // Kyc
    return didDocumentService.resolveDIDDocument(didString, forceRemote);
  }
}

export const issuerService = new IssuerService();