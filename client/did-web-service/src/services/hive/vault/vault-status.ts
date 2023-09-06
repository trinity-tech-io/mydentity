
export enum VaultStatus {
  NotChecked, // Not checked yet
  Subscribing, // Vault subscription is on going
  ReadyToUse, // DID is subscribed and fully ready on the vault address specified in his DID document
  UnknownError // Unknown error while fetching the vault status
}

/* export type VaultStatus = {
  checkState: VaultStatusState;
  // There is already info on chain about a vault provider attached to this user.
  publishedInfo?: {
    vaultAddress: string;
    vaultVersion: string;
  };
  vaultInfo?: SubscriptionInfo; // Current user's subscription info (used storage, etc) - retrieved by the subscription service
  vaultServices?: Vault; // Current user's vault services instance, if any
} */