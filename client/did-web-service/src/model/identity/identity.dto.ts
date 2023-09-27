import { IdentityType } from "./identity-type";

export type IdentityDTO = {
  did: string;
  createdAt: string; // ISO date
  lastUsedAt: string; // ISO date
  type: IdentityType;
}