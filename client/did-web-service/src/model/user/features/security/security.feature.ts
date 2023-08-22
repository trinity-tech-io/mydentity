import { gql } from "@apollo/client";
import { gqlShadowKeyFields } from "@graphql/shadow-key.fields";
import { ShadowKey } from "@model/shadow-key/shadow-key";
import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";
import { ShadowKeyDTO } from "@model/shadow-key/shadow-key.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";
import { User } from "../../user";
import { UserFeature } from "../user-feature";
import { BindKeyInput } from "./bind-key.input";

export class SecurityFeature implements UserFeature {
  private _shadowKeys$ = new LazyBehaviorSubjectWrapper<ShadowKey[]>(null, this.fetchShadowKeys);
  public get shadowKeys$() { return this._shadowKeys$.getSubject(); }

  constructor(protected user: User) { }

  /**
   * Fetch safe info about shadow keys for this user. This includes password keys and
   * device keys.
   */
  private async fetchShadowKeys(): Promise<ShadowKey[]> {
    logger.log("devices", "Fetching shadow keys");

    const result = await withCaughtAppException(() => {
      return getApolloClient().query<{ userKeys: ShadowKeyDTO[] }>({
        query: gql`
        query FetchShadowKeys {
          userKeys {
            ${gqlShadowKeyFields}
          }
        }
      `
      });
    });

    if (result?.data?.userKeys) {
      const shadowKeys = await Promise.all(result.data.userKeys.map(key => ShadowKey.fromJson(key)));
      logger.log("security", "Fetched user shadow keys:", shadowKeys);
      return shadowKeys;
    }

    return null;
  }

  // TODO: method to force request auth (ie: for export mnemonic or bind device)
  // TODO: method to save default auth method (password or passkey)

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
      keyId: "TODO-LIAIHONG",
      type: ShadowKeyType.ED25519
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
      return true;
    }
    else {
      return false;
    }
  }

  public async bindPassword(newPassword: string) {
    logger.log("security", "Binding password");

    const input: BindKeyInput = {
      key: newPassword,
      keyId: "unused-for-now-for-passwords",
      type: ShadowKeyType.PASSWORD
    }

    const result = await withCaughtAppException(() => {
      return getApolloClient().mutate<{ bindKey: boolean }>({
        mutation: gql`
          mutation bindKey($input: BindKeyInput!) {
            bindKey(input: $input)
          }
        `,
        variables: { input }
      });
    });

    console.log("bind password result", result?.data);

    if (result?.data?.bindKey) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Tells if user has at least one password shadow key.
   */
  public isPasswordBound(): boolean {
    return !!this.shadowKeys$.value?.find(key => key.type === ShadowKeyType.PASSWORD);
  }
}