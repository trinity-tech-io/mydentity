
/**
 * Promisified IndexedDB wrapper class
 */
export class PromisifiedIndexedDB {
  private db: Promise<IDBDatabase>;

  constructor(databaseName: string, private storeName: string, upgradeCallback: (db: IDBDatabase) => void) {
    this.db = new Promise((resolve, reject) => {
      const request = indexedDB.open(databaseName);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = () => upgradeCallback(request.result);
    });
  }

  private getObjectStore(mode: IDBTransactionMode): Promise<IDBObjectStore> {
    return this.db.then((db) => {
      const transaction = db.transaction(this.storeName, mode);
      return transaction.objectStore(this.storeName);
    });
  }

  public get(key: string): Promise<any> {
    return this.getObjectStore('readonly').then((store) => {
      return new Promise((resolve, reject) => {
        const request = store.get(key);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    });
  }

  public put(key: string, value: any): Promise<void> {
    return this.getObjectStore('readwrite').then((store) => {
      return new Promise((resolve, reject) => {
        const request = store.put(value, key);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      });
    });
  }
}
