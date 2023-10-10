import { lazyElastosDIDSDKImport } from "@utils/import-helper";

const network = "mainnet";

let initialized = false;

/**
 * Lazy initialization for DID operations
 */
export async function lazyDIDInit(): Promise<void> {
  if (initialized)
    return;

  const { DIDBackend, DefaultDIDAdapter } = await lazyElastosDIDSDKImport();
  DIDBackend.initialize(new DefaultDIDAdapter(network));

  initialized = true;
}