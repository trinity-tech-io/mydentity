import { DIDDocument, DIDURL, VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { getHiveScriptPictureDataUrl } from "@services/hive/hive-pictures.service";
import { lazyElastosDIDSDKImport } from "@utils/import-helper";

/**
 * Wrapper around DID documents, with additional capabilities.
 */
export class Document {
  constructor(private didDocument: DIDDocument) { }

  public getDIDDocument(): DIDDocument {
    return this.didDocument;
  }

  /**
   * Returns a subject that provides a resolved remote icon content.
   * This icon represents the did document and can be either:
   * - An "avatar", if the did document represents a regular user
   * - An "app icon", if the did document is an application DID
   */
  public async getRepresentativeIcon(): Promise<string> {
    const { DIDURL } = await lazyElastosDIDSDKImport();

    if (!this)
      return null;

    let hiveIconUrl: string = null;

    const credentials = this.didDocument.getCredentials();

    // Try to find suitable credentials in the document - start with the application credential type
    const applicationCredentials = this.getCredentialsByType(credentials, "ApplicationCredential");
    if (applicationCredentials && applicationCredentials.length > 0) {
      const props = applicationCredentials[0].getSubject().getProperties();
      if ("iconUrl" in props)
        hiveIconUrl = props["iconUrl"] as string;
    }

    // Check the "avatar" standard
    if (!hiveIconUrl) {
      const avatarCredentials = this.getCredentialsByType(credentials, "AvatarCredential");
      if (!avatarCredentials || avatarCredentials.length === 0) {
        // Could not find the more recent avatarcredential type. Try the legacy #avatar name
        const avatarCredential = this.getCredentialById(credentials, new DIDURL("#avatar"));
        if (avatarCredential)
          avatarCredentials.push(avatarCredential);
      }

      if (avatarCredentials && avatarCredentials.length > 0) {
        const props = avatarCredentials[0].getSubject().getProperties();
        if ("avatar" in props && typeof props["avatar"] === "object") {
          const avatar = props["avatar"];
          if ("type" in avatar && avatar["type"] === "elastoshive")
            hiveIconUrl = avatar["data"] as string;
        }
      }
    }

    if (!hiveIconUrl)
      return null;

    return getHiveScriptPictureDataUrl(hiveIconUrl);
  }

  /**
   * Returns a subject that provides a displayable title for this document owner.
   * This title can be either:
   * - A "fullname", if the did document represents a regular user
   * - An "app title", if the did document is an application DID
   */
  public async getRepresentativeOwnerName(): Promise<string> {
    const { DIDURL } = await lazyElastosDIDSDKImport();

    let name: string = null;

    const credentials = this.didDocument.getCredentials();

    // Try to find suitable credentials in the document - start with the application credential type
    const applicationCredentials = this.getCredentialsByType(credentials, "ApplicationCredential");
    if (applicationCredentials && applicationCredentials.length > 0) {
      const props = applicationCredentials[0].getSubject().getProperties();
      if ("name" in props)
        name = props["name"] as string;
    }

    // Check the "name" standard
    if (!name) {
      const nameCredentials = this.getCredentialsByType(credentials, "NameCredential");
      if (nameCredentials && nameCredentials.length > 0) {
        const props = nameCredentials[0].getSubject().getProperties();
        if ("name" in props)
          name = props["name"] as string;
      }
    }

    // Check the legacy "name"
    if (!name) {
      const nameCredential = this.getCredentialById(credentials, new DIDURL("#name"));
      if (nameCredential) {
        const props = nameCredential.getSubject().getProperties();
        if ("name" in props)
          name = props["name"] as string;
      }
    }

    return name;
  }


  /**
   * Retrieve credentials that match a given credential type
   */
  private getCredentialsByType(credentials: VerifiableCredential[], credentialType: string): VerifiableCredential[] {
    return credentials?.filter((c) => {
      return c.getType().indexOf(credentialType) >= 0;
    });
  }

  private getCredentialById(credentials: VerifiableCredential[], credentialId: DIDURL): VerifiableCredential {
    return credentials.find((c) => {
      return credentialId.getFragment() == c.getId().getFragment();
    });
  }
}