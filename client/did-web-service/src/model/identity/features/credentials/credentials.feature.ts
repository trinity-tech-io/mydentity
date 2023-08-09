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

  private async fetchCredentials() {
    logger.log("credentials", "Fetching credentials");

    const credentials = await this.identity.listCredentials();
    this.credentials$.next(credentials);
  }
}