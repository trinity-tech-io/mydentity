import { Identity, User } from "@prisma/client/main";

/**
 * Object representing a decoded identity access token, including
 * the cleartext password to use to decrypt the managed identity data.
 */
export type IdentityAccessInfo = {
  identity: Identity & { user: User };
  password: string;
}