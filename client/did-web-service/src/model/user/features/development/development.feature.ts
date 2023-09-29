import { gql } from "@apollo/client";
import { graphQLDeveloperAccessKeyFields } from "@graphql/developer-access-key.fields";
import { DeveloperAccessKey } from "@model/developer-access-key/developer-access-key";
import { DeveloperAccessKeyDTO } from "@model/developer-access-key/developer-access-key.dto";
import { UserFeature } from "@model/user/features/user-feature";
import type { User } from "@model/user/user";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { CreatedAccessKeyDTO } from "./created-access-key.dto";

export class DevelopmentFeature implements UserFeature {
  public accessKeys$ = new AdvancedBehaviorSubject<DeveloperAccessKey[]>(null, () => this.fetchAccessKeys());

  constructor(protected user: User) {
  }

  private async fetchAccessKeys(): Promise<DeveloperAccessKey[]> {
    logger.log("development", "Fetchind developer access keys");

    const { data } = await withCaughtAppException(async () => {
      return await (await getApolloClient()).query<{ developerAccessKeys: DeveloperAccessKeyDTO[] }>({
        query: gql`
          query DeveloperAccessKeys {
            developerAccessKeys {
              ${graphQLDeveloperAccessKeyFields}
            }
          }
        `
      });
    });

    if (data) {
      logger.log("development", "Got access keys", data.developerAccessKeys);
      return Promise.all(data.developerAccessKeys.map(key => DeveloperAccessKey.fromJson(key)));
    } else {
      throw new Error('Failed to fetch developer access keys.');
    }
  }

  public async createAccessKey(): Promise<{ storedKey: DeveloperAccessKey, clearKey: string }> {
    logger.log("development", "Creating a new developer access key");

    const result = await withCaughtAppException(async () => {
      return await (await getApolloClient()).mutate<{ createDeveloperAccessKey: CreatedAccessKeyDTO }>({
        mutation: gql`
          mutation CreateDeveloperAccessKey {
            createDeveloperAccessKey {
              storedKey { ${graphQLDeveloperAccessKeyFields} }
              clearKey
            }
          }
        `
      });
    });

    if (result?.data?.createDeveloperAccessKey) {
      const storedKey = await DeveloperAccessKey.fromJson(result.data.createDeveloperAccessKey.storedKey);
      this.accessKeys$.next([...this.accessKeys$.value, storedKey]);
      return { storedKey, clearKey: result.data.createDeveloperAccessKey.clearKey };
    } else {
      logger.error('development', 'Failed to create access key.');
      return null;
    }
  }
}