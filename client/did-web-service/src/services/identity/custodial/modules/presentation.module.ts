import { gql } from "@apollo/client";
import type { JSONObject, VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { gqlPresentationFields } from "@graphql/presentation.fields";
import { PresentationDTO } from "@model/presentation/presenttation.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { IdentityProviderPresentation } from "@services/identity/did.provider";
import { lazyElastosDIDSDKImport } from "@utils/import-helper";

export class PresentationModule implements IdentityProviderPresentation {
  public async createVerifiablePresentation(identityDid: string, credentialsArg: VerifiableCredential[], realm: string, nonce: string): Promise<VerifiablePresentation> {
    const { VerifiablePresentation } = await lazyElastosDIDSDKImport();

    const credentials: JSONObject[] = [];
    credentialsArg.forEach(c => {
      credentials.push(c.toJSON())
    })

    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ createVerifiablePresentation: PresentationDTO }>({
        mutation: gql`
        mutation createVerifiablePresentation($identityDid: String!, $credentials: Json!, $realm: String!, $nonce: String!) {
          createVerifiablePresentation(input: { identityDid: $identityDid, credentials: $credentials, realm: $realm, nonce: $nonce}) {
            ${gqlPresentationFields}
          }
        }
      `,
        variables: {
          identityDid,
          credentials,
          realm,
          nonce
        }
      });
    });

    if (result?.data?.createVerifiablePresentation) {
      return VerifiablePresentation.parse(result.data.createVerifiablePresentation.verifiablePresentation);
    }
    return null;
  }

}