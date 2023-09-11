import { callWithUnlock } from "@components/security/unlock-key-prompt/UnlockKeyPrompt";
import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { Credential } from "@model/credential/credential";
import { Identity } from "@model/identity/identity";
import { logger } from "@services/logger";
import { LazyBehaviorSubject } from "@utils/lazy-behavior-subject";
import { IdentityFeature } from "../identity-feature";

export class CredentialsFeature implements IdentityFeature {
  /* private _credentials$ = new LazyBehaviorSubjectWrapper<Credential[]>([], () => {
    return this.fetchCredentials();
  });
  public get credentials$(): BehaviorSubject<Credential[]> { return this._credentials$.getSubject(); } */
  public credentials$ = new LazyBehaviorSubject<Credential[]>(null, () => {
    return this.fetchCredentials();
  });

  constructor(protected identity: Identity) { }

  public async createCredential(credentialId: string, types: string[], expirationDate: Date, prop: any): Promise<Credential> {
    logger.log("credentials", "Creating credential", credentialId, types, expirationDate, prop);

    const credential = await this.identity.provider.createCredential(this.identity.did, credentialId, types, expirationDate, prop);
    this.credentials$.next([credential, ...this.credentials$.value]);
    return credential;
  }

  public async issueCredential(subjectDid: string, credentialId: string, types: string[], expirationDate: Date, prop: any): Promise<VerifiableCredential> {
    logger.log("credentials", "Issuing credential", subjectDid, credentialId, types, expirationDate, prop);

    const credential = await this.identity.provider.issueCredential(this.identity.did, subjectDid, credentialId, types, expirationDate, prop);
    return credential;
  }

  public async importCredential(vc: VerifiableCredential): Promise<Credential> {
    logger.log("credentials", "Importing credential", vc);

    const credential = await this.identity.provider.importCredential(this.identity.did, vc);
    this.credentials$.next([credential, ...this.credentials$.value]);
    return credential;
  }

  /**
   * Fetches the credentials that belongs to this identity
   */
  private async fetchCredentials(): Promise<Credential[]> {
    logger.log("credentials", "Fetching credentials", this.identity.did);
    const result = await callWithUnlock(() => { return this.identity.provider.listCredentials(this.identity.did) });

    return result;
  }

  public async deleteCredential(credential: Credential): Promise<boolean> {
    logger.log("credentials", "Deleting credential");
    const successfulDeletion = await this.identity.provider.deleteCredential(credential.id);
    this.credentials$.next(this.credentials$.value?.filter(c => c.id != credential.id));
    return successfulDeletion;
  }
}