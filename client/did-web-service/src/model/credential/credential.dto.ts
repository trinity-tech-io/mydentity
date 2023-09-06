export type CredentialDTO = {
  id: string;
  createdAt: string; // ISO date
  verifiableCredential: string; // Real VC as JSON
}

export type IssueCredentialDTO = {
  verifiableCredential: string; // Real VC as JSON
}