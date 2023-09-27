import { IdentityType } from "@model/identity/identity-type";

export type AddServiceInput = {
  identityDid: string
  serviceId: string;
  type: string;
  endpoint?: string;
  properties: IdentityType;
}