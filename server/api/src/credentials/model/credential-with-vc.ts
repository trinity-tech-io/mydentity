import { Credential } from "@prisma/client/main";

export type CredentialWithStringVC = Credential & {
  verifiableCredential: string;
}