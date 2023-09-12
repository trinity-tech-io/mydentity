import { ApolloError, ServerError, ServerParseError } from "@apollo/client";
import { AppException } from "@model/exceptions/app-exception";
import { ClientError } from "@model/exceptions/exception-codes";
import { ExistingEmailException } from "@model/exceptions/existing-email-exception";
import { InexistingEmailException } from "@model/exceptions/inexisting-email-exception";
import { isEmailAlreadyExistsException, isEmailNotExistsException } from "@model/user/features/email/user-email.feature";
import { AxiosError } from "axios";
import { GraphQLError, GraphQLErrorExtensions } from "graphql";
import { Subject } from "rxjs";
import { logger } from "./logger";
import { isUnlockException } from "./security/security.service";

// Note: keep this as subject not behaviour subject, to not show the latest message every time.
export const onNewError$ = new Subject<AppException>();
let mostRecentError: AppException = null;

function emitGlobalError(error: AppException): void {
  mostRecentError = error;
  onNewError$.next(error);
}

export function getMostRecentAppException(): AppException {
  return mostRecentError;
}

function handleApolloClientError(error: Error): AppException {
  logger.error("apollo", "Client error", error);
  return AppException.newClientError(ClientError.OtherApolloError, error.message);
}

function handleApolloProtocolError(error: { message: string, extensions?: GraphQLErrorExtensions[] }): AppException {
  logger.error("apollo", "Protocol error", error);
  return AppException.newClientError(ClientError.OtherApolloError, error.message);
}

function handleGraphQLError(error: GraphQLError): AppException {
  const originalMethod = error.path;

  // Try to extract an AppException from the graphql error
  const originalError = error.originalError || error.extensions?.originalError;
  const appException = AppException.fromJson(originalError);
  if (appException) {
    // Graphql call failed because of a custom exception of our API
    if (isUnlockException(appException))
      logger.warn("graphql", "Master key needs to be unlocked");
    else
      logger.error("graphql", "Custom API exception when calling GraphQL method:", originalMethod, originalError);
    return appException;
  }
  else {
    // Graphql failed because of pure graphql issuers (gql type errors...)
    logger.error("graphql", "GraphQL error when calling GraphQL method:", originalMethod, error);
    return AppException.newClientError(ClientError.OtherApolloError, error.message);
  }
}

function handleApolloNetworkError(e: Error | ServerParseError | ServerError): AppException[] {
  const exceptions: AppException[] = [];

  if (e.name === "ServerError") {
    const serverError = <ServerError>e;
    if (typeof serverError.result === "object") {
      serverError.result.forEach((r: any) => {
        r.errors?.forEach((re: any) => {
          logger.error("graphql", "GraphQL server network error:", re.message);
          exceptions.push(AppException.newClientError(ClientError.OtherApolloError, re.message));
        });
      })
    }
  }
  else {
    logger.error("graphql", "GraphQL network error:", e);
    exceptions.push(AppException.newClientError(ClientError.OtherApolloError, e.message));
  }

  return exceptions;
}

function handleApolloError(e: ApolloError): AppException[] {
  let exceptions: AppException[] = [];

  exceptions = exceptions.concat(e.clientErrors?.map(handleApolloClientError));
  exceptions = exceptions.concat(e.graphQLErrors?.map(handleGraphQLError));
  exceptions = exceptions.concat(e.protocolErrors?.map(handleApolloProtocolError));

  if (e.networkError)
    exceptions = exceptions.concat(handleApolloNetworkError(e.networkError));

  return exceptions;
}

function handlAxiosError(e: AxiosError): AppException {
  // API error - extract relevant info
  const customException = AppException.fromJson(e.response.data);
  if (customException) {
    logger.error("axios", "Axios app exception", customException);
    return customException;
  }
  else {
    logger.error("Unhandled axios error:", e);
    return AppException.newClientError(ClientError.OtherAxiosError, e.message);
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
    let caughtExceptions: AppException[];

    // There can be multiple apollo sub-errors inside one apollo error.
    // NOTE: we can receive GraphQL errors inside apollo errors (server side) or
    // directly as GraphQLError here (client side, such as syntax error)
    if (e instanceof AppException) {
      // Already converted to an app exception
      caughtExceptions = [e];
    }
    if (e instanceof ApolloError) {
      caughtExceptions = handleApolloError(e);
    }
    else if (e instanceof GraphQLError) {
      caughtExceptions = [handleGraphQLError(e)];
    }
    else if (e instanceof AxiosError) {
      caughtExceptions = [handlAxiosError(e)];
    }
    else {
      logger.error("Unhandled error:", e);
    }

    // Emit all exceptions at once to show on UI
    caughtExceptions.map(e => emitGlobalError(e));

    // If this is a unlock/password exception, throw it so that the security service can
    // prompt users for unlocking.
    const unlockException = caughtExceptions.find(e => isUnlockException(e));
    if (unlockException)
      throw unlockException;

    const emailAlreadyExistsException = caughtExceptions.find(e => isEmailAlreadyExistsException(e));
    if (emailAlreadyExistsException)
      throw new ExistingEmailException();

    const emailNotExistsException = caughtExceptions.find(e => isEmailNotExistsException(e));
    if (emailNotExistsException)
      throw new InexistingEmailException();

    // Return default value expected by the original method call
    return errorReturnValue || null;
  }
}
