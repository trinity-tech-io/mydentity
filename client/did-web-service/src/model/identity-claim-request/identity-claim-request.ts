import { Identity } from "@model/identity/identity";
import { identityFromJson } from "@model/identity/identity-builder";
import { custodialIdentityProvider } from "@services/identity/identity.service";
import { IdentityClaimRequestDTO } from "./identity-claim-request.dto";

export class IdentityClaimRequest {
  id: string;
  identity: Identity;
  claimUrl: string;

  public static async fromJson(json: IdentityClaimRequestDTO): Promise<IdentityClaimRequest> {
    const claimRequest = new IdentityClaimRequest();
    Object.assign(claimRequest, json);

    claimRequest.identity = await identityFromJson(json.identity, custodialIdentityProvider);

    return claimRequest;
  }
}
