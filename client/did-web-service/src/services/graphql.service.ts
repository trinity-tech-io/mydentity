import {
  ApolloClient,
  from,
  fromPromise,
  InMemoryCache
} from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { configService } from './config/config.service';

class GraphQLService {
  public apolloClient: ApolloClient<any>;

  public async init() {
    // Batch requests into small duration chunks to avoid too many round trips
    const httpLink = new BatchHttpLink({
      uri: `${configService.get("backendUrl")}/graphql`,
      batchMax: 30, // No more than N operations per batch
      batchInterval: 50 // Wait no more than N ms after first batched operation
    });

    // TODO: Only log the error. This can work with withClientState()
    const errLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        console.error('graphQLErrors', graphQLErrors);

        import("@services/user/user.service").then(({ refreshToken, onRefreshTokenFailed }) => { // circular deps
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
        })
      }

      // To retry on network errors, we recommend the RetryLink
      // instead of the onError link. This just logs the error.
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    });

    /**
     * Appends JWT access token to graphql requests
     */
    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem('access_token');

      // Return the modified headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });

    this.apolloClient = new ApolloClient({
      link: from([errLink, authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }
}

export const graphQLService = new GraphQLService();

export const getApolloClient = (): ApolloClient<any> => {
  return graphQLService.apolloClient;
}