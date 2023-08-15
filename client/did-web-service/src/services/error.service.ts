import { ApolloError } from "@apollo/client";
import { AppException } from "@model/exceptions/app-exception";
import { ClientError } from "@model/exceptions/exception-codes";
import { AxiosError } from "axios";
import { GraphQLError, GraphQLErrorExtensions } from "graphql";
import { Subject } from "rxjs";
import { logger } from "./logger";

export const onNewError$ = new Subject<AppException>(); // For now, just a string - We can improve this by passing CustomException objects instead, with custom UI feedback

function emitGlobalError(error: AppException) {
  onNewError$.next(error);
}

function handleApolloClientError(error: Error) {
  logger.error("apollo", "Client error", error);
  emitGlobalError(AppException.newClientError(ClientError.OtherApolloError, error.message));
}

function handleApolloProtocolError(error: { message: string, extensions?: GraphQLErrorExtensions[] }) {
  logger.error("apollo", "Protocol error", error);
  emitGlobalError(AppException.newClientError(ClientError.OtherApolloError, error.message));
}

function handleApolloGraphQLError(error: GraphQLError) {
  const originalMethod = error.path;

  // Try to extract an AppException from the graphql error
  const originalError = error.originalError || error.extensions?.originalError;
  const appException = AppException.fromJson(originalError);
  if (appException) {
    // Graphql call failed because of a custom exception of our API
    logger.error("apollo", "Custom API exception when calling GraphQL method:", originalMethod, originalError);
    emitGlobalError(appException);
  }
  else {
    // Graphql failed because of pure graphql issuers (gql type errors...)
    logger.error("apollo", "GraphQL error when calling GraphQL method:", originalMethod);
    emitGlobalError(AppException.newClientError(ClientError.OtherApolloError, error.message));
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
    // There can be multiple apollo sub-errors inside one apollo error
    if (e instanceof ApolloError) {
      e.clientErrors.forEach(handleApolloClientError);
      e.graphQLErrors.forEach(handleApolloGraphQLError);
      e.protocolErrors.forEach(handleApolloProtocolError);
    }
    else if (e instanceof AxiosError) {
      // API error - extract relevant info
      const customException = AppException.fromJson(e.response.data);
      if (customException) {
        emitGlobalError(customException);
      }
    }

    return errorReturnValue || null;
  }
}
