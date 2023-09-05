import { configService } from "./config/config.service";
import { hiveInit } from "./hive/hive.service";
import { logger } from "./logger";

export function initSync(): void {
  logger.init(console);
  configService.init({
    frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  });
  hiveInit();
}