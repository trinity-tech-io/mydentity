import { DIDDocument } from "@elastosfoundation/did-js-sdk";
import { Document } from "@model/document/document";
import { AppException } from "@model/exceptions/app-exception";
import { ClientError } from "@model/exceptions/exception-codes";
import { lazyDIDInit } from "@services/did.service";
import { logger } from "@services/logger";
import { ObjectCache } from "@utils/caches/object-cache";
import { PermanentCache } from "@utils/caches/permanent-cache";
import { lazyElastosDIDSDKImport } from "@utils/import-helper";
import Queue from "promise-queue";

class DIDDocumentsService {
  private documentsPermanentCache = new PermanentCache<string, unknown>("did-documents", async (didString) => {
    const forceRemote = false; // TODO
    const resolvedDocument = await this.fetchDIDDocumentWithoutDIDStore(didString, forceRemote);
    return resolvedDocument?.toString();
  }, 30 * 60); // 30 minutes cache expiration
  private documentsMemoryCache = new ObjectCache<Document>();

  private resolveDIDQueue = new Queue(1);

  /**
   * Gets the online DID Document for a given DID string.
   *
   * If the same document is already being fetched, we await until a response is received, but
   * without fetching again.
   */
  public async resolveDIDDocument(didString: string, forceRemote = false): Promise<Document> {
    await lazyDIDInit();

    if (forceRemote)
      logger.warn("identity", "forceRemote not fully implemented for resolveDIDDocument()!")

    return this.documentsMemoryCache.get(didString, {
      create: async () => {
        // Try to get from the disk cache
        const documentString = await this.documentsPermanentCache.get(didString);
        const didDocument = await DIDDocument.parseAsync(documentString);
        if (didDocument)
          return new Document(didDocument);
        else
          return null;
      },
      // TODO: forceRemote not passed to permanent storage!
    }, !forceRemote);
  }

  private fetchDIDDocumentWithoutDIDStore(didString: string, forceRemote: boolean): Promise<DIDDocument> {
    if (!didString)
      throw AppException.newClientError(ClientError.InvalidParameter, "Can't fetch a DID document from an empty DID string");

    return this.resolveDIDQueue.add(async () => {
      try {
        const { DIDBackend, DID } = await lazyElastosDIDSDKImport();
        logger.log("identity", "Resolving DID without DID store", didString, forceRemote);
        const did = new DID(didString);
        return DIDBackend.getInstance().resolveDid(did, forceRemote);
      }
      catch (e) {
        logger.error("identity", e);
        return null;
      }
    });
  }
}

export const didDocumentService = new DIDDocumentsService();
