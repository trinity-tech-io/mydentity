import { Interfaces, logger } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { fetchIntentResponse } from "./intents/api";
import { IntentEntity } from "./intents/intent";
import { IntentType } from "./intents/intent-type";

export type ResponseProcessor = (intent: IntentEntity) => Promise<any>;

const processors: {
  // Map of IntentType : ResponseProcessor
  [intentType: string]: ResponseProcessor;
} = {};

/**
 * Returns the value of the "rid" query parameter from the url, if any.
 */
function getRidFromUrl(): string | null {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return params.get("rid");
}

export async function tryToGrabPostRedirectResponse() {
  const intentId = getRidFromUrl();
  if (intentId) {
    console.log("The DID web connector found an intent ID in the url - now processing the result");

    const intent = await fetchIntentResponse(intentId);
    console.log("response intent", intent);

    if (!intent) {
      logger.warn("The DID web service has no info about the intent we've tried to process from the url. Skipping");
      return;
    }

    processIntentResponse(intent);
  }
}

export function registerIntentResponseProcessor(intentType: IntentType, processor: ResponseProcessor) {
  processors[intentType] = processor;
}

/**
 * Receive a raw response from the API, and call the matching response processor to let it handle/convert
 * the response payload into the data format expected by the connectivity SDK.
 */
async function processIntentResponse(intent: IntentEntity) {
  const processedResponse = await processors[intent.type]?.(intent);
  responseHandler?.(intent.requestPayload.requestId, processedResponse);
}

let responseHandler: Interfaces.Connectors.ConnectorResponseHandler = null;
export const setResponseHandler = (handler: Interfaces.Connectors.ConnectorResponseHandler) => {
  responseHandler = handler;
}