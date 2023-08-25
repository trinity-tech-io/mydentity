import { gql } from "@apollo/client";
import { gqlShadowKeyFields } from "@graphql/shadow-key.fields";
import { ShadowKey } from "@model/shadow-key/shadow-key";
import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";
import { ShadowKeyDTO } from "@model/shadow-key/shadow-key.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { bindPasskey, bindPassword, unlockPasskey } from "@services/user/user.service";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";
import { map } from "rxjs";
import { User } from "../../user";
import { UserFeature } from "../user-feature";

export class SecurityFeature implements UserFeature {
  /**
   * All user's shadow keys (bindings)
   */
  public get shadowKeys$() { return this._shadowKeys$.getSubject(); }
  private _shadowKeys$ = new LazyBehaviorSubjectWrapper<ShadowKey[]>(null, () => this.fetchShadowKeys());

  /**
   * Password shadow keys. Normally, only one per user.
   */
  public get passwordKeys$() { return this._passwordKeys$.getSubject(); }
  private _passwordKeys$ = new LazyBehaviorSubjectWrapper<ShadowKey[]>(null, async () => {
    this.shadowKeys$.pipe(map((k) => k?.filter(k => k.type === ShadowKeyType.PASSWORD))).subscribe(this.passwordKeys$);
  });

  /**
   * Passkey shadow keys. A user may have multiple, one per bound browser.
   */
  public get passkeyKeys$() { return this._passkeyKeys$.getSubject(); }
  private _passkeyKeys$ = new LazyBehaviorSubjectWrapper<ShadowKey[]>(null, async () => {
    this.shadowKeys$.pipe(map((k) => k?.filter(k => k.type === ShadowKeyType.WEBAUTHN))).subscribe(this.passkeyKeys$);
  });

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

  public async bindPasskey(name: string): Promise<boolean> {
    const shadowKey = await bindPasskey(name);
    if (shadowKey) {
      this.upsertShadowKey(shadowKey);
      return true;
    }

    return false;
  }

  public async unlockPasskey(): Promise<boolean> {
    return await unlockPasskey()
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