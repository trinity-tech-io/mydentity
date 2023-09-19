import type { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { Credential } from "@model/credential/credential";
import { Identity } from "@model/identity/identity";
import { logger } from "@services/logger";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { IdentityFeature } from "../identity-feature";
import { callWithUnlock } from "@components/security/unlock-key-prompt/call-with-unlock";

export class CredentialsFeature implements IdentityFeature {
  public credentials$ = new AdvancedBehaviorSubject<Credential[]>(null, () => { return this.fetchCredentials(); });

  constructor(protected identity: Identity) { }

  public async createCredential(credentialId: string, types: string[], expirationDate: Date, prop: any): Promise<Credential> {
    this.ensureCredentialsFetched();
    logger.log("credentials", "Creating credential", credentialId, types, expirationDate, prop);

    const credential = await callWithUnlock(() => this.identity.provider.createCredential(this.identity.did, credentialId, types, expirationDate, prop));
    this.credentials$.next([credential, ...this.credentials$.value]);
    return credential;
  }

  public async issueCredential(subjectDid: string, credentialId: string, types: string[], expirationDate: Date, prop: any): Promise<VerifiableCredential> {
    this.ensureCredentialsFetched();
    logger.log("credentials", "Issuing credential", subjectDid, credentialId, types, expirationDate, prop);

    return callWithUnlock(() => this.identity.provider.issueCredential(this.identity.did, subjectDid, credentialId, types, expirationDate, prop));
  }

  public async importCredential(vc: VerifiableCredential, importingApplicationDid?: string): Promise<Credential> {
    this.ensureCredentialsFetched();
    logger.log("credentials", "Importing credential", vc);

    const credential = await callWithUnlock(() => this.identity.provider.importCredential(this.identity.did, vc, importingApplicationDid), true, null);
    this.credentials$.next([credential, ...this.credentials$.value]);
    return credential;
  }

  /**
   * Fetches the credentials that belongs to this identity
   */
  private async fetchCredentials(): Promise<Credential[]> {
    logger.log("credentials", "Fetching credentials", this.identity.did);
    return callWithUnlock(() => this.identity.provider.listCredentials(this.identity.did));
  }

  public async deleteCredential(credential: Credential): Promise<boolean> {
    this.ensureCredentialsFetched();
    logger.log("credentials", "Deleting credential");

    const successfulDeletion = await callWithUnlock(() => this.identity.provider.deleteCredential(credential.id));
    this.credentials$.next(this.credentials$.value?.filter(c => c.id != credential.id));
    return successfulDeletion;
  }

  private ensureCredentialsFetched(): void {
    if (!this.credentials$.value)
      throw new Error("Don't try to add/delete/edit credentials before the credentials list is fetched!");
  }
}