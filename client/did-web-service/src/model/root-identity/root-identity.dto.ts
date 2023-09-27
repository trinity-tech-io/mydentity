import { IdentityDTO } from "@model/identity/identity.dto";

export class RootIdentityDTO {
  id: string;
  didStoreRootIdentityId: string;
  userId: string;
  createdAt: string;
  Identity?: IdentityDTO[];
}
