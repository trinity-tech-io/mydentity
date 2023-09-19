import { gql } from "@apollo/client";
import { logger } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { gqlCredentialFields } from "@graphql/credential.fields";
import { gqlRequestedCredentialsFields } from "@graphql/requested-credential.fields";
import type { Credential } from "@model/credential/credential";
import type { CredentialDTO } from "@model/credential/credential.dto";
import type { InteractingApplication } from "@model/interacting-application/interacting-application";
import type { RequestedCredential } from "@model/requested-credentials/requested-credentials";
import type { RequestedCredentialsDTO } from "@model/requested-credentials/requested-credentials.dto";
import type { IdentityInteractingApplicationDTO } from "./identity-interacting-application.dto";

import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { callWithUnlock } from "@components/security/unlock-key-prompt/call-with-unlock";

export class IdentityInteractingApplication {
  id: string;
  createdAt: Date;
  interactingApplication: InteractingApplication;

  requestedCredentials$ = new AdvancedBehaviorSubject<RequestedCredential[]>(null, () => this.fetchRequestedCredentials());
  importedCredentials$ = new AdvancedBehaviorSubject<Credential[]>(null, () => this.fetchImportedCredentials());

  public static async fromJson(json: IdentityInteractingApplicationDTO): Promise<IdentityInteractingApplication> {
    const application = new IdentityInteractingApplication();
    Object.assign(application, json);

    application.createdAt = new Date(json.createdAt);

    // Circular deps
    const { InteractingApplication } = await import("@model/interacting-application/interacting-application");
    application.interactingApplication = await InteractingApplication.fromJson(json.interactingApplication);

    return application;
  }

  private async fetchRequestedCredentials(): Promise<RequestedCredential[]> {
    return callWithUnlock(async () => {
      const result = await withCaughtAppException(async () => {
        return (await getApolloClient()).query<{ requestedCredentials: RequestedCredentialsDTO[] }>({
          query: gql`
          query requestedCredentials($identityInteractingAppId: String!) {
            requestedCredentials(identityInteractingAppId: $identityInteractingAppId) {
              ${gqlRequestedCredentialsFields}
            }
          }
        `,
          variables: {
            identityInteractingAppId: this.id
          }
        });
      });

      if (result?.data?.requestedCredentials) {
        const { RequestedCredential } = await import("@model/requested-credentials/requested-credentials");
        const requestedCredentials = await Promise.all(result.data.requestedCredentials.map(rc => RequestedCredential.fromJson(rc)));
        logger.log("applications", "Fetched requested credentials:", requestedCredentials);
        return requestedCredentials;
      }

      return null;
    });
  }

  private async fetchImportedCredentials(): Promise<Credential[]> {
    return callWithUnlock(async () => {
      const result = await withCaughtAppException(async () => {
        return (await getApolloClient()).query<{ importedCredentials: CredentialDTO[] }>({
          query: gql`
          query importedCredentials($identityInteractingAppId: String!) {
            importedCredentials(identityInteractingAppId: $identityInteractingAppId) {
              ${gqlCredentialFields}
            }
          }
        `,
          variables: {
            identityInteractingAppId: this.id
          }
        });
      });

      if (result?.data?.importedCredentials) {
        const { credentialFromJson } = await import("@model/credential/credential-builder");
        const importedCredentials = await Promise.all(result.data.importedCredentials.map(c => credentialFromJson(c)));
        logger.log("applications", "Fetched imported credentials:", importedCredentials);
        return importedCredentials;
      }

      return null;
    });
  }
}