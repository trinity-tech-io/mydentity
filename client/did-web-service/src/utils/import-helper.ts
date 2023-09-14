/**
 * This helper allows to easily do a dynamic import of one of the most used (and largest...)
 * dependency libraries.
 * If the library was already imported, the cached version is returned.
 *
 * NOTE: we cannot make a generic method with a "module" string name because webpack would not
 * be able to track the dependency modules.
 */
import type { DID, DIDBackend, DIDStore, DIDURL, DefaultDIDAdapter, JWTHeader, JWTParserBuilder, Mnemonic, RootIdentity, VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import type { DID as ConnDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import type { AlreadyExistsException, AppContext, DIDResolverAlreadySetupException, FileDownloadExecutable, FindOptions, InsertOptions, Logger, ScriptingService, ServiceEndpoint, UpdateOptions, Vault, VaultNotFoundException, VaultSubscription } from "@elastosfoundation/hive-js-sdk";

const importsCache: { [moduleName: string]: any } = {};

export const lazyElastosDIDSDKImport = async (): Promise<{
  JWTParserBuilder: typeof JWTParserBuilder,
  VerifiablePresentation: typeof VerifiablePresentation,
  VerifiableCredential: typeof VerifiableCredential,
  DID: typeof DID,
  DIDURL: typeof DIDURL,
  DIDStore: typeof DIDStore,
  Mnemonic: typeof Mnemonic,
  RootIdentity: typeof RootIdentity,
  JWTHeader: typeof JWTHeader,
  DIDBackend: typeof DIDBackend,
  DefaultDIDAdapter: typeof DefaultDIDAdapter
}> => {
  if (!importsCache["@elastosfoundation/did-js-sdk"])
    importsCache["@elastosfoundation/did-js-sdk"] = await import("@elastosfoundation/did-js-sdk");

  return importsCache["@elastosfoundation/did-js-sdk"];
}

export const lazyElastosHiveSDKImport = async (): Promise<{
  AppContext: typeof AppContext,
  ScriptingService: typeof ScriptingService,
  ServiceEndpoint: typeof ServiceEndpoint,
  VaultSubscription: typeof VaultSubscription,
  Vault: typeof Vault,
  FindOptions: typeof FindOptions,
  UpdateOptions: typeof UpdateOptions,
  InsertOptions: typeof InsertOptions,
  AlreadyExistsException: typeof AlreadyExistsException,
  DIDResolverAlreadySetupException: typeof DIDResolverAlreadySetupException,
  VaultNotFoundException: typeof VaultNotFoundException,
  Logger: typeof Logger,
  FileDownloadExecutable: typeof FileDownloadExecutable
}> => {
  if (!importsCache["@elastosfoundation/hive-js-sdk"])
    importsCache["@elastosfoundation/hive-js-sdk"] = await import("@elastosfoundation/hive-js-sdk");

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
