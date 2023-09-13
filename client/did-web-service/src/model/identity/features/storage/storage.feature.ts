import { Identity } from "@model/identity/identity";
import { IdentityFeature } from "../identity-feature";

const INDEX_STORAGE_KEY = "identity_storage_index";

/**
 * File system storage sandboxed for this identity, in order to not mix data with other identities
 */
export class StorageFeature implements IdentityFeature {
  private index: string[] = null;

  constructor(private identity: Identity) { }

  private async lazyLoadIndex() {
    if (this.index)
      return;

    const rawIndex = await localStorage.getItem(INDEX_STORAGE_KEY) || null;
    this.index = rawIndex ? JSON.parse(rawIndex) : [];
    //console.log("Connectivity files index", this.index);
  }

  private async saveIndex(): Promise<void> {
    await localStorage.setItem(INDEX_STORAGE_KEY, JSON.stringify(this.index));
  }

  public async set(key: string, value: string): Promise<void> {
    await this.lazyLoadIndex();
    const fullKey = this.getFullKey(key);

    // Add key to index
    if (!this.index.includes(fullKey)) {
      this.index.push(fullKey);
      await this.saveIndex();
    }

    return localStorage.setItem(fullKey, value);
  }

  public async get(key: string, defaultValue: string | null): Promise<string> {
    await this.lazyLoadIndex();
    const fullKey = this.getFullKey(key);
    return localStorage.getItem(fullKey) || defaultValue;
  }

  public async unset(key: string): Promise<void> {
    const fullKey = this.getFullKey(key);

    return localStorage.removeItem(fullKey);
  }

  /**
   * Deletes all stored entries for a given context. If no context is given, all contexts are deleted.
   * This method can be used either internally when switching connectors, or by applications to restart fresh
   * by deleting the existing environment.
   */
  public async clean(): Promise<void> {
    await this.lazyLoadIndex();

    for (let fullKey of this.index) {
      await localStorage.removeItem(fullKey);
    }

    this.index = [];
    await this.saveIndex();
  }

  private getFullKey(key: string): string {
    return this.identity.did + "_" + key;
  }

  public setJSON(key: string, value: any): Promise<void> {
    return this.set(key, JSON.stringify(value));
  }

  public async getJSON(key: string, defaultValue: any | null): Promise<any> {
    return JSON.parse(await this.get(key, JSON.stringify(defaultValue)));
  }
}
