import { gql } from "@apollo/client";
import { gqlIdentityInteractingApplicationFields } from "@graphql/identity-interacting-application.fields";
import { IdentityInteractingApplication } from "@model/identity-interacting-application/identity-interacting-application";
import { IdentityInteractingApplicationDTO } from "@model/identity-interacting-application/identity-interacting-application.dto";
import type { User } from "@model/user/user";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { UserFeature } from "../user-feature";

export class ApplicationsFeature implements UserFeature {
  // All applications having interacted with this user, all identities included
  public applications$ = new AdvancedBehaviorSubject<IdentityInteractingApplication[]>(null, () => this.fetchInteractingApplications());

  constructor(protected user: User) { }

  private async fetchInteractingApplications(): Promise<IdentityInteractingApplication[]> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).query<{ interactingApplications: IdentityInteractingApplicationDTO[] }>({
        query: gql`
          query interactingApplications {
            interactingApplications {
              ${gqlIdentityInteractingApplicationFields}
            }
          }
        `,
      });
    });

    if (result?.data?.interactingApplications) {
      const applications = await Promise.all(result.data.interactingApplications.map(app => IdentityInteractingApplication.fromJson(app)));
      logger.log("applications", "Fetched all user interacting applications:", applications);
      return applications;
    }

    return null;
  }
}