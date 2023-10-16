import { logger } from "@services/logger";
import Queue from "promise-queue";

type CacheLoadMethod<T> = {
  /** Creates a new object instance, when not existing in cache yet */
  create: () => Promise<T>;
  /**
   * Fills given instance with loaded data. Used by JSON based objects, when receiving a JSON object
   * from the backend, to update an existing instance of the same JS object (so the rxjs subjects references, etc remain the same).
   * This method can not be filled and only create() used, for traditional caching.
   */
  update?: (instance: T) => Promise<void>;
}

/**
 * Cache that holds various object types such as User, etc, fetched
 * from the backend.
 * It's responsible to make sure we never duplicate instances of those objects, as duplicating them would
 * result in behavior subjects not triggering for example.
 *
 * Methods are asynchronous and semaphored to make sure we don't try to access several times the same object in parrallel.
 */
export class ObjectCache<T> {
  private cache: { [key: string]: T } = {};
  private loadQueue = new Queue(1);

  /**
   * Returns the cached value if any.
   * If nothing in cache and if loader is given, use the loader to load and cache.
   * If not loader given, return nothing;
   *
   * If useCache is true (default), any cached key will be returned as is.
   * If useCache is false, a totally new object instance i
   *
   * If reuseInstance is true (default):
   * - The same root object is kept (create() is not called) and update() is called to fill with latest content, is there is a loader.
   * If reuseInstance is false:
   * - Both create() and update() are called.
   */
  public async get(key: string, loader?: CacheLoadMethod<T>, reuseInstance = true): Promise<T> {
    if (reuseInstance && this.has(key))
      return this.cache[key];

    if (!reuseInstance && this.has(key) && key !== null) // Consider null key to be used to create new object, so don't show a warning
      logger.warn("cache", `Forcing to not reuse the existing instance for existing key ${key}. This will create a duplicate object, beware of non updating UI parts.`);

    if (!loader)
      return null;

    return this.loadQueue.add(async () => {
      if (!reuseInstance || !this.has(key)) {
        if (!loader)
          return null;

        // Object inexisting yet, create and fill
        const instance = await loader.create();

        await loader.update?.(instance);

        this.cache[key] = instance;

        return instance;
      }
      else {
        // Object instance exists and we reuse the instance. Fill and return.
        const instance = this.cache[key];
        await loader?.update?.(instance);

        return instance;
      }
    });
  }

  public has(key: string): boolean {
    return (key in this.cache);
  }
}