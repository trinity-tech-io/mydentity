import { ClaimableIdentityDTO } from "./claimable-identity.dto";

export class ClaimableIdentity {
  did: string;
  createdAt: Date;
  credentialsCount: number;
  creatingAppDid: string;

  public static async fromJson(json: ClaimableIdentityDTO): Promise<ClaimableIdentity> {
    const claimRequest = new ClaimableIdentity();
    Object.assign(claimRequest, json);

    claimRequest.createdAt = new Date(json.createdAt);

    return claimRequest;
  }
}
