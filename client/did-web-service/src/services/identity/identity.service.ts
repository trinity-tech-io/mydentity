import { Document } from "@model/document/document";
import { IdentityPublicationStatusResult } from "@model/identity-publication/identity-publication-status.dto";
import { Identity } from "@model/identity/identity";
import { IdentityType } from "@model/identity/identity-type";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { RootIdentity } from "@model/root-identity/root-identity";
import { CustodialDIDProvider } from "./custodial/custodial-did.provider";
import { activeIdentity$ } from "./identity.events";

export const custodialIdentityProvider = new CustodialDIDProvider(); // For now, only a custodial provider in use

class IdentityService {
  private provider = custodialIdentityProvider;
  private activeIdentityId = "";

  /**
   * Creates a new identity (DID) for the signed in user
   */
  public createIdentity(name: string, identityType: IdentityType, hiveVaultProvider?: string, rootIdentityId?: string): Promise<Identity> {
    return this.provider.identity.createIdentity(name, identityType, hiveVaultProvider, rootIdentityId);
  }

  /**
   * Delete identity (DID)
   */
  public deleteIdentity(didString: string): Promise<boolean> {
    return this.provider.identity.deleteIdentity(didString);
  }

  /**
   * Publish identity (DID) to did chain.
   *  return the tx id.
   */
  public publishIdentity(didString: string): Promise<string> {
    return this.provider.publication.publishIdentity(didString);
  }

  /**
   * Get publication status
   */
  public getPublicationStatus(didString: string): Promise<IdentityPublicationStatusResult> {
    return this.provider.publication.getPublicationStatus(didString);
  }

  /**
   * Sets the newly active identity for the whole app. This identity is the one used
   * to list credentials, and do all DID related operations.
   */
  public async setActiveIdentity(identity: RegularIdentity): Promise<void> {
    if (!identity) {
      activeIdentity$.next(null);
      this.activeIdentityId = "";
      localStorage.setItem("activeIdentityId", "");
      return;
    }

    try {
      await identity.markIdentityInUse(identity.did);
    } catch (e) {
      // do nothing
    }

    activeIdentity$.next(identity);
    this.activeIdentityId = identity.did;
    localStorage.setItem("activeIdentityId", this.activeIdentityId);
  }

  public getActiveIdentityId(): string {
    if (!this.activeIdentityId)
      this.activeIdentityId = this.loadActiveIdentityId();
    return this.activeIdentityId;
  }

  private loadActiveIdentityId(): string {
    return localStorage.getItem("activeIdentityId");
  }

  private restoreActiveIdentity(identities: RegularIdentity[]): void {
    // 1.load local cached active identity,
    // 2.if no cached data found, set a default identity for convenience
    if (activeIdentity$.value)
      return;

    if (this.getActiveIdentityId()) {
      const identity = this.findIdentityByDID(this.activeIdentityId, identities);
      this.setActiveIdentity(identity);
      return;
    }

    if (identities.length > 0)
      identityService.setActiveIdentity(identities[0]);
  }

  private onlyRegularIdentities(identities: Identity[]): RegularIdentity[] {
    return identities.filter(i => i instanceof RegularIdentity) as RegularIdentity[];
  }

  private findIdentityByDID(did: string, identities: Identity[]): RegularIdentity {
    const result = identities?.find((identity) => {
      return identity.did === did;
    });
    return result as RegularIdentity;
  }

  /**
   * Returns the list of identities for the signed in user
   */
  public async listIdentities(): Promise<Identity[]> {
    const identities = await this.provider.identity.listIdentities();

    // Check if we have a local identity saved into local storage and restore it if we can
    this.restoreActiveIdentity(this.onlyRegularIdentities(identities));

    return identities
  }

  /**
   * Returns the list of root identities
   */
  public async listRootIdentities(): Promise<RootIdentity[]> {
    return this.provider.identity.listRootIdentities();
  }

  /**
   * Add service to did document.
   */
  public addDIDDocumentService(identityDid: string, id: string, type: string, endpoint: string, properties?: any): Promise<boolean> {
    return this.provider.document.addDIDDocumentService(identityDid, id, type, endpoint, properties);
  }

  /**
   * Remove service from did document.
   */
  public removeDIDDocumentService(identityDid: string, id: string): Promise<boolean> {
    return this.provider.document.removeDIDDocumentService(identityDid, id);
  }

  public getLocalDIDDocument(identityDid: string): Promise<Document> {
    return this.provider.document.getLocalDIDDocument(identityDid);
  }

  public synchronize(identityDid: string): Promise<void> {
    return this.provider.document.synchronize(identityDid);
  }
}

export const identityService = new IdentityService();