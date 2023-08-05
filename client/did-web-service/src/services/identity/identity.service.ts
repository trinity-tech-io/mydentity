import { Credential } from "@model/credential/credential";
import { Identity } from "@model/identity/identity";
import { CustodialDIDProvider } from "./custodial/custodial-did.provider";
import { IdentityProvider } from "./did.provider";
import { activeIdentity$ } from "./identity.events";
import { IdentityDTO } from "@model/identity/identity.dto";

class IdentityService {
  private provider: IdentityProvider = new CustodialDIDProvider(); // For now, only a custodial provider in use

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
    activeIdentity$.next(identity);
    localStorage.setItem("activeidentity", JSON.stringify(identity));
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

  async loadActiveIdentity() {
    try {
      const activeIdentityString = localStorage.getItem("activeidentity")
      if (!activeIdentityString) return;
      const IdentityDTO: IdentityDTO = JSON.parse(activeIdentityString)
      const activeIdentity = await Identity.fromJson(IdentityDTO);
      if (!activeIdentity) return;
      this.setActiveIdentity(activeIdentity)
    } catch (error) {
    }
  }
}

export const identityService = new IdentityService();