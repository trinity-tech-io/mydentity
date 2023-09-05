import { SubscriptionInfo, Vault } from "@elastosfoundation/hive-js-sdk";

export enum VaultStatusState {
  NOT_CHECKED, // Not checked yet
  SUCCESSFULLY_RETRIEVED, // Vault status was fetched without error
  NETWORK_ERROR, // Network error while fetching the vault status
  UNKNOWN_ERROR // Unknown error while fetching the vault status
}

export type VaultStatus = {
  checkState: VaultStatusState;
  // There is already info on chain about a vault provider attached to this user.
  publishedInfo?: {
    vaultName: string;
    vaultAddress: string;
    vaultVersion: string;
  };
  vaultInfo?: SubscriptionInfo; // Current user's subscription info (used storage, etc) - retrieved by the subscription service
  vaultServices?: Vault; // Current user's vault services instance, if any
}