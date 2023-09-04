import { Identity } from "@model/identity/identity";
import { PublicationStatus } from "@model/publication/publish.dto";
import { CustodialDIDProvider } from "./custodial/custodial-did.provider";
import { IdentityProvider } from "./did.provider";
import { activeIdentity$ } from "./identity.events";

class IdentityService {
  private provider: IdentityProvider = new CustodialDIDProvider(); // For now, only a custodial provider in use
  private activeIdentityId = "";

  /**
   * Creates a new identity (DID) for the signed in user
   */
  public createIdentity(name: string): Promise<Identity> {
    return this.provider.createIdentity(name);
  }

  /**
   * Delete identity (DID)
   */
  public deleteIdentity(didString: string): Promise<boolean> {
    return this.provider.deleteIdentity(didString);
  }

  /**
   * Publish identity (DID), return the did transaction payload.
   */
  public createDIDPublishTransaction(didString: string): Promise<string> {
    return this.provider.createDIDPublishTransaction(didString);
  }

  /**
   * Publish identity (DID) to did chain.
   *  return the tx id.
   */
  public publishIdentity(didString: string, payload: string): Promise<string> {
    return this.provider.publishIdentity(didString, payload);
  }

  /**
   * Get publication status
   */
  public getPublicationStatus(didString: string, publicationId: string): Promise<PublicationStatus> {
    return this.provider.getPublicationStatus(didString, publicationId);
  }

  /**
   * Sets the newly active identity for the whole app. This identity is the one used
   * to list credentials, and do all DID related operations.
   */
  public setActiveIdentity(identity: Identity): void {
    if (!identity) {
      activeIdentity$.next(null);
      this.activeIdentityId = "";
      localStorage.setItem("activeIdentityId", "");
      return;
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

  private restoreActiveIdentity(identities: Identity[]): void {
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

  private findIdentityByDID(did: string, identities: Identity[]): Identity {
    const result = identities?.find((identity) => {
      return identity.did === did;
    });
    return result
  }

  /**
   * Returns the list of identities for the signed in user
   */
  public async listIdentities(): Promise<Identity[]> {
    const identities = await this.provider.listIdentities();

    // Check if we have a local identity saved into local storage and restore it if we can
    this.restoreActiveIdentity(identities);

    return identities
  }
}


export const identityService = new IdentityService();