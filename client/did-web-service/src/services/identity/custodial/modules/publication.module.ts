import { gql } from "@apollo/client";
import { gqlPublishFields } from "@graphql/publish.fields";
import { IdentityPublicationStatusResult } from "@model/identity-publication/identity-publication-status.dto";
import { PublishDTO } from "@model/publication/publish.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { IdentityProviderPublication } from "@services/identity/did.provider";

export class PublicationModule implements IdentityProviderPublication {
  async publishIdentity(identityDid: string): Promise<string> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ publishIdentity: PublishDTO }>({
        mutation: gql`
        mutation publishIdentity($identityDid: String!) {
          publishIdentity(identityDid: $identityDid) {
            ${gqlPublishFields}
          }
        }
      `,
        variables: {
          identityDid,
        }
      });
    });

    if (result?.data?.publishIdentity.publicationId) {
      return result?.data.publishIdentity.publicationId;
    }
    else {
      throw new Error("Failed to publish DID");
    }
  }

  async getPublicationStatus(identityDid: string): Promise<IdentityPublicationStatusResult> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ getPublicationStatus: IdentityPublicationStatusResult }>({
        mutation: gql`
        mutation getPublicationStatus($identityDid: String!) {
          getPublicationStatus(input: { identityDid: $identityDid}) {
            state
          }
        }
      `,
        variables: {
          identityDid
        }
      });
    });

    if (result?.data?.getPublicationStatus) {
      return result.data.getPublicationStatus;
    }
    else {
      throw new Error("Failed to get publication status");
    }
  }
}