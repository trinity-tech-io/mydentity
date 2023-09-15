import type { DIDDocument } from "@elastosfoundation/did-js-sdk";
import { Document } from "@model/document/document";
import { logger } from "@services/logger";
import { ObjectCache } from "@utils/caches/object-cache";
import { lazyElastosDIDSDKImport } from "@utils/import-helper";
import Queue from "promise-queue";

class DIDDocumentsService {
  private documentsCache = new ObjectCache<Document>();

  private resolveDIDQueue = new Queue(1);

  /**
   * Gets the online DID Document for a given DID string.
   *
   * If the same document is already being fetched, we await until a response is received, but
   * without fetching again.
   */
  public resolveDIDDocument(didString: string, forceRemote = false): Promise<Document> {
    return this.documentsCache.get(didString, {
      create: async () => {
        const resolvedDocument = await this.fetchDIDDocumentWithoutDIDStore(didString, forceRemote);
        logger.log("identity", "Resolved on chain document: ", resolvedDocument);
        return new Document(resolvedDocument);
      },
    }, forceRemote);
  }

  private fetchDIDDocumentWithoutDIDStore(didString: string, forceRemote: boolean): Promise<DIDDocument> {
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
