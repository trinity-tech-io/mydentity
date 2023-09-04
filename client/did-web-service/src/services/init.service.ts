import { configService } from "./config/config.service";
import { graphQLService } from "./graphql.service";
import { logger } from "./logger";

// Services initialization
export const initApp = async (): Promise<void> => {
  logger.init(console);

  configService.init({
    frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  });

  await graphQLService.init();
}