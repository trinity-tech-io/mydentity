import { runtimeOptions } from "../config/runtime-options";
import { IntentEntity } from "./intent";
import { IntentType } from "./intent-type";

type CreateIntentResponse = {
  data: {
    createIntent: {
      intentId: string
    }
  }
}

type FetchIntentResultResponse = {
  data: {
    serveIntentResponse: IntentEntity;
  }
}

/**
 * Calls the Mydentity API to create an intent request, and returns the intent ID.
 */
export async function createIntentRequest(type: IntentType, requestPayload: any): Promise<string> {
  const endpoint = `${runtimeOptions.webServiceAPIEndpoint}/graphql`;
  const redirectUrl = window.location.toString();

  const gqlQuery = `mutation CreateIntent($input: CreateIntentInput!) {
    createIntent (input: $input) {
      intentId
    }
  }`;

  const result = await fetch(endpoint, {
    method: 'POST',
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify({
      query: gqlQuery,
      variables: {
        input: {
          type,
          redirectUrl, // We will to the page that initiated this request
          payload: requestPayload
        }
      }
    })
  })

  const json: CreateIntentResponse = await result?.json();
  const intentId = json.data.createIntent.intentId || null;
  console.log("intentId", intentId)

  return intentId;
}

export function createFrontEndIntentEndpoint(intentType: IntentType, intentId: string) {
  let path: string;
  switch (intentType) {
    case IntentType.REQUEST_CREDENTIALS: path = 'intent/request-credentials'; break;
    case IntentType.IMPORT_CREDENTIALS: path = 'intent/import-credentials'; break;
    default:
      throw new Error(`Unable to build front end intent endpoint for unknown intent type ${intentType}`);
  }

  return `${runtimeOptions.webServiceEndpoint}/${path}?rid=${intentId}`;
}

export async function fetchIntentResponse<T>(intentId: string): Promise<IntentEntity> {
  const endpoint = `${runtimeOptions.webServiceAPIEndpoint}/graphql`;

  const gqlQuery = `mutation ServerIntentResponse {
    serveIntentResponse (id: "${intentId}") {
      id type fulfilledAt requestPayload responsePayload
    }
  }`;

  const result = await fetch(endpoint, {
    method: 'POST',
    headers: new Headers({
      "content-type": "application/json"
    }),
    body: JSON.stringify({
      query: gqlQuery
    })
  })

  const json: FetchIntentResultResponse = await result?.json();
  return json?.data?.serveIntentResponse;
}