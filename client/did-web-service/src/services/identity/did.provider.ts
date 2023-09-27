import type { VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { Credential } from "@model/credential/credential";
import { Document } from "@model/document/document";
import { IdentityPublicationStatusResult } from "@model/identity-publication/identity-publication-status.dto";
import { Identity } from "@model/identity/identity";
import { IdentityType } from "@model/identity/identity-type";
import { RootIdentity } from "@model/root-identity/root-identity";

export interface IdentityProviderIdentity {
  createIdentity(name: string, identityType: IdentityType, hiveVaultProvider?: string): Promise<Identity>;
  deleteIdentity(identityDid: string): Promise<boolean>;
  listIdentities(): Promise<Identity[]>;
  listRootIdentities(): Promise<RootIdentity[]>;
}

export interface IdentityProviderCredentials {
  /**
   * Creates a credential and attaches it to the target identity.
   * The credential is NOT put in the DID document so it won't be visible when the DID is published.
   */
  createCredential(identityDid: string, credentialId: string, types: string[], expirationDate: Date, prop: any): Promise<Credential>;
  issueCredential(identityDid: string, subjectDid: string, credentialId: string, types: string[], expirationDate: Date, prop: any): Promise<VerifiableCredential>;
  importCredential(identityDid: string, credential: VerifiableCredential, importingApplicationDid?: string): Promise<Credential>;
  listCredentials(identityDid: string): Promise<Credential[]>;
  deleteCredential(id: string): Promise<boolean>;
}

export interface IdentityProviderPresentation {
  createVerifiablePresentation(identityDid: string, credentials: VerifiableCredential[], realm: string, nonce: string): Promise<VerifiablePresentation>;
}

export interface IdentityProviderPublication {
  /**
   * Gets the DID transaction payload, used to publish the identity.
   */
  createDIDPublishTransaction(identityDid: string): Promise<string>;

  /**
   * Publishes the identity's DID Document as it is currently, to the EID chain.
   * Call createDIDPublishTransaction() to obtain the payload.
   */
  publishIdentity(identityDid: string, payload: string): Promise<string>;

  /**
   * Returns the current publication status for a given identity (on chain existence or not)
   */
  getPublicationStatus(identityDid: string): Promise<IdentityPublicationStatusResult>;
}

export interface IdentityProviderDocument {
  /**
   * Gets the local DID document for a given DID. The local document can be different
   * from the on chain document in case some changes have been done locally but not
   * yet published.
   */
  getLocalDIDDocument(identityDid: string): Promise<Document>;

  /**
   * Updates the local DID document with the on chain version, to make sure we have the
   * most recent version before modifying the local document.
   *
   * TODO: explain what happens if the local document is more recent than the chain one and both were changes. Overwrite or not?
   */
  synchronize(identityDid: string): Promise<void>;

  /**
   * Adds or removes an existing credential from its related DID document.
   * If the credential is made visible, the DID document will contain it and after publishing,
   * the credential will be publicly discoverable.
   */
  setCredentialVisibility(credentialId: string, visible: boolean): Promise<void>;

  /**
   * Adds a new service to the local DID document.
   * ie: hive url endpoint.
   */
  addDIDDocumentService(identityDid: string, id: string, type: string, endpoint: string, properties?: any): Promise<boolean>;

  /**
   * Remove a service from the local DID document.
   * ie: hive url endpoint.
   */
  removeDIDDocumentService(identityDid: string, id: string): Promise<boolean>;
}

/**
 * Interface shared by the custodial and non custodial DID solutions to provide features such as creating a DID,
 * listing credentials, etc. In custodial mode, everything is fetched from the backend.
 * In non custodial mode, this is served by the front end (browser storage).
 */
export interface IdentityProvider {
  identity: IdentityProviderIdentity;
  credentials: IdentityProviderCredentials;
  presentation: IdentityProviderPresentation;
  publication: IdentityProviderPublication;
  document: IdentityProviderDocument;
}