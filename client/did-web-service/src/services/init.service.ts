import { connectivity, logger as connectivityLogger } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { configService } from "./config/config.service";
import { InternalElastosConnector } from "./elastos-connector/internal-elastos-connector";
import { hiveInit } from "./hive/hive.service";
import { DIDWebConnectivityLogger, logger } from "./logger";

export function initSync(): void {
  logger.init(console);
  configService.init({
    frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  });

  connectorInit(); // NOTE: Async and we can't wait for it here as the root init must be synchronous. TODO: try to improve this in case some early code need this.
  hiveInit();
}

async function connectorInit(): Promise<void> {
  // Use our own internal connector for the connectivity SDK
  const internalConnector = new InternalElastosConnector();

  connectivityLogger.setLoggerLayer(new DIDWebConnectivityLogger());

  if (connectivity.getAvailableConnectors().length > 0)
    await connectivity.unregisterConnector(internalConnector.name); // For nextjs hot reload, to avoid duplicate regitration

  await connectivity.registerConnector(internalConnector);
  await connectivity.setActiveConnector(internalConnector.name);

  // Register our App DID to the connectivity SDK - For hive authentication flows.
  connectivity.setApplicationDID(process.env.NEXT_PUBLIC_APP_DID);
}