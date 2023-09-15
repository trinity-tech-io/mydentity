import { lazyElastosDIDSDKImport } from "@utils/import-helper";

const network = "mainnet";

/**
 * Lazy initialization for DID operations
 */
export async function lazyDIDInit(): Promise<void> {
  const { DIDBackend, DefaultDIDAdapter } = await lazyElastosDIDSDKImport();
  DIDBackend.initialize(new DefaultDIDAdapter(network));
}