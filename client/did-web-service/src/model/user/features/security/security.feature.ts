import { gql } from "@apollo/client";
import { gqlShadowKeyFields } from "@graphql/shadow-key.fields";
import { ChallengeEntity } from "@model/shadow-key/challenge-entity";
import { ShadowKey } from "@model/shadow-key/shadow-key";
import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";
import { ShadowKeyDTO } from "@model/shadow-key/shadow-key.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { AuthKeyInput } from "@services/keyring/auth-key.input";
import { bindKey, changePassword, getPasskeyChallenge } from "@services/keyring/keyring.service";
import { logger } from "@services/logger";
import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import { PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/typescript-types";
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

  /**
   * Sets the master unlock password for the currently signed in user.
   * - If a password key already exists, we call bindKey (first time).
   * - If not, we call changePassword, which creates a new shadow key.
   * Then the old password shadow key is removed locally.
   */
  public async bindPassword(newPassword: string): Promise<boolean> {
    logger.log("keyring", "Binding password");

    let newShadowKeys: ShadowKey[];
    if (!this.isPasswordBound()) {
      const newKey: AuthKeyInput = {
        type: ShadowKeyType.PASSWORD,
        key: newPassword,
        keyId: "unused-for-now-for-passwords",
      }

      newShadowKeys = [await bindKey(newKey)];
    }
    else {
      newShadowKeys = await changePassword(newPassword);
    }

    if (newShadowKeys) {
      // Delete the existing password shadow key if any
      this.deletePasswordShadowKey();

      // Insert the new password key
      newShadowKeys.forEach(k => this.upsertShadowKey(k));

      return true;
    }

    return false;
  }

  public async bindPasskey(): Promise<boolean> {
    const challengeInfo = await getPasskeyChallenge()
    const infos = await this.pkCredentialCreationOptions(challengeInfo, this.user.name$.value)
    const attResp = await startRegistration(infos[1])
    const newKey = {
      type: ShadowKeyType.WEBAUTHN,
      keyId: attResp.id,
      key: JSON.stringify(attResp),
      challengeId: challengeInfo.id,
    };
    const shadowKey = await bindKey(newKey)

    if (shadowKey) {
      this.upsertShadowKey(shadowKey);
      return true;
    }

    return false;
  }

  /**
   * Prepares passkey unlock process by requesting a challenge to the backend, then
   * signing it with user's browser passkey. The generated auth input is returned and must
   * later be processed with a call to unlockMasterKey(authKey) to actually unlock the key on the backend.
   */
  public async unlockPasskeyLocally(): Promise<AuthKeyInput> {
    logger.log("Keyring", "start unlock passkey...")
    const challengeInfo = await getPasskeyChallenge()
    const infos = await this.pkCredentialCreationOptions(challengeInfo, null)
    // true: Autofill account password will report an error
    const attResp = await startAuthentication(infos[0], false)
    const authKey = {
      type: ShadowKeyType.WEBAUTHN, //-7
      keyId: attResp.id,
      key: JSON.stringify(attResp),
      challengeId: challengeInfo.id,
    };
    logger.log("Keyring", "start unlock passkey, attResp: ", attResp);
    return authKey;
  }

  private async pkCredentialCreationOptions(challengeInfo: ChallengeEntity, userName?: string): Promise<[PublicKeyCredentialRequestOptionsJSON, PublicKeyCredentialCreationOptionsJSON]> {
    const rpId = process.env.NEXT_PUBLIC_RP_ID
    const rpName = process.env.NEXT_PUBLIC_RP_NAME
    const challengeEncoder = new TextEncoder()
    const challengeUint8Array = challengeEncoder.encode(challengeInfo.content)
    // TO UNLOCK PASSKEY
    const publicKeyCredentialCreationOptions: PublicKeyCredentialRequestOptionsJSON = {
      challenge: Buffer.from(challengeUint8Array).toString(),
      allowCredentials: [],
      rpId: rpId,
      userVerification: "required",
      timeout: 60000
    };

    // TO REGISTER PASSKEY
    const rp: PublicKeyCredentialRpEntity = {
      id: rpId,
      name: rpName
    }
    const pkCredentialCreationOptionsJSON: PublicKeyCredentialCreationOptionsJSON = {
      user: {
        id: userName,
        name: userName,
        displayName: userName
      },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],
      rp: rp,
      challenge: challengeInfo.content,
    }

    return [publicKeyCredentialCreationOptions, pkCredentialCreationOptionsJSON]
  }

  private upsertShadowKey(shadowKey: ShadowKey) {
    const keys = this.shadowKeys$.value;
    this.shadowKeys$.next([
      ...keys.filter(k => !k.equals(shadowKey)),
      shadowKey
    ]);
  }

  private deletePasswordShadowKey() {
    const keys = this.shadowKeys$.value;
    this.shadowKeys$.next([
      ...keys.filter(k => k.type !== ShadowKeyType.PASSWORD),
    ]);
  }

  /**
   * Tells if user has at least one password shadow key.
   */
  public isPasswordBound(): boolean {
    return !!this.shadowKeys$.value?.find(key => key.type === ShadowKeyType.PASSWORD);
  }

  /**
   * Tells if user has bound this browser with passkey
   */
  public isThisBrowserBound(): boolean {
    return !!this.passkeyKeys$.value?.find(key => key.browser?.isCurrentBrowser());
  }
}