
export enum VaultStatus {
  NotChecked, // Not checked yet
  Subscribing, // Vault subscription is on going
  ReadyToUse, // DID is subscribed and fully ready on the vault address specified in his DID document
  UnknownError // Unknown error while fetching the vault status
}
