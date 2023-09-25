import { gqlQuery } from "../api";

export type CreatedManagedIdentity = {
  did: string;
  accessToken: string;
}

export async function createManagedIdentity(): Promise<CreatedManagedIdentity> {
  // TEMP dev
  return {
    did: "did:elastos:fakehardcoded",
    accessToken: "abc"
  }

  const response = await gqlQuery<CreatedManagedIdentity>("createManagedIdentity", `
    mutation CreateManagedIdentity($input: CreateManagedIdentityInput!) {
      createManagedIdentity (input: $input) {
        accessToken did
      }
    }
  `, {
    input: {}
  });

  return response;
}

export function getIdentityClaimStatus() {

}

export function generateClaimUrl() {

}
