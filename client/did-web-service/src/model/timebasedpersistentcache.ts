import { JSONObject } from "./json";

export type CacheEntry<T> = {
  key: string;
  timeValue: number;
  data: T;
}

/**
 * Cache with the following features:
 * - Persistent on disk.
 * - Items sorted by an optional time value (ex: for transactions list).
 * - A max number of items is kept on disk.
 * - Adds or overwrites existing items by key.
 *
 * NOTE: This cache uses browser local storage, not ionic storage, to be faster, as we accept the data
 * can be lost and rebuilt at any time.
 */
export class TimeBasedPersistentCache<T extends JSONObject> {
  // List of items, sorted by time value.
  private items: CacheEntry<T>[];

  /**
   * Creates a new cache.
   *
   * @param name Name used to uniquely identify this cache on disk.
   * @param maxItemsOnDisk Maximum number of items that are saved to disk. Older items are deleted.
   */
  private constructor(public name: string, private maxItemsOnDisk: number, private storeGlobally: boolean) { }

  /**
   * Returns a cache with data already loaded from disk if any, or an empty cache otherwise.
   * If storeGlobally is true, data on disk is not sandbox for the active DID, it's shared by everyone.
   */
  public static async loadOrCreate<T extends JSONObject>(name: string, storeGlobally = false, maxItemsOnDisk = 100): Promise<TimeBasedPersistentCache<T>> {
    const cache = new TimeBasedPersistentCache<T>(name, maxItemsOnDisk, storeGlobally);
    await cache.load();
    return cache;
  }

  /**
   * Adds or updates an item to the cache. Item keys are unique.
   * If set() is called again with an existing key, the existing item is overwritten.
   */
  public set(itemKey: string, data: T, timeValue = 0): void {
    const existingIndex = this.items.findIndex(i => i.key == itemKey);

    const newEntry = {
      key: itemKey,
      timeValue,
      data
    };
    if (existingIndex === -1) {
      // Insert the new item
      this.items.push(newEntry);
    }
    else {
      this.items[existingIndex] = newEntry;
    }

    // Sort the cache by time value. TBD: inefficient: better to directly insert at the right index.
    this.items.sort((a, b) => {
      // timeValue == 0: the transaction is pending, waiting for confirm.
      if (a.timeValue === 0) {
        return -1;
      }

      if (b.timeValue === 0) {
        return 1;
      }

      if (a.timeValue > b.timeValue)
        return -1;
      else if (a.timeValue < b.timeValue)
        return 1;
      else
        return 0;
    });
  }

  /**
   * Remove an item from the cache.
   */
  public remove(itemKey: string): void {
    const existingIndex = this.items.findIndex(i => i.key == itemKey);
    if (existingIndex >= 0) {
      this.items.splice(existingIndex, 1)
    }
  }

  /**
   * Retrieves a cache item by key.
   */
  public get(itemKey: string): CacheEntry<T> | undefined {
    return this.items.find(i => i.key == itemKey);
  }

  /**
   * Returns the cache values. Values are already sorted by time value.
   */
  public values(): CacheEntry<T>[] {
    return this.items;
  }

  /**
   * Returns the current number of items in the loaded cache.
   */
  public size(): number {
    return this.items.length;
  }

  /**
   * Saves the whole cache to disk.
   */
  public async save(): Promise<void> {
    // Keep at most maxItemsOnDisk items.
    const itemsToSave = this.items.slice(0, Math.min(this.items.length, this.maxItemsOnDisk));

    const key = "cache" + this.name;
    localStorage.setItem(key, JSON.stringify(itemsToSave));
  }

  /**
   * Loads the cache from disk.
   */
  public async load(): Promise<void> {
    const key = "cache" + this.name;
    const values = localStorage.getItem(key)
    if (values)
      this.items = JSON.parse(values);
  }

  /**
   * Delete cache.
   */
  public async delete(): Promise<void> {
    const key = "cache" + this.name;
    localStorage.removeItem(key)
  }
}
