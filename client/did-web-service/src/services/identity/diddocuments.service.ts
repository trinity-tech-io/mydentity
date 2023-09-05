import { DID, DIDBackend, DIDDocument, DIDURL, DefaultDIDAdapter, VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { getHiveScriptPictureDataUrl } from "@services/hive/hive-pictures.service";
import { logger } from "@services/logger";
import Queue from "promise-queue";
import { BehaviorSubject } from "rxjs";
import { identityService } from "./identity.service";

export type OnlineDIDDocumentStatus = {
  checking: boolean;
  checked: boolean;
  document: DIDDocument;
}

class OnlineDIDDocumentsStatus {
  private documentsSubjects = new Map<string, BehaviorSubject<OnlineDIDDocumentStatus>>();

  public get(didString: string): BehaviorSubject<OnlineDIDDocumentStatus> {
    if (!this.documentsSubjects.has(didString)) {
      // Document subject not cached yet, so we create one for it, with a null document (not yet fetched)
      const subject = new BehaviorSubject<OnlineDIDDocumentStatus>({
        checking: false,
        checked: false,
        document: null
      });
      this.documentsSubjects.set(didString, subject);
    }
    return this.documentsSubjects.get(didString);
  }

  public set(didString: string, checking: boolean, checked: boolean, document: DIDDocument): void {
    // Create the subject if needed, and emit an update event.
    this.documentsSubjects.get(didString).next({ checking, checked, document });
  }
}

class DIDDocumentsService {

  /**
   * Subjects that notifiy about online DID Document availabilities.
   */
  public onlineDIDDocumentsStatus = new OnlineDIDDocumentsStatus();

  private resolveDIDQueue = new Queue(1);

  private network = 'mainnet';

  constructor() {
    DIDBackend.initialize(new DefaultDIDAdapter(this.network));
  }

  /**
   * Fetches the DID Document and notifies listeners when this is ready
   */
  public async fetchActiveUserOnlineDIDDocument(forceRemote = false): Promise<DIDDocument> {
    const didString = identityService.getActiveIdentityId();
    const currentOnChainDIDDocument = await this.resolveDIDWithoutDIDStore(
      didString,
      forceRemote
    );
    logger.log("Identity", "Resolved on chain document: ", currentOnChainDIDDocument);

    // Tell listeners that the document has been fetched.
    this.onlineDIDDocumentsStatus.set(didString, false, true, currentOnChainDIDDocument);

    return currentOnChainDIDDocument;
  }

  private resolveDIDWithoutDIDStore(
    didString: string,
    forceRemote: boolean
  ): Promise<DIDDocument> {
    return this.resolveDIDQueue.add(async () => {
      logger.log("Identity", "Resolving DID without DID store", didString, forceRemote);
      const did = new DID(didString);
      return DIDBackend.getInstance().resolveDid(did, forceRemote);
    })
  }

  /**
   * Gets the online DID Document for a given DID string.
   * This can be active user's DID, or another one.
   *
   * If the same document is already being fetched, we await until a response is received, but
   * without fetching again.
   */
  public fetchOrAwaitDIDDocumentWithStatus(didString: string, forceRemote = false): Promise<OnlineDIDDocumentStatus> {
    const cachedDocumentSubject = this.onlineDIDDocumentsStatus.get(didString);

    return new Promise(async resolve => {
      if (cachedDocumentSubject.value.checking) {
        const subscription = cachedDocumentSubject.subscribe(status => {
          if (status.checked) {
            subscription.unsubscribe();
            resolve(status);
          }
        });
      }
      else {
        if (!cachedDocumentSubject.value.checked || forceRemote) {
          // Not checked yet, or force remote: fetched for real
          this.onlineDIDDocumentsStatus.set(didString, true, false, null);
          const resolvedDocument = await this.resolveDIDWithoutDIDStore(didString, forceRemote);
          logger.log("Identity", "Resolved on chain document: ", resolvedDocument);

          this.onlineDIDDocumentsStatus.set(didString, false, true, resolvedDocument);

          resolve(cachedDocumentSubject.value);
        }
        else {
          // checked and not forcing remote: return cached
          resolve(cachedDocumentSubject.value);
        }
      }
    });
  }

  /**
   * Returns a subject that provides a resolved remote icon content.
   * This icon represents the did document and can be either:
   * - An "avatar", if the did document represents a regular user
   * - An "app icon", if the did document is an application DID
   */
  public getRepresentativeIcon(document: DIDDocument): Promise<BehaviorSubject<string>> {
    if (!document) return null;

    let hiveIconUrl: string = null;

    const credentials = document.getCredentials();

    // Try to find suitable credentials in the document - start with the application credential type
    const applicationCredentials = this.getCredentialsByType(credentials, "ApplicationCredential");
    //console.log("getRepresentativeIcon applicationCredentials", applicationCredentials)
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

    return getHiveScriptPictureDataUrl(hiveIconUrl, document.getSubject().toString());
  }

  /**
   * Returns a subject that provides a displayable title for this document owner.
   * This title can be either:
   * - A "fullname", if the did document represents a regular user
   * - An "app title", if the did document is an application DID
   */
  public getRepresentativeOwnerName(document: DIDDocument): string {
    if (!document) return null;

    let name: string = null;

    const credentials = document.getCredentials();

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
  getCredentialsByType(credentials: VerifiableCredential[], credentialType: string): VerifiableCredential[] {
    return credentials?.filter((c) => {
      return c.getType().indexOf(credentialType) >= 0;
    });
  }

  getCredentialById(credentials: VerifiableCredential[], credentialId: DIDURL): VerifiableCredential {
    return credentials.find((c) => {
      return credentialId.getFragment() == c.getId().getFragment();
    });
  }
}

export const didDocumentService = new DIDDocumentsService();
