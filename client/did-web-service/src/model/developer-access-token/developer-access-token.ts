import { DeveloperAccessTokenDTO } from "./developer-access-token.dto";

export class DeveloperAccessToken {
  id: string;
  createdAt: Date;
  title?: string;

  public static async fromJson(json: DeveloperAccessTokenDTO): Promise<DeveloperAccessToken> {
    const accessToken: DeveloperAccessToken = Object.assign(new DeveloperAccessToken(), json);
    accessToken.createdAt = new Date(json.createdAt);
    return accessToken;
  }
}