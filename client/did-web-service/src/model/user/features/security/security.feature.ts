import { gql } from "@apollo/client";
import { UserShadowKeyType } from "@model/security/user-shadow-key-type";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { User } from "../../user";
import { UserFeature } from "../user-feature";
import { BindKeyInput } from "./bind-key.input";

export class SecurityFeature implements UserFeature {
  constructor(protected user: User) {
  }

  /**
   * Requests a challenge from the API for passkey signature. This challenge will be signed
   * using passkey and the signature+challenge id returned during security flows
   * such as binding devices or providing decryption access to the server.
   */
  private requestPasskeyChallenge() {
    /* const { data } = await withCaughtAppException(() => {
      return getApolloClient().mutate<{ createIdentity: IdentityDTO }>({
        mutation: gql`
        mutation createIdentity($name: String!) {
          createIdentity(input: { name: $name }) {
            ${gqlIdentityFields}
          }
        }
      `,
        variables: {
          name: "Ben"
        }
      });
    });

    console.log(data)

    if (data?.createIdentity) {
      return Identity.fromJson(data.createIdentity, this);
    }
    else {
      throw new Error("Failed to create DID");
    } */
  }

  public async bindDevice() {
    const input: BindKeyInput = {
      key: "testkey",
      type: UserShadowKeyType.ED25519
    }

    const { data } = await withCaughtAppException(() => {
      return getApolloClient().mutate<{ bindKey: boolean }>({
        mutation: gql`
          mutation bindKey($input: BindKeyInput!) {
            bindKey(input: $input)
          }
        `,
        variables: { input }
      });
    });

    console.log("bind device result", data);

    if (data?.bindKey) {
      //return Identity.fromJson(data.createIdentity, this);
    }
    else {
      throw new Error("Failed to create DID");
    }
  }

  public bindPassword(newPassword: string) {
    console.log("bind password", newPassword);
  }
}