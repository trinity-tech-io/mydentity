import { gql } from "@apollo/client";
import { graphQLDeveloperAccessTokenFields } from "@graphql/developer-access-token.fields";
import { DeveloperAccessToken } from "@model/developer-access-token/developer-access-token";
import { DeveloperAccessTokenDTO } from "@model/developer-access-token/developer-access-token.dto";
import { UserFeature } from "@model/user/features/user-feature";
import type { User } from "@model/user/user";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { CreatedAccessTokenDTO } from "./created-access-token.dto";

export class DevelopmentFeature implements UserFeature {
  public accessTokens$ = new AdvancedBehaviorSubject<DeveloperAccessToken[]>(null, () => this.fetchAccessTokens());

  constructor(protected user: User) {
  }

  private async fetchAccessTokens(): Promise<DeveloperAccessToken[]> {
    logger.log("development", "Fetchind developer access tokens");

    const { data } = await withCaughtAppException(async () => {
      return await (await getApolloClient()).query<{ developerAccessTokens: DeveloperAccessTokenDTO[] }>({
        query: gql`
          query DeveloperAccessTokens {
            developerAccessTokens {
              ${graphQLDeveloperAccessTokenFields}
            }
          }
        `
      });
    });

    if (data) {
      logger.log("development", "Got access tokens", data.developerAccessTokens);
      return Promise.all(data.developerAccessTokens.map(token => DeveloperAccessToken.fromJson(token)));
    } else {
      throw new Error('Failed to fetch developer access tokens.');
    }
  }

  public async createAccessToken(): Promise<{ storedToken: DeveloperAccessToken, clearToken: string }> {
    logger.log("development", "Creating a new developer access token");

    const result = await withCaughtAppException(async () => {
      return await (await getApolloClient()).mutate<{ createDeveloperAccessToken: CreatedAccessTokenDTO }>({
        mutation: gql`
          mutation CreateDeveloperAccessToken {
            createDeveloperAccessToken {
              storedToken { ${graphQLDeveloperAccessTokenFields} }
              clearToken
            }
          }
        `
      });
    });

    if (result?.data?.createDeveloperAccessToken) {
      const storedToken = await DeveloperAccessToken.fromJson(result.data.createDeveloperAccessToken.storedToken);
      this.accessTokens$.next([...this.accessTokens$.value, storedToken]);
      return { storedToken, clearToken: result.data.createDeveloperAccessToken.clearToken };
    } else {
      logger.error('development', 'Failed to create access token.');
      return null;
    }
  }
}