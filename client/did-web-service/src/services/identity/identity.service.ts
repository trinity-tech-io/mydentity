import { Credential } from "@model/credential/credential";
import { Identity } from "@model/identity/identity";
import { CustodialDIDProvider } from "./custodial/custodial-did.provider";
import { IdentityProvider } from "./did.provider";
import { activeIdentity$ } from "./identity.events";

class IdentityService {
  private provider: IdentityProvider = new CustodialDIDProvider(); // For now, only a custodial provider in use
  private activeIdentityId = "";

  public async init() {
  }

  /**
   * Creates a new identity (DID) for the signed in user
   */
  public createIdentity(): Promise<Identity> {
    return this.provider.createIdentity();
  }

  /**
   * Sets the newly active identity for the whole app. This identity is the one used
   * to list credentials, and do all DID related operations.
   */
  public setActiveIdentity(identity: Identity) {
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

  /**
   * Returns the list of identities (DIDs) for the signed in user
   */
  public listIdentities(): Promise<Identity[]> {
    return this.provider.listIdentities();
  }

  /**
   * Returns the list of identities (DIDs) for the signed in user
   */
  public listCredentials(identityDid: string): Promise<Credential[]> {
    return this.provider.listCredentials(identityDid);
  }

  private getActiveIdentityId(): string {
    if (!this.activeIdentityId)
      this.activeIdentityId = this.loadActiveIdentityId();
    return this.activeIdentityId;
  }

  private loadActiveIdentityId(): string {
    return localStorage.getItem("activeIdentityId");
  }

  restoreActiveIdentity(identities: Identity[]) {
    // 1.load local cached active identity,
    // 2.if not found cached data, set a default identity for convenience
    if (activeIdentity$.value) return;

    if (this.getActiveIdentityId()) {
      const identity = this.queryIdentity(this.activeIdentityId, identities);
      this.setActiveIdentity(identity);
      return;
    }

    if (identities.length > 0)
      identityService.setActiveIdentity(identities[0]);
  }

  private queryIdentity(did: string, identities: Identity[]): Identity {
    const result = identities.find((identity) => {
      return identity.did === did;
    });
    return result
  }
}


export const identityService = new IdentityService();