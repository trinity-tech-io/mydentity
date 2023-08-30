import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { Credential } from "@model/credential/credential";
import { Identity } from "@model/identity/identity";
import { logger } from "@services/logger";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";
import { IdentityFeature } from "../identity-feature";

export class CredentialsFeature implements IdentityFeature {
  private _credentials$ = new LazyBehaviorSubjectWrapper<Credential[]>([], () => this.fetchCredentials());
  public get credentials$() { return this._credentials$.getSubject(); }

  constructor(protected identity: Identity) { }

  public async createCredential(credentialId: string, types: string[], expirationDate: Date, prop: any): Promise<Credential> {
    logger.log("credentials", "Creating credential", credentialId, types, expirationDate, prop);

    const credential = await this.identity.provider.createCredential(this.identity.did, credentialId, types, expirationDate, prop);
    this.credentials$.next([credential, ...this.credentials$.value]);
    return credential;
  }

  public async addCredential(vc: VerifiableCredential): Promise<Credential> {
    logger.log("credentials", "Adding credential", vc);

    const credential = await this.identity.provider.addCredential(this.identity.did, vc);
    this.credentials$.next([credential, ...this.credentials$.value]);
    return credential;
  }

  /**
   * Fetches the credentials that belongs to this identity
   */
  private async fetchCredentials(): Promise<Credential[]> {
    logger.log("credentials", "Fetching credentials");
    return this.identity.provider.listCredentials(this.identity.did);
  }

  public async deleteCredential(credentialId: string): Promise<boolean> {
    logger.log("credentials", "Deleting credential");
    const successfulDeletion = await this.identity.provider.deleteCredential(credentialId);
    this.credentials$.next(this.credentials$.value.filter(c => c.verifiableCredential.getId().toString() != credentialId));
    return successfulDeletion;
  }
}