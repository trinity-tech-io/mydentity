import { runtimeSettings } from "@services/settings.service";
import { ExceptionCode } from "./exceptions/exception-codes";
import { SDKException } from "./exceptions/sdk-exception";

type GraphqlResponse<ResponseType> = {
  data: ResponseType;
}

export async function gqlQuery<ResponseType extends object>(methodName: string, query: string, variables?: unknown, additionalHeaders?: Record<string, string>): Promise<ResponseType> {
  const endpoint = `${runtimeSettings.webServiceAPIEndpoint}/graphql`;

  const developerToken = runtimeSettings.accessKey;

  let jsonResponse: GraphqlResponse<ResponseType>;
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: new Headers({
        "content-type": "application/json",
        ...(developerToken && { "x-developer-key": developerToken }),
        ...(additionalHeaders && { ...additionalHeaders })
      }),
      body: JSON.stringify({ query, variables })
    });

    jsonResponse = <GraphqlResponse<ResponseType>>await result?.json();
  }
  catch (e) {
    if (e?.message === "Failed to fetch")
      throw SDKException.create(ExceptionCode.NetworkError, "Unable to reach the backend service");

    return null;
  }

  if (!jsonResponse)
    throw SDKException.create(ExceptionCode.EmptyResponse, `Empty response received from the backend during a call to ${methodName}`);

  if (typeof jsonResponse != "object")
    throw SDKException.create(ExceptionCode.InvalidResponse, `Not a json response received during a call to ${methodName}`);

  if ("errors" in jsonResponse)
    throw SDKException.create(ExceptionCode.ServerError, `Server errors during a call to ${methodName}`, jsonResponse.errors);

  if (!("data" in jsonResponse))
    throw SDKException.create(ExceptionCode.InvalidResponse, `No 'data' field in graphql response during a call to ${methodName}`);

  const data = jsonResponse.data;
  if (!(methodName in data))
    throw SDKException.create(ExceptionCode.InvalidResponse, `Expected graphql field '${methodName}' not found in response during a call to ${methodName}`);

  return jsonResponse.data[methodName];
}
