import type { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import type { ManagedIdentityStatus } from "..";
import { gqlQuery } from "../api";

export type CreatedManagedIdentity = {
  did: string;
  accessToken: string;
}

export async function createManagedIdentity(): Promise<CreatedManagedIdentity> {
  const response = await gqlQuery<CreatedManagedIdentity>("createManagedIdentity", `
    mutation CreateManagedIdentity($input: CreateManagedIdentityInput!) {
      createManagedIdentity (input: $input) {
        identityAccessToken did
      }
    }
  `, {
    input: {}
  });

  return response;
}

export async function getManagedIdentityStatus(identityAccessToken: string): Promise<ManagedIdentityStatus> {
  const response = await gqlQuery<ManagedIdentityStatus>("getManagedIdentityStatus", `
    query GetManagedIdentityStatus {
      getManagedIdentityStatus  {
        createdAt claimed claimedAt
      }
    }
  `, null, {
    ...(identityAccessToken && { "x-identity-access-token": identityAccessToken })
  });

  return response;
}

/**
 * Directly imports credentials to a managed and unclaimed identity into the DID Web service.
 */
export async function importManagedIdentityCredentials(identityAccessToken: string, credentials: VerifiableCredential): Promise<CreatedManagedIdentity> {
  const response = await gqlQuery<CreatedManagedIdentity>("importManagedIdentityCredentials", `
    mutation ImportManagedIdentityCredentials($input: ImportManagedIdentityCredentialsInput!) {
      importManagedIdentityCredentials (input: $input) {
        id
      }
    }
  `, {
    input: {
      credentials: credentials.toString()
    }
  }, {
    ...(identityAccessToken && { "x-identity-access-token": identityAccessToken })
  });

  return response;
}

export function generateClaimUrl(did: string) {

}
