import { DIDDocument } from "@elastosfoundation/did-js-sdk";
import { didDocumentService } from "./diddocuments.service";
import { rawImageToBase64DataUrl } from "./picture.helpers";

export class IssuerService {
  private didDocument: DIDDocument = null;
  private issuerName = null;
  private issuerIcon = null;

  constructor(private didString: string) {
    // for test
    // this.didString = "did:elastos:iqjN3CLRjd7a4jGCZe6B3isXyeLy7KKDuK"; // Kyc
  }

  async getIssuerName() {
    if (this.issuerName)
      return this.issuerName;

    await this.fetchDIDDocument();

    // Get the issuer name
    this.issuerName = await didDocumentService.getRepresentativeOwnerName(this.didDocument);
    return this.issuerName;
  }

  async getIssuerAvatar() {
    if (this.issuerIcon)
      return this.issuerIcon;

    return new Promise(async resolve => {
      await this.fetchDIDDocument();

      // Get the issuer icon
      let representativeIconSubject = await didDocumentService.getRepresentativeIcon(this.didDocument);
      if (representativeIconSubject) {
        representativeIconSubject.subscribe(async iconBuffer => {
          if (iconBuffer) {
            this.issuerIcon = await rawImageToBase64DataUrl(iconBuffer);
          }
          resolve(this.issuerIcon);
        });
      } else
        resolve(null);
    });
  }

  async isPublished() {
    await this.fetchDIDDocument();

    return this.didDocument != null;
  }

  /**
   * Fetches the issuer Document
   */
  private async fetchDIDDocument(forceRemote = false): Promise<DIDDocument> {
    if (!this.didDocument) {
      let didDocumentStatus = await didDocumentService.fetchOrAwaitDIDDocumentWithStatus(
        this.didString,
        forceRemote
      );
      if (didDocumentStatus.checked)
        this.didDocument = didDocumentStatus.document;
    }

    return this.didDocument;
  }
}
