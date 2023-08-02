import { PublicClientConfiguration } from "./client-configuration";

class ConfigService {
  private config: PublicClientConfiguration;

  public init(config: PublicClientConfiguration) {
    this.config = config;
  }

  public get(key: keyof PublicClientConfiguration): string {
    return this.config[key];
  }
}

export const configService = new ConfigService();