import { Identity } from "./identity";

export type IdentityClaimRequest = {
  id: string;
  identity: Identity;
  claimUrl: string;
}
