import { DeveloperAccessTokenDTO } from "@model/developer-access-token/developer-access-token.dto";

export type CreatedAccessTokenDTO = {
  storedToken: DeveloperAccessTokenDTO;
  clearToken: string; // Cleartext tokenm only got once after creation
}