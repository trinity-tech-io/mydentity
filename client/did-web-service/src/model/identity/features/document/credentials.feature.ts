import { Identity } from "@model/identity/identity";
import { IdentityFeature } from "../identity-feature";

/**
 * Features related to the (local version of) DID Document of this identity (prior to publishin on chain updates).
 */
export class DocumentFeature implements IdentityFeature {
  constructor(protected identity: Identity) { }

  public setCredentialVisibility(credentialId: string, visible: boolean): Promise<boolean> {
    return this.identity.provider.document.setCredentialVisibility(this.identity.did, credentialId, visible);
  }
}