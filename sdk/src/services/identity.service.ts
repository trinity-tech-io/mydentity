import type { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import type { CreatedManagedIdentity, ManagedIdentityStatus } from "..";

import { gqlQuery } from "../api";

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

/**
 * Generates a claim request for a managed identity.
 * This claim request is short lived, the user must complete the the request on the DID Web app
 * within a few minutes, after what a new claim request must be requested.
 *
 * The returned claimUrl should be shared with the user.
 */
export async function generateClaimUrl(identityAccessToken: string) {
  const response = await gqlQuery<CreatedManagedIdentity>("createIdentityClaimRequest", `
    mutation CreateIdentityClaimRequest {
      createIdentityClaimRequest {
        id identity { did createdAt } claimUrl
      }
    }
  `, null, {
    ...(identityAccessToken && { "x-identity-access-token": identityAccessToken })
  });

  return response;
}
