import { configService } from "./config/config.service";
import { logger } from "./logger";

export const initApp = async () => {
  // Services initialization
  logger.init(console);
  configService.init({});
}