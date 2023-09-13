import { AppContext, DIDResolverAlreadySetupException, Logger } from '@elastosfoundation/hive-js-sdk';
import { availableHiveNodeProviders } from "@services/hive/vault/vault-providers";
import { logger } from '@services/logger';
import { isClientSide } from '@utils/client-server';
import Queue from "promise-queue";

export const hiveOperationQueue = new Queue(1); // Semaphore to prevent multiple parrallel access to critical operations
const nodeProviders = availableHiveNodeProviders.MainNet; // For now, only mainnet supported

/**
 * Hive initialization - client side only
 */
export function hiveInit(): void {
  if (!isClientSide())
    return;

  try {
    Logger.setDefaultLevel(Logger.WARNING);
    AppContext.setupResolver(process.env.NEXT_PUBLIC_RESOLVER_URL, '/anyfakedir/browserside/for/didstores');
  } catch (e) {
    if (e instanceof DIDResolverAlreadySetupException) {
      // silent error, it's ok
    } else {
      logger.error('hive', 'AppContext.setupResolver() exception:', e);
    }
  }
}

/**
 * Returns a random hive node address among the nodes that we can choose as default quick start
 * vault provider for new users.
 */
export function getRandomQuickStartHiveNodeAddress(): string {
  const randomIndex = Math.floor(Math.random() * nodeProviders.length);
  return nodeProviders[randomIndex];
}
