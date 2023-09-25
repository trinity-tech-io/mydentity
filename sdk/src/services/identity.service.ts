import { gqlQuery } from "../api";

type CreateIdentityAPIResponse = {
  did: string;
  accessToken: string;
}

export async function createIdentity() {
  const response = await gqlQuery<CreateIdentityAPIResponse>("createIdentity", `
    mutation CreateOrphanIdentity($input: CreateIntentInput!) {
      createIntent (input: $input) {
        intentId
      }
    }
  `);

  console.log("response", response)
}

export function getIdentityClaimStatus() {

}

export function generateClaimUrl() {

}
