import { gql } from "@apollo/client";
import { gqlIntentFields } from "@graphql/intent.fields";
import { Intent } from "@model/intent/intent";
import { IntentDTO } from "@model/intent/intent.dto";
import { withCaughtAppException } from "./error.service";
import { getApolloClient } from "./graphql.service";
import { logger } from "./logger";

/**
 * Try to retrieve an intent from the backend, from its ID.
 * This normally happens when we are on an intent screen.
 * The intent must first have been created using a API call, from the DID web connector.
 */
export async function fetchIntent<IntentRequestPayloadType>(intentId: string): Promise<Intent<IntentRequestPayloadType>> {
  const { data } = await withCaughtAppException(() => {
    return getApolloClient().query<{ intent: IntentDTO }>({
      query: gql`
      query GetIntentRequest($intentId: String!) {
        intent (id: $intentId) {
          ${gqlIntentFields}
        }
      }
    `,
      variables: {
        intentId
      }
    });
  });

  if (data && data.intent) {
    const intent = await Intent.fromJson<IntentRequestPayloadType>(data.intent);
    logger.log("intents", "Fetched intent:", intent);
    return intent;
  }
  else {
    logger.warn("intents", `No intent found for id ${intentId}`);
  }

  return null;
}

/**
 * Gives a user response for a requested intent. The response is temporarily saved in the backend
 * until the web connector grabs it, or if it expires.
 */
export async function fulfilIntentRequest(intentId: string, responsePayload: any): Promise<boolean> {
  const { data } = await withCaughtAppException(() => {
    return getApolloClient().mutate<{ intent: IntentDTO }>({
      mutation: gql`
      mutation FulfilIntentRequest($input: FulfilIntentInput!) {
        fulfilIntent (input: $input)
      }
    `,
      variables: {
        input: { intentId, payload: responsePayload }
      }
    });
  });

  if (data && data.intent) {
    logger.log("intents", `Successfully fulfilled intent id ${intentId}`);
    return true;
  }
  else {
    logger.warn("intents", `Failed to fulfil intent id ${intentId}`);
    return false;
  }
}