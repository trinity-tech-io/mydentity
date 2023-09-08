import { Credential } from "@prisma/client";

export type CredentialWithStringVC = Credential & {
  verifiableCredential: string;
}