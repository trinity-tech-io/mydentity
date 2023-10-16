/**
 * Generic service used by identity and user objects in order to sandbow persistent data
 * into browser's local storage.
 */

const INDEX_STORAGE_KEY = "storage_index";

type Index = string[];

class StorageService {
  private indexes: { [objectContext: string]: Index } = {};

  /**
   * Stores a value into storage. The key/value pair is sandboxed for the given objectContext.
   *
   * @param objectContext unique prefix to isolate the stored data. ie: the identity unique id, the user unique id, etc.
   */
  public async set(objectContext: string, key: string, value: string): Promise<void> {
    const index = await this.lazyLoadIndex(objectContext);
    const fullKey = this.getFullKey(objectContext, key);

    // Add key to index
    if (index.includes(fullKey)) {
      index.push(fullKey);
      await this.saveIndex(objectContext);
    }

    return localStorage.setItem(fullKey, value);
  }

  public async get(objectContext: string, key: string, defaultValue: string | null): Promise<string> {
    await this.lazyLoadIndex(objectContext);
    const fullKey = this.getFullKey(objectContext, key);
    return localStorage.getItem(fullKey) || defaultValue;
  }

  public async unset(objectContext: string, key: string): Promise<void> {
    const fullKey = this.getFullKey(objectContext, key);
    return localStorage.removeItem(fullKey);
  }

  /**
   * Deletes all stored entries for a given context.
   */
  public async clean(objectContext: string): Promise<void> {
    await this.lazyLoadIndex(objectContext);

    for (const fullKey of this.indexes[objectContext]) {
      await localStorage.removeItem(fullKey);
    }

    delete this.indexes[objectContext];
    await this.saveIndex(objectContext);
  }

  private getFullIndexKey(objectContext: string): string {
    return objectContext + "_" + INDEX_STORAGE_KEY;
  }

  private async lazyLoadIndex(objectContext: string): Promise<Index> {
    if (objectContext in this.indexes)
      return this.indexes[objectContext];

    const rawIndex = await localStorage.getItem(this.getFullIndexKey(objectContext)) || null;
    this.indexes[objectContext] = rawIndex ? JSON.parse(rawIndex) : [];
    return this.indexes[objectContext];
  }

  private async saveIndex(objectContext: string): Promise<void> {
    await localStorage.setItem(this.getFullIndexKey(objectContext), JSON.stringify(this.indexes[objectContext]));
  }

  private getFullKey(objectContext: string, key: string): string {
    return objectContext + "_" + key;
  }

  public setJSON(objectContext: string, key: string, value: any): Promise<void> {
    return this.set(objectContext, key, JSON.stringify(value));
  }

  public async getJSON(objectContext: string, key: string, defaultValue: any | null): Promise<any> {
    return JSON.parse(await this.get(objectContext, key, JSON.stringify(defaultValue)));
  }
}

export const storageService = new StorageService();