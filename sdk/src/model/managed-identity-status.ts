export type ManagedIdentityStatus = {
  createdAt: string; // ISO date at which the managed identity was created
  claimed: boolean; // Whether the identity has bene claimed by the user or not
  claimedAt?: string; // ISO date at which the identity was claimed, if claimed
}