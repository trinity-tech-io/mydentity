/**
 * Service used to manage managed identities created by third party applications
 * using the SDK. Users can get info abotu a claimable identity, using a claim request id,
 * and request to claim such identity to transfer it to his user account.
 */

import { gql } from "@apollo/client";
import { callWithUnlock } from "@components/security/unlock-key-prompt/call-with-unlock";
import { gqlIdentityClaimRequestFields } from "@graphql/identity-claim-request.fields";
import { IdentityClaimExceptionCode } from "@model/exceptions/exception-codes";
import { IdentityClaimRequest } from "@model/identity-claim-request/identity-claim-request";
import { IdentityClaimRequestDTO } from "@model/identity-claim-request/identity-claim-request.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";

export async function fetchIdentityClaimRequest(claimRequestId: string, nonce: string): Promise<IdentityClaimRequest> {
  return callWithUnlock(async () => {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).query<{ identityClaimRequest: IdentityClaimRequestDTO }>({
        query: gql`
            query IdentityClaimRequest($claimRequestId: String!, $nonce: String!) {
              identityClaimRequest(id: $claimRequestId, nonce: $nonce) {
                ${gqlIdentityClaimRequestFields}
              }
            }
          `,
        variables: {
          claimRequestId,
          nonce
        }
      });
    }, null, [
      // Exceptions we want to catch manually
      IdentityClaimExceptionCode.RequestExpired,
      IdentityClaimExceptionCode.AlreadyClaimed,
      IdentityClaimExceptionCode.InvalidNonce,
      IdentityClaimExceptionCode.RequestNotExists
    ]);

    if (result?.data?.identityClaimRequest) {
      return IdentityClaimRequest.fromJson(result?.data?.identityClaimRequest);
    }
    else {
      return null;
    }
  });
}
