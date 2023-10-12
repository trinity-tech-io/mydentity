import { IdentityDTO } from "@model/identity/identity.dto";

export class IdentityRootDTO {
  id: string;
  didStoreRootIdentityId: string;
  userId: string;
  createdAt: string;
  Identity?: IdentityDTO[];
}
