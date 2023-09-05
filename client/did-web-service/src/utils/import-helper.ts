/**
 * This helper allows to easily do a dynamic import of one of the most used (and largest...)
 * dependency libraries.
 * If the library was already imported, the cached version is returned.
 *
 * NOTE: we cannot make a generic method with a "module" string name because webpack would not
 * be able to track the dependency modules.
 */
import type { DID as ConnDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import type { AlreadyExistsException, AppContext, DIDResolverAlreadySetupException, FindOptions, InsertOptions, Logger, ServiceEndpoint, UpdateOptions, Vault, VaultSubscription } from "@elastosfoundation/hive-js-sdk";

const importsCache: { [moduleName: string]: any } = {};

export const lazyElastosHiveSDKImport = async (): Promise<{
  AppContext: typeof AppContext,
  ServiceEndpoint: typeof ServiceEndpoint,
  VaultSubscription: typeof VaultSubscription,
  Vault: typeof Vault,
  FindOptions: typeof FindOptions,
  UpdateOptions: typeof UpdateOptions,
  InsertOptions: typeof InsertOptions,
  AlreadyExistsException: typeof AlreadyExistsException,
  DIDResolverAlreadySetupException: typeof DIDResolverAlreadySetupException,
  Logger: typeof Logger
}> => {
  if (!importsCache["@elastosfoundation/hive-js-sdk"])
    importsCache["@elastosfoundation/hive-js-sdk"] = await import("@elastosfoundation/hive-js-sdk");

  /* const cache = importsCache["@elastosfoundation/hive-js-sdk"];
  return {
    AppContext: cache.AppContext,
    ServiceEndpoint: cache.ServiceEndpoint,
    VaultSubscription: cache.VaultSubscription,
    Vault: cache.Vault,
    FindOptions: cache.FindOptions,
    UpdateOptions: cache.UpdateOptions,
    InsertOptions: cache.InsertOptions,
    AlreadyExistsException: cache.AlreadyExistsException,
    DIDResolverAlreadySetupException: cache.DIDResolverAlreadySetupException,
    Logger: cache.Logger
  }; */
  return importsCache["@elastosfoundation/hive-js-sdk"];
}

/**
 * The connectivity SDK must be imported lazily, not at root, because it uses "window" during import and
 * this creates SSR errors for nextjs.
 */
export const lazyElastosConnectivitySDKImport = async (): Promise<{
  DID: typeof ConnDID;
}> => {
  if (!importsCache["@elastosfoundation/elastos-connectivity-sdk-js"])
    importsCache["@elastosfoundation/elastos-connectivity-sdk-js"] = await import("@elastosfoundation/elastos-connectivity-sdk-js");

  return importsCache["@elastosfoundation/elastos-connectivity-sdk-js"];
}
