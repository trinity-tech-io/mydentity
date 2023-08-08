import { gql } from "@apollo/client";
import { gqlIntentFields } from "@graphql/intent.fields";
import { Intent } from "@model/intent/intent";
import { IntentDTO } from "@model/intent/intent.dto";
import { getApolloClient } from "./graphql.service";
import { logger } from "./logger";

/**
 * Try to retrieve an intent from the backend, from its ID.
 * This normally happens when we are on an intent screen.
 * The intent must first have been created using a API call, from the DID web connector.
 */
export const fetchIntent = async (intentId: string): Promise<Intent> => {
  const { data } = await getApolloClient().query<{ intent: IntentDTO }>({
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

  if (data && data.intent) {
    const intent = await Intent.fromJson(data.intent);
    logger.log("intents", "Fetched intent:", intent);
    return intent;
  }
  else {
    logger.warn("intents", `No intent found for id ${intentId}`);
  }

  return null;
}