import { VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { Credential } from "@model/credential/credential";
import { Identity } from "@model/identity/identity";

/**
 * Interface shared by the custodial and non custodial DID solutions to provide features such as creating a DID,
 * listing credentials, etc. In custodial mode, everything is fetched from the backend (storage).
 * In non custodial mode, this is served by the front end (browser storage).
 */
export interface IdentityProvider {
  createIdentity(): Promise<Identity>;
  deleteIdentity(didString: String): Promise<Boolean>;
  listIdentities(): Promise<Identity[]>;
  listCredentials(identityDid: string): Promise<Credential[]>;
  createVerifiablePresentation(identityDid: string, credentials: VerifiableCredential[], realm: string, nonce: string): Promise<VerifiablePresentation>;
}