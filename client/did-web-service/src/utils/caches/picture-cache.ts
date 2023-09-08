import { PromisifiedIndexedDB } from '@utils/indexeddb-promises';
import Queue from 'promise-queue';

type CacheMissCallback<DataType extends IDBValidKey, CustomDataType> = (key: string, customData?: CustomDataType) => Promise<DataType>;

const DATABASE_NAME = "picture-cache";

/**
 * Indexed-DB based cache for dynamically fetched pictures.
 * This is used for example to store pictures fetched from hive vaults in
 * order to avoid fetching them every time.
 *
 * Indexed db is used instead of local storage so we have no disk space limitation.
 *
 * It is recommended to use "string" (as data url) as DataType.
 */
export class PictureCache<DataType extends IDBValidKey, CustomDataType> {
  private db: PromisifiedIndexedDB;
  private queue = new Queue(1); // TODO: one queue per key to not block different picture urls sequencially

  constructor(storeName: string, private cacheMissCallback: CacheMissCallback<DataType, CustomDataType>) {
    this.db = new PromisifiedIndexedDB(DATABASE_NAME, storeName, (db) => {
      if (!db.objectStoreNames.contains(storeName))
        db.createObjectStore(storeName);
    });
  }

  public async get(key: string, customData?: CustomDataType): Promise<DataType> {
    return this.queue.add(async () => {
      let cachedData = await this.db.get(key);

      if (!cachedData) {
        cachedData = await this.cacheMissCallback(key, customData);
        if (cachedData)
          await this.db.put(key, cachedData);
      }

      return cachedData;
    });
  }
}