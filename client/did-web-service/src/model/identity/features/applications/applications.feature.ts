import { gql } from "@apollo/client";
import { gqlIdentityInteractingApplicationFields } from "@graphql/identity-interacting-application.fields";
import { Credential } from "@model/credential/credential";
import { IdentityInteractingApplication } from "@model/identity-interacting-application/identity-interacting-application";
import { IdentityInteractingApplicationDTO } from "@model/identity-interacting-application/identity-interacting-application.dto";
import { Identity } from "@model/identity/identity";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { IdentityFeature } from "../identity-feature";
import { RecordRequestedCredentialsInput } from "./record-requested-credentials.input";

export class ApplicationsFeature implements IdentityFeature {
  public applications$ = new AdvancedBehaviorSubject<IdentityInteractingApplication[]>(null, () => this.fetchInteractingApplications());

  constructor(protected identity: Identity) { }

  private async fetchInteractingApplications(): Promise<IdentityInteractingApplication[]> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).query<{ interactingApplications: IdentityInteractingApplicationDTO[] }>({
        query: gql`
          query interactingApplications($identityDid: String!) {
            interactingApplications(identityDid: $identityDid) {
              ${gqlIdentityInteractingApplicationFields}
            }
          }
        `,
        variables: {
          identityDid: this.identity.did
        }
      });
    });

    if (result?.data?.interactingApplications) {
      const applications = await Promise.all(result.data.interactingApplications.map(app => IdentityInteractingApplication.fromJson(app)));
      logger.log("applications", "Fetched identity interacting applications:", applications);
      return applications;
    }

    return null;
  }

  /**
   * Records credentials shared by the user to a third party app has having been "accessed" by that
   * application.
   */
  public async recordRequestedCredentials(applicationDid: string, credentials: Credential[]): Promise<void> {
    const input: RecordRequestedCredentialsInput = {
      applicationDid,
      credentialIds: credentials.map(c => c.id)
    };

    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ recordRequestedCredentials: boolean }>({
        mutation: gql`
          mutation recordRequestedCredentials($input: RecordRequestedCredentialsInput!) {
            recordRequestedCredentials(input: $input)
          }
        `,
        variables: { input }
      });
    });

    if (result?.data?.recordRequestedCredentials) {
      return;
    }
    else {
      logger.error("identity", "Failed to record requested credentials");
    }
  }
}