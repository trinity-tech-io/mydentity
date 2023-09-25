import { runtimeSettings } from "@services/settings.service";
import { ExceptionCode } from "./exceptions/exception-codes";
import { SDKException } from "./exceptions/sdk-exception";

export async function gqlQuery<ResponseType>(name: string, query: string, variables?: unknown): Promise<ResponseType> {
  const endpoint = `${runtimeSettings.webServiceAPIEndpoint}/graphql`;

  let jsonResponse: ResponseType;
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: new Headers({
        "content-type": "application/json"
      }),
      body: JSON.stringify({ query, variables })
    });

    jsonResponse = <ResponseType>await result?.json();
  }
  catch (e) {
    if (e?.message === "Failed to fetch")
      throw SDKException.create(ExceptionCode.NetworkError, "Unable to reach the backend service");

    return null;
  }

  if (!jsonResponse)
    throw SDKException.create(ExceptionCode.EmptyResponse, `Empty response received from the backend during a call to ${name}`);

  if (typeof jsonResponse != "object")
    throw SDKException.create(ExceptionCode.InvalidResponse, `Not a json response received during a call to ${name}`);

  if ("errors" in jsonResponse)
    throw SDKException.create(ExceptionCode.ServerError, `Server errors during a call to ${name}`, jsonResponse.errors);

  return jsonResponse;
}
