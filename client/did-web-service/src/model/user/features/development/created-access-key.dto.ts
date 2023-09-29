import { DeveloperAccessKeyDTO } from "@model/developer-access-key/developer-access-key.dto";

export type CreatedAccessKeyDTO = {
  storedKey: DeveloperAccessKeyDTO;
  clearKey: string; // Cleartext key, only got once after creation
}