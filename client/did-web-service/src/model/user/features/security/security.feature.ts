import { gql } from "@apollo/client";
import { gqlShadowKeyFields } from "@graphql/shadow-key.fields";
import { ShadowKey } from "@model/shadow-key/shadow-key";
import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";
import { ShadowKeyDTO } from "@model/shadow-key/shadow-key.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { bindPassword } from "@services/keyring/keyring.service";
import { logger } from "@services/logger";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";
import { User } from "../../user";
import { UserFeature } from "../user-feature";

export class SecurityFeature implements UserFeature {
  private _shadowKeys$ = new LazyBehaviorSubjectWrapper<ShadowKey[]>(null, () => this.fetchShadowKeys());
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

  public async bindPassword(newPassword: string): Promise<boolean> {
    const shadowKey = await bindPassword(newPassword);
    if (shadowKey) {
      this.upsertShadowKey(shadowKey);
      return true;
    }

    return false;
  }

  private upsertShadowKey(shadowKey: ShadowKey) {
    const keys = this.shadowKeys$.value;
    this.shadowKeys$.next([
      ...keys.filter(k => !k.equals(shadowKey)),
      shadowKey
    ]);
  }

  /**
   * Tells if user has at least one password shadow key.
   */
  public isPasswordBound(): boolean {
    return !!this.shadowKeys$.value?.find(key => key.type === ShadowKeyType.PASSWORD);
  }
}