import { PromisifiedIndexedDB } from '@utils/indexeddb-promises';
import Queue from 'promise-queue';
import { BehaviorSubject } from 'rxjs';

type CacheMissCallback<DataType extends IDBValidKey, CustomDataType> = (key: string, customData?: CustomDataType) => Promise<DataType>;

/**
 * Indexed-DB based cache for content such as dynamically fetched hive pictures.
 *
 * This is used for example to store pictures fetched from hive vaults in
 * order to avoid fetching them every time.
 *
 * This is also used by identities to cache names and avatars to display them rapidly instead of
 * having to fetch all credentials every time for that.
 *
 * Indexed db is used instead of local storage so we have no disk space limitation.
 */
export class PermanentCache<DataType extends IDBValidKey, CustomDataType> {
  private db: PromisifiedIndexedDB;
  private queue = new Queue(1); // TODO: one queue per key to not block different picture urls sequencially

  private listeners: { [key: string]: BehaviorSubject<DataType> } = {};

  constructor(storeName: string, private cacheMissCallback?: CacheMissCallback<DataType, CustomDataType>) {
    this.db = new PromisifiedIndexedDB(storeName);
  }

  public async get(key: string, customData?: CustomDataType): Promise<DataType> {
    return this.queue.add(async () => {
      let cachedData = await this.db.get(key);

      if (!cachedData && this.cacheMissCallback) {
        cachedData = await this.cacheMissCallback(key, customData);
        if (cachedData)
          await this.db.put(key, cachedData);
      }

      return cachedData;
    });
  }

  /**
   * Some caches update their content from the cache miss callback, but some
   * others need to manually set the value from external sources.
   */
  public async put(key: string, value: DataType): Promise<void> {
    await this.db.put(key, value);
    this.getListener(key).next(value);
  }

  /**
   * Returns a subject that gets updated when an entry changes
   */
  public listen(key: string, customData?: CustomDataType): BehaviorSubject<DataType> {
    return this.getListener(key, customData);
  }

  private getListener(key: string, customData?: CustomDataType): BehaviorSubject<DataType> {
    if (!(key in this.listeners)) {
      this.listeners[key] = new BehaviorSubject(null);
      // After accessing a listener for the first time, fill it with the result of "get"
      // in case there is already some stored data
      this.get(key, customData).then(value => this.listeners[key].next(value));
    }
    return this.listeners[key];
  }
}