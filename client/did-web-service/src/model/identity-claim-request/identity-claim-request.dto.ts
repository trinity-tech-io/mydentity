import { IdentityDTO } from "@model/identity/identity.dto";

export type IdentityClaimRequestDTO = {
  id: string;
  identity: IdentityDTO;
  claimUrl: string;
}
