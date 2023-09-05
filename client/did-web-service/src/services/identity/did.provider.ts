import { VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { Credential } from "@model/credential/credential";
import { Identity } from "@model/identity/identity";
import { PublicationStatus } from "@model/publication/publish.dto";

/**
 * Interface shared by the custodial and non custodial DID solutions to provide features such as creating a DID,
 * listing credentials, etc. In custodial mode, everything is fetched from the backend (storage).
 * In non custodial mode, this is served by the front end (browser storage).
 */
export interface IdentityProvider {
  createIdentity(name: string): Promise<Identity>;
  deleteIdentity(identityDid: string): Promise<boolean>;
  listIdentities(): Promise<Identity[]>;
  createCredential(identityDid: string, credentialId: string, types: string[], expirationDate: Date, prop: any): Promise<Credential>;
  addCredential(identityDid: string, credential: VerifiableCredential): Promise<Credential>;
  listCredentials(identityDid: string): Promise<Credential[]>;
  deleteCredential(credentialId: string): Promise<boolean>;
  createVerifiablePresentation(identityDid: string, credentials: VerifiableCredential[], realm: string, nonce: string): Promise<VerifiablePresentation>;
  // get the DID transaction payload
  createDIDPublishTransaction(identityDid: string): Promise<string>;
  // publish Identity to did chain.
  publishIdentity(identityDid: string, payload: string): Promise<string>;
  getPublicationStatus(identityDid: string, publicationId: string): Promise<PublicationStatus>;

  /**
   * Adds a new service to the local DID document.
   * ie: hive url endpoint.
   */
  addDIDDocumentService(identityDid: string, id: string, type: string, endpoint: string, properties?: any): boolean;

  /**
   * Remove a service from the local DID document.
   * ie: hive url endpoint.
   */
  removeDIDDocumentService(identityDid: string, id: string): boolean;
}