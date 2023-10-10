import { ClaimableIdentityDTO } from "./claimable-identity.dto";

export type IdentityClaimRequestDTO = {
  id: string;
  identityInfo: ClaimableIdentityDTO;
  claimUrl: string;
  expiresAt: string;
  claimCompletedAt: string;
}
