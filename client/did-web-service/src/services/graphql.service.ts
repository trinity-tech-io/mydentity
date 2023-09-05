import {
  ApolloClient,
  from,
  fromPromise,
  InMemoryCache
} from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { onRefreshTokenFailed, refreshToken } from '@services/user/user.service';
import Queue from "promise-queue";
import { getBrowserId } from './browser.service';
import { configService } from './config/config.service';

class GraphQLService {
  public apolloClient: ApolloClient<any>;
  private initialized = false;
  private queue = new Queue(1);

  public async init(): Promise<void> {
    return this.queue.add((): Promise<void> => {
      if (this.initialized)
        return;

      // Batch requests into small duration chunks to avoid too many round trips
      const httpLink = new BatchHttpLink({
        uri: `${configService.get("backendUrl")}/graphql`,
        batchMax: 30, // No more than N operations per batch
        batchInterval: 50 // Wait no more than N ms after first batched operation
      });

      // TODO: Only log the error. This can work with withClientState()
      const errLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
        //console.error('GraphQL service errors', graphQLErrors, networkError);
        if (graphQLErrors) {
          // skip when no local token.
          if (!localStorage.getItem('access_token')) {
            return;
          }

          // import("@services/user/user.service").then(({ refreshToken, onRefreshTokenFailed }) => { // circular deps
          for (const err of graphQLErrors) {
            switch (err.extensions.code) {
              case 'UNAUTHENTICATED': // handle token expired.
                return fromPromise(
                  refreshToken().catch((error) => {
                    return;
                  }))
                  .filter((value) => Boolean(value))
                  .flatMap((accessToken) => {
                    const oldHeaders = operation.getContext().headers;
                    operation.setContext({
                      headers: {
                        ...oldHeaders,
                        authorization: `Bearer ${accessToken}`,
                      },
                    });
                    // Retry the request, returning the new observable
                    return forward(operation);
                  });
              case 'INVALID_REFRESH_TOKEN':
                onRefreshTokenFailed();
                break;
            }
          }
          // })
        }

        // To retry on network errors, we recommend the RetryLink
        // instead of the onError link. This just logs the error.
        /* if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        } */
      });

      /**
       * Appends JWT access token to graphql requests. This auth link setter is called for every
       * api call.
       */
      const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem('access_token');

        // Return the modified headers to the context so httpLink can read them

        const browserId = getBrowserId();
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
            ...(browserId && { "x-browser-id": browserId })
          }
        }
      });

      this.apolloClient = new ApolloClient({
        link: from([errLink, authLink, httpLink]),
        cache: new InMemoryCache(),
      });

      this.initialized = true;
    });
  }
}

export const graphQLService = new GraphQLService();

/**
 * We need to make this init asycn to enjoy the benefits of SSR, in order to let many components
 * pre-render, and we initialize graphql asynchronously.
 */
export const getApolloClient = async (): Promise<ApolloClient<any>> => {
  await graphQLService.init();
  return graphQLService.apolloClient;
}