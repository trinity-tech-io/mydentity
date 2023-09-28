import { IdentityType } from "@model/identity/identity-type";

export type CreateIdentityInput = {
  name: string;
  hiveVaultProvider?: string;
  identityType: IdentityType;
  rootIdentityId?: string;
}