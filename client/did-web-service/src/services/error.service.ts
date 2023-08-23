import { ApolloError, ServerError, ServerParseError } from "@apollo/client";
import { AppException } from "@model/exceptions/app-exception";
import { ClientError } from "@model/exceptions/exception-codes";
import { AxiosError } from "axios";
import { GraphQLError, GraphQLErrorExtensions } from "graphql";
import { Subject } from "rxjs";
import { logger } from "./logger";

// Note: keep this as subject not behaviour subject, to not show the latest message every time.
export const onNewError$ = new Subject<AppException>();
let mostRecentError: AppException = null;

function emitGlobalError(error: AppException) {
  mostRecentError = error;
  onNewError$.next(error);
}

export function getMostRecentAppException(): AppException {
  return mostRecentError;
}

function handleApolloClientError(error: Error): AppException {
  logger.error("apollo", "Client error", error);
  const appException = AppException.newClientError(ClientError.OtherApolloError, error.message);
  emitGlobalError(appException);
  return appException;
}

function handleApolloProtocolError(error: { message: string, extensions?: GraphQLErrorExtensions[] }) {
  logger.error("apollo", "Protocol error", error);
  const appException = AppException.newClientError(ClientError.OtherApolloError, error.message);
  emitGlobalError(appException);
  return appException;
}

function handleGraphQLError(error: GraphQLError) {
  const originalMethod = error.path;

  // Try to extract an AppException from the graphql error
  const originalError = error.originalError || error.extensions?.originalError;
  const appException = AppException.fromJson(originalError);
  if (appException) {
    // Graphql call failed because of a custom exception of our API
    logger.error("graphql", "Custom API exception when calling GraphQL method:", originalMethod, originalError);
    emitGlobalError(appException);
    return appException;
  }
  else {
    // Graphql failed because of pure graphql issuers (gql type errors...)
    logger.error("graphql", "GraphQL error when calling GraphQL method:", originalMethod, error);
    emitGlobalError(AppException.newClientError(ClientError.OtherApolloError, error.message));
    return null;
  }
}

function handleApolloNetworkError(e: Error | ServerParseError | ServerError) {
  if (e.name === "ServerError") {
    const serverError = <ServerError>e;
    if (typeof serverError.result === "object") {
      serverError.result.forEach(r => {
        r.errors?.forEach(re => {
          logger.error("graphql", "GraphQL server network error:", re.message);
        });
      })
    }
  }
  else {
    logger.error("graphql", "GraphQL network error:", e);
  }
}

function handleApolloError(e: ApolloError) {
  e.clientErrors.forEach(handleApolloClientError);
  e.graphQLErrors.forEach(handleGraphQLError);
  e.protocolErrors.forEach(handleApolloProtocolError);

  if (e.networkError)
    handleApolloNetworkError(e.networkError);
}

function handlAxiosError(e: AxiosError) {
  // API error - extract relevant info
  const customException = AppException.fromJson(e.response.data);
  if (customException) {
    logger.error("axios", "Axios app exception", customException);
    emitGlobalError(customException);
  }
  else {
    logger.error("Unhandled axios error:", e);
  }
}

/**
 * Method used to cleanly catch and convert AppExceptions received from our API.
 * - Sub-errors inside root errors (apollo) are handled and emited as global error for user feedback.
 * - Exception are all handled, not rethrown.
 * - If errorReturnValue is given, errorReturnValue is returned in case of error. Otherwise, null is returned.
 */
export async function withCaughtAppException<T>(call: () => Promise<T>, errorReturnValue?: T): Promise<T> {
  try {
    const response = await call();
    return response;
  }
  catch (e) {
    // There can be multiple apollo sub-errors inside one apollo error.
    // NOTE: we can receive GraphQL errors inside apollo errors (server side) or
    // directly as GraphQLError here (client side, such as syntax error)
    if (e instanceof ApolloError) {
      handleApolloError(e);
    }
    else if (e instanceof GraphQLError) {
      handleGraphQLError(e);
    }
    else if (e instanceof AxiosError) {
      handlAxiosError(e);
    }
    else {
      logger.error("Unhandled error:", e);
    }

    return errorReturnValue || null;
  }
}
