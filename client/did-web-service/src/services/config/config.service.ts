import { PublicClientConfiguration } from "./client-configuration";

class ConfigService {
  private config: PublicClientConfiguration;

  public init(config: PublicClientConfiguration) {
    this.config = config;
  }

  public get(key: keyof PublicClientConfiguration): string {
    if (!this.config)
      throw new Error("The config service has not been initialized yet. Make sure to call configService.init() first");

    return this.config[key];
  }
}

export const configService = new ConfigService();