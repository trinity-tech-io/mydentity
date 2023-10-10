/**
 * Information about an identity that can be claimed by a user.
 * This object contains only non sensitive data as the real identity content is 
 */
export type ClaimableIdentityDTO = {
  did: string;
  createdAt: string;
  credentialsCount: number; // Number of VCs currently issued to this identity (and that we store in our service)
  creatingAppDid: string; // DID of the app that created this managed identity
}