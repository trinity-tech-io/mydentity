import { Identity } from "@model/identity/identity";
import { CustodialDIDProvider } from "./custodial/custodial-did.provider";
import { IdentityProvider } from "./did.provider";
import { activeIdentity$ } from "./identity.events";

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

    // TODO: SAVE TO LOCAL STORAGE, AND RESTORE FROM LOCAL STORAGE WHEN RELOADING APP
  }

  /**
   * Returns the list of identities (DIDs) for the signed in user
   */
  public listIdentities(): Promise<Identity[]> {
    return this.provider.listIdentities();
  }
}

export const identityService = new IdentityService();