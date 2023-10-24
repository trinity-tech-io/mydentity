import { IdentityType } from "@model/identity/identity-type";

export type ImportIdentityInput = {
  identityType: IdentityType;
  mnemonic: string;
}