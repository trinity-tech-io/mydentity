import { Identity } from "@model/identity/identity";
import { storageService } from "@services/storage.service";
import { IdentityFeature } from "../identity-feature";

/**
 * File system storage sandboxed for this identity, in order to not mix data with other identities
 */
export class StorageFeature implements IdentityFeature {
  constructor(private identity: Identity) { }

  public async set(key: string, value: string): Promise<void> {
    return storageService.set(this.getObjectContext(), key, value);
  }

  public async get(key: string, defaultValue: string | null): Promise<string> {
    return storageService.get(this.getObjectContext(), key, defaultValue);
  }

  private getObjectContext(): string {
    return `identity_${this.identity.did}`;
  }
}
