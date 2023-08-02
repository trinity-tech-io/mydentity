import { Identity } from "@model/identity/identity";
import { CustodialDIDProvider } from "./custodial/custodial-did.provider";
import { IdentityProvider } from "./did.provider";

class IdentityService {
  private provider: IdentityProvider = new CustodialDIDProvider(); // For now, only a custodial provider in use

  /**
   * Creates a new identity (DID) for the signed in user
   */
  public createIdentity(): Promise<Identity> {
    return this.provider.createIdentity();
  }

  /**
   * Returns the list of identities (DIDs) for the signed in user
   */
  public listIdentities(): Promise<Identity[]> {
    return this.provider.listIdentities();
  }
}

export const identityService = new IdentityService();