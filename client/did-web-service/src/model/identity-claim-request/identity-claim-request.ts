import { ClaimableIdentity } from "./claimable-identity";
import { IdentityClaimRequestDTO } from "./identity-claim-request.dto";

export class IdentityClaimRequest {
  id: string;
  identityInfo: ClaimableIdentity;
  claimUrl: string;
  expiresAt: Date;
  claimCompletedAt: Date;

  public static async fromJson(json: IdentityClaimRequestDTO): Promise<IdentityClaimRequest> {
    const claimRequest = new IdentityClaimRequest();
    Object.assign(claimRequest, json);

    claimRequest.identityInfo = await ClaimableIdentity.fromJson(json.identityInfo);

    if (json.expiresAt)
      claimRequest.expiresAt = new Date(json.expiresAt);

    if (json.claimCompletedAt)
      claimRequest.claimCompletedAt = new Date(json.claimCompletedAt);

    return claimRequest;
  }
}
