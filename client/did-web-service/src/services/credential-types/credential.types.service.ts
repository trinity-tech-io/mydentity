import { DIDDocument, DIDURL, JSONObject, VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { TimeBasedPersistentCache } from "@model/timebasedpersistentcache";
import { didDocumentService } from "@services/identity/diddocuments.service";
import { logger } from "@services/logger";
import jsonld, { ContextDefinition } from "jsonld";
import { Url } from "jsonld/jsonld-spec";
import moment from "moment";
import Queue from "promise-queue";

export type CredentialTypeWithContext = {
  context: string;
  shortType: string;
}

type ContextPayload = JSONObject & {
  "@context": unknown;
}

/**
 * Service responsible for helping in using full url credential types. Historically, we used short types
 * in credentials, such as "VerifiableCredential". Though in order to standardize credentials and provide
 * reusability using elastos DID and VCs, VCs have been upgraded to use types with context, such as:
 * "https://ns.elastos.org/credentials/v1#SensitiveCredential" instead of "SensitiveCredential".
 *
 * Unfortunately, VCs, store "types" and "@contexts" in different fields, and we need to use a JSON-LD
 * support library to reconstruct full urls from type+context.
 *
 * As JSON-LD resolves contexts from various locations (HTTPS, but also Elastos EID chain), we also provide
 * here a cache to avoid fetching those documents too often.
 *
 * Besides those, this service provides helper functions, for example to check if a credential is
 * correctly implemented, meaning that its content can relate to proper credential types.
 */
class CredentialTypesService {
  // Cache for fetched context JSON (from http urls or from the eid chain)
  // This cache is NOT persistent, it is populated again at every app start (for instance,
  // to make sure we get the latest types from DID document, if the service endpoint is updated).
  private contextsCache: TimeBasedPersistentCache<ContextPayload>;

  // Queue to make sure we fetch only one context at a time to avoid fetching the same url multiple times.
  private fetchContextQueue = new Queue(1); // Concurrency: 1

  // Called at boot, not related to the active user
  public async init(): Promise<void> {
    this.contextsCache = await TimeBasedPersistentCache.loadOrCreate("credentialcontextpayloads", true);
  }

  /**
   * From a given credential that contains types and contexts, returns the list of
   * expanded JSONLD identifiers for the credential "types".
   *
   * IMPORTANT NOTE: identifiers can, or can not be the same as the expected context + type concatenation.
   * For example, with w3c types, we have:
   * - Json context used in credentials: https://www.w3.org/2018/credentials/v1
   * - "Type" used in credentials: VerifiableCredential
   * - BUT... The expanded jsonld @id is : https://www.w3.org/2018/credentials#VerifiableCredential
   *   ... instead of what we could expect, https://www.w3.org/2018/credentials/v1#VerifiableCredential
   *
   * This is because jsonld resolved @id and @type fields inside the contexts.
   *
   * So we focus on identifiers here.
   */
  public async resolveExpandedCredentialTypeIdentifiers(credential: VerifiableCredential): Promise<string[]> {
    let credentialJson: any = null;
    try {
      credentialJson = credential.toJSON();
    }
    catch (e) {
      // Credential's toJson() could throw an exception (not bound to a did store because of legacy DID plugin reasons)
      logger.warn("credentialtypes", "Credential could not be parsed, returning empty types");
      return [];
    }

    // Make sure we have "https://www.w3.org/2018/credentials/v1" has first entry in the context,
    // this is a W3C spec requirement
    if (!("@context" in credentialJson) || credentialJson["@context"].indexOf("https://www.w3.org/2018/credentials/v1") !== 0) {
      return [];
    }

    /**
     * Expand the credential, meaning that the "@context" entry is removed and merged with "types" to
     * create full types.
     *
     * Output sample:
     *  Array of:
     *    '@context'?: Keyword['@context'] | undefined;
     *    '@id'?: Keyword['@id'] | undefined;
     *    '@type'?: OrArray<Keyword['@type']> | undefined;
     *    ... Other fields named with the resolved full context+field. Eg: https://www.w3.org/2018/credentials#issuanceDate
     */
    try {
      const expanded = await jsonld.expand(credentialJson, {
        documentLoader: this.buildElastosJsonLdDocLoader()
      });

      if (expanded && expanded.length > 0) {
        // Use only the first output entry. There is normally only one.
        const resultJsonLDNode = expanded[0];

        // Expanded types identifiers can be a string or an array of string. We make this become an array, always.
        return Array.isArray(resultJsonLDNode["@type"]) ? resultJsonLDNode["@type"] : [resultJsonLDNode["@type"]];
      }
      else {
        console.log("error");
      }
    } catch (e) {
      logger.warn("credentialtypes", "Credential could not be expanded, returning empty types.", e);
    }

    return [];
  }

  /**
   * For a given credential, resolves remote contexts JSONLD definitions, then tries
   * to find short types in those contexts.
   *
   * The JSONLD library does something similar but can only expand context+types to
   * return their actual @ids, but it doesn't help us know thich type was found in which context definition.
   */
  public async resolveTypesWithContexts(credential: VerifiableCredential): Promise<CredentialTypeWithContext[]> {
    let credentialJson: any = null;

    try {
      credentialJson = credential.toJSON();
      //console.log("credentialJson", credentialJson)

      // Make sure we have "https://www.w3.org/2018/credentials/v1" has first entry in the context,
      // this is a W3C spec requirement
      if (!("@context" in credentialJson) || credentialJson["@context"].indexOf("https://www.w3.org/2018/credentials/v1") !== 0) {
        return [];
      }

      // Resolve all contexts
      const contexts = credentialJson["@context"];
      const contextPayloadsWithUrls: { url: string, payload: ContextPayload }[] = [];
      for (const context of contexts) {
        const contextPayload = await this.fetchContext(context);
        if (!contextPayload) {
          logger.warn("credentialtypes", "Failed to fetch credential type context for", context);
          continue;
        }

        //console.log("context payload", context, contextPayload)

        if ("@context" in contextPayload) {
          contextPayloadsWithUrls.push({
            url: context,
            payload: contextPayload
          });
        }
      }

      // Now that we have all context payloads, search short types in each of them
      const pairs: CredentialTypeWithContext[] = [];
      for (const type of credential.getType()) { // Short types
        const contextInfo = contextPayloadsWithUrls.find(c => Object.keys(c.payload["@context"]).indexOf(type) >= 0);
        if (contextInfo) {
          pairs.push({
            context: contextInfo.url,
            shortType: type
          })
        }
      }

      return pairs;
    }
    catch (e) {
      // Credential's toJson() could throw an exception (not bound to a did store because of legacy DID plugin reasons)
      //
      logger.warn("credentialtypes", "Credential could not be parsed or , returning empty types.", e);
      return [];
    }
  }

  // eslint-disable-next-line require-await
  private async fetchContext(contextUrl: string): Promise<ContextPayload> {
    const cacheEntry = this.contextsCache.get(contextUrl);
    if (cacheEntry) {
      return cacheEntry.data;
    }

    return this.fetchContextQueue.add(async () => {
      if (contextUrl.startsWith("http")) {
        try {
          const options = {
            url: contextUrl,
            headers:  {
              'Accept': 'application/json'
            }
          };

          const response = await fetch(contextUrl);
          const payload = await response.json();

          this.contextsCache.set(contextUrl, payload as ContextPayload, moment().unix());
          // NOTE - don't save the cache = not persistent on disk - await this.contextsCache.save();

          return payload as ContextPayload;
        } catch (e) {
          // TODO: maybe the context is invalid or the network is error.
          logger.warn("credentialtypes", "Failed to get payload from context.", e);
          return null;
        }
      }
      else if (contextUrl.startsWith("did:")) { // EID url
        // Compute publisher's DID string based on context url
        const { publisher, shortType } = this.extractEIDContext(contextUrl);
        if (!publisher) {
          logger.warn("credentialtypes", "Failed to extract publisher from context", contextUrl);
          return null;
        }

        const docStatus = await didDocumentService.fetchOrAwaitDIDDocumentWithStatus(publisher);
        if (docStatus.document) {
          const serviceId = `${publisher}#${shortType}`;
          const contextPayload = this.getContextPayloadFromDIDDocument(docStatus.document, serviceId);

          this.contextsCache.set(contextUrl, contextPayload, moment().unix());
          // NOTE - don't save the cache = not persistent on disk - await this.contextsCache.save();

          return contextPayload;
        }
        else {
          return null;
        }
      }
      else {
        // Unsupported
        logger.log("credentialtypes", "Unsupported credential context url", contextUrl);
        return null;
      }
    });
  }

  // From: did://elastos/insTmxdDDuS9wHHfeYD1h5C2onEHh3D8Vq/BenCredential
  // To: did:elastos:insTmxdDDuS9wHHfeYD1h5C2onEHh3D8Vq + BenCredential
  private extractEIDContext(context: string): { publisher: string, shortType: string } {
    const regex = new RegExp(/^did:\/\/elastos\/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)/);
    const parts = regex.exec(context);

    if (!parts || parts.length < 3) {
      logger.warn("credentialtypes", 'Invalid url format, cannot find credential publisher and ID');
      return null;
    }

    return {
      publisher: `did:elastos:${parts[1]}`,
      shortType: parts[2]
    }
  }

  /**
   * Searches the given service in the DID document. If found, uses the service endpoint to
   * get the right target credential id in the same document, and gets the context payload out of it.
   */
  public getContextPayloadFromDIDDocument(document: DIDDocument, serviceId: string): ContextPayload {
    const service = document.getService(serviceId);
    if (!service) {
      logger.warn("credentialtypes", "The DID document has no service with ID: " + serviceId);
      return null;
    }

    const targetCredentialId = service.getServiceEndpoint();

    const credential = this.getCredentialById(document, new DIDURL(targetCredentialId));
    if (!credential) {
      logger.warn("credentialtypes", "The DID document has no credential context credential that matches (service id, credential id): ", serviceId, targetCredentialId);
      return null;
    }

    /**
     * Format: https://ns.elastos.org/credentials/context/v1
     * credentialSubject: {
     *   definition: {
     *      @context: {}
     *   }
     * }
     */
    const subject = credential.getSubject().getProperties();
    if (!("definition" in subject) || !("@context" in (subject["definition"] as JSONObject))) {
      logger.warn("credentialtypes", `Credential ${targetCredentialId} found but no definition/@context in the subject. Invalid format.`, subject);
      return null;
    }

    return subject["definition"] as ContextPayload;
  }

  /**
   * Custom loader for the JSON-LD library, that supports resolving contexts from the EID chain.
   */
  private buildElastosJsonLdDocLoader(): { (url: Url, callback: any): Promise<any> } {
    return (url: Url, callback: any) => {
      return new Promise(async (resolve, reject) => {
        try {
          if (url.startsWith("did")) {
            // NOTE: normally fetchcontext could be used to resolve "http" urls as well but for now
            // we use the json ld's "defaultLoader" as it also deals wit hmore advanced cases like
            // following header redirection for special types, etc (more things than our fetcher).
            // For instance, our fetcher works with ns.elastos.org urls, but not with schema.org ones.
            const context = await this.fetchContext(url);
            resolve({
              contextUrl: null,
              documentUrl: url,
              document: context
            });
          }
          else {
            const defaultLoader = (jsonld as any).documentLoaders.xhr();
            const data = await defaultLoader(url);
            resolve(data);
          }
        }
        catch (e) {
          reject(e);
        }
      });
    }
  }

  /**
   * Queues a credential verification and tells if the credential fully conforms to its types, meaning
   * that all fields in the credential subject have a definition in one of the credential types used
   * by the credential.
   */
  public async verifyCredential(credential: VerifiableCredential): Promise<boolean> {
    try {
      const credentialContentJson = credential.toJSON();
      if (typeof credentialContentJson !== "object") {
        logger.warn('credentialtypes', 'verifyCredential false 331')
        return false;
      }

      // Make sure we have "https://www.w3.org/2018/credentials/v1" has first entry in the context,
      // this is a W3C spec requirement
      if (!("@context" in credentialContentJson) || (credentialContentJson["@context"] as any).indexOf("https://www.w3.org/2018/credentials/v1") !== 0) {
        return false;
      }

      // Make sure there is a credentialSubject
      if (!("credentialSubject" in credentialContentJson)) {
        return false;
      }

      // Make sure there is a proof
      if (!("proof" in credentialContentJson)) {
        return false;
      }

      const compacted = await jsonld.compact(credentialContentJson, credentialContentJson["@context"] as ContextDefinition, {
        documentLoader: this.buildElastosJsonLdDocLoader()
      });

      if (compacted) {
        // If the credential subject is empty (only id), JsonLD returns credentialSubject: "theid".
        // We turn this back to an object for our display to work better right after.
        if (!("credentialSubject" in compacted) || typeof compacted["credentialSubject"] === "string") {
          compacted.credentialSubject = {
            id: compacted.credentialSubject
          }
        }

        // Check what original fields are missing after compacting. Is some warnings are generated,
        // this means the document is not conform
        const { modifiedDoc, warningsGenerated } = this.addMissingFieldsToCompactHtmlResult(credentialContentJson, compacted);
        if (!warningsGenerated)
          return true;
      }
    }
    catch (e) {
      logger.warn('credentialtypes', 'verifyCredential error', e);
      return false;
    }

    return false;
  }

  // TODO: RECURSIVE
  private addMissingFieldsToCompactHtmlResult(originalUserDoc: any, compactedDoc: any): { modifiedDoc: any, warningsGenerated: boolean } {
    let warningsGenerated = false;
    const modifiedCompactedDoc = Object.assign({}, compactedDoc);

    // Credential subject
    for (const key of Object.keys(originalUserDoc.credentialSubject)) {
      if (!(key in compactedDoc.credentialSubject)) {
        modifiedCompactedDoc.credentialSubject["MISSING_KEY_" + key] = "This field is missing in credential types";
        warningsGenerated = true;
      }
    }

    // Proof
    for (const key of Object.keys(originalUserDoc.proof)) {
      if (!(key in compactedDoc.proof)) {
        modifiedCompactedDoc.proof["MISSING_KEY_" + key] = "This field is missing in credential types";
        warningsGenerated = true;
      }
    }

    return {
      modifiedDoc: modifiedCompactedDoc,
      warningsGenerated
    };
  }

  getCredentialById(document: DIDDocument, credentialId: DIDURL): VerifiableCredential {
    const credentials = document.getCredentials();
    return credentials.find((c) => {
      return credentialId.getFragment() == c.getId().getFragment();
    });
  }
}

export const credentialTypesService = new CredentialTypesService();