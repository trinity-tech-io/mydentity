import { Credential } from "@model/credential/credential";
import { Identity } from "@model/identity/identity";
import { logger } from "@services/logger";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";
import { IdentityFeature } from "../identity-feature";

export class CredentialsFeature implements IdentityFeature {
  private _credentials$ = new LazyBehaviorSubjectWrapper<Credential[]>([], () => this.fetchCredentials());
  public get credentials$() { return this._credentials$.getSubject(); }

  constructor(protected identity: Identity) {
  }

  public async createCredential(credentialId: string, types: string[], expirationDate: Date, prop: any): Promise<Credential> {
    logger.log("credentials", "Creating credential", credentialId, types, expirationDate, prop);

    const credential = await this.identity.createCredential(credentialId, types, expirationDate, prop);
    this.credentials$.next([credential, ...this.credentials$.value]);
    return credential;
  }

  private async fetchCredentials() {
    logger.log("credentials", "Fetching credentials");

    const credentials = await this.identity.listCredentials();
    this.credentials$.next(credentials);
  }

  public async deleteCredential(credentialId: string): Promise<boolean> {
    logger.log("credentials", "Deleting credential");

    const successfulDeletion = await this.identity.deleteCredential(credentialId);
    this.credentials$.next(this.credentials$.value.filter( c => c.verifiableCredential.getId().toString() != credentialId));
    return successfulDeletion;
  }

}