/**
 * Service used to manage managed identities created by third party applications
 * using the SDK. Users can get info abotu a claimable identity, using a claim request id,
 * and request to claim such identity to transfer it to his user account.
 */

import { gql } from "@apollo/client";
import { callWithUnlock } from "@components/security/unlock-key-prompt/call-with-unlock";
import { gqlIdentityClaimRequestFields } from "@graphql/identity-claim-request.fields";
import { IdentityClaimRequest } from "@model/identity-claim-request/identity-claim-request";
import { IdentityClaimRequestDTO } from "@model/identity-claim-request/identity-claim-request.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";

export async function fetchIdentityClaimRequest(claimRequestId: string): Promise<IdentityClaimRequest> {
  const result = await callWithUnlock(() => withCaughtAppException(async () => {
    return (await getApolloClient()).query<{ identityClaimRequest: IdentityClaimRequestDTO }>({
      query: gql`
        query IdentityClaimRequest($claimRequestId: String!) {
          identityClaimRequest(id: $claimRequestId) {
            ${gqlIdentityClaimRequestFields}
          }
        }
      `,
      variables: {
        claimRequestId
      }
    });
  }));

  if (result?.data?.identityClaimRequest) {
    return IdentityClaimRequest.fromJson(result?.data?.identityClaimRequest);
  }

  return null;
}