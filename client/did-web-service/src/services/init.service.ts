import { configService } from "./config/config.service";
import { graphQLService } from "./graphql.service";
import { logger } from "./logger";
import { userServiceInit } from "./user/user.service";
import { identityService } from "./identity/identity.service";

export const initApp = async () => {
  // Services initialization
  logger.init(console);
  configService.init({
    frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  });

  await identityService.init();
  await graphQLService.init();
  await userServiceInit();
}