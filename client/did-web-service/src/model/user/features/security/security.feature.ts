import { gql } from "@apollo/client";
import { callWithUnlock } from "@components/security/unlock-key-prompt/call-with-unlock";
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
import { PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialDescriptorJSON, PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/typescript-types";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { map } from "rxjs";
import { User } from "../../user";
import { UserFeature } from "../user-feature";

export class SecurityFeature implements UserFeature {
  /**
   * All user's shadow keys (bindings)
   */
  public shadowKeys$ = new AdvancedBehaviorSubject<ShadowKey[]>(null, () => this.fetchShadowKeys());

  /**
   * Password shadow keys. Normally, only one per user.
   */
  public passwordKeys$ = new AdvancedBehaviorSubject<ShadowKey[]>(null, async () => {
    this.shadowKeys$.pipe(map((k) => k?.filter(k => k.type === ShadowKeyType.PASSWORD))).subscribe(this.passwordKeys$);
  });

  /**
   * Passkey shadow keys. A user may have multiple, one per bound browser.
   */
  public passkeyKeys$ = new AdvancedBehaviorSubject<ShadowKey[]>(null, async () => {
    this.shadowKeys$.pipe(map((k) => k?.filter(k => k.type === ShadowKeyType.WEBAUTHN))).subscribe(this.passkeyKeys$);
  });

  constructor(protected user: User) { }

  /**
   * Fetch safe info about shadow keys for this user. This includes password keys and
   * device keys.
   */
  private async fetchShadowKeys(): Promise<ShadowKey[]> {
    logger.log("devices", "Fetching shadow keys");

    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).query<{ userKeys: ShadowKeyDTO[] }>({
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
    const registerPasskeyOptions = await this.registerPasskeyOptions(challengeInfo, this.user.name$.value)
    // TODO: REMOVE
    console.log("bindPasskey>>>>>>>>>>>> registerPasskeyOptions: ", registerPasskeyOptions)
    const registResponse = await startRegistration(registerPasskeyOptions)
    // TODO: REMOVE
    console.log("bindPasskey>>>>>>>>>>>> registResponse: ", registResponse)
    const newKey = {
      type: ShadowKeyType.WEBAUTHN,
      keyId: registResponse.id,
      key: JSON.stringify(registResponse),
      challengeId: challengeInfo.id,
    };
    const shadowKey = await bindKey(newKey)
    // TODO: REMOVE
    console.log("bindPasskey>>>>>>>>>>>> shadowKey: ", shadowKey)
    if (shadowKey) {
      this.upsertShadowKey(shadowKey);
      this.updatePasskey(this.user.name$.value, registResponse.id)
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
    const unlockPasskeyOptions = await this.unlockPasskeyOptions(challengeInfo, null)
    // TODO: REMOVE
    console.log("unlockPasskeyLocally>>>>>>>>>>>> unlockPasskeyOptions: ", unlockPasskeyOptions)
    // true: Autofill account password will report an error
    const authenResponse = await startAuthentication(unlockPasskeyOptions, false)
    // TODO: REMOVE
    console.log("unlockPasskeyLocally>>>>>>>>>>>> authenResponse: ", authenResponse)
    const authKey = {
      type: ShadowKeyType.WEBAUTHN, //-7
      keyId: authenResponse.id,
      key: JSON.stringify(authenResponse),
      challengeId: challengeInfo.id,
    };
    logger.log("Keyring", "start unlock passkey, authenResponse: ", authenResponse);
    return authKey;
  }

  // TO UNLOCK PASSKEY
  private async unlockPasskeyOptions(challengeInfo: ChallengeEntity, userName?: string): Promise<PublicKeyCredentialRequestOptionsJSON> {
    const rpId = process.env.NEXT_PUBLIC_RP_ID
    const allowCredentials = this.getPasskeyPublicKeyCredentialWithUserName(this.user.name$.value)
    const publicKeyCredentialCreationOptions: PublicKeyCredentialRequestOptionsJSON = {
      challenge: challengeInfo.content,
      allowCredentials: allowCredentials,
      rpId: rpId,
      userVerification: "preferred",
      timeout: 30000
    };
    return publicKeyCredentialCreationOptions
  }

  // TO REGISTER PASSKEY
  private async registerPasskeyOptions(challengeInfo: ChallengeEntity, userName?: string): Promise<PublicKeyCredentialCreationOptionsJSON> {
    const rpId = process.env.NEXT_PUBLIC_RP_ID
    const rpName = process.env.NEXT_PUBLIC_RP_NAME
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

      authenticatorSelection: {
        userVerification: "preferred", // Webauthn default is "preferred"
        //residentKey: "required", // <-- This will trigger passkey support in Android
      },
      timeout: 30000
    }

    return pkCredentialCreationOptionsJSON
  }

  private getPasskeyPublicKeyCredentialWithUserName(userName: string): PublicKeyCredentialDescriptorJSON[] {
    // Get existing passkey data.
    const passkey = process.env.NEXT_PUBLIC_PASSKEY_USERS;
    const existingPasskeys: { name: string, credentialId: string }[] = JSON.parse(localStorage.getItem(passkey)) || [];

    // Iterate through the array and search for matching users
    const user = existingPasskeys.find((user) => user.name === userName);
    return [{
      id: user.credentialId,
      type: 'public-key',
      transports: ['internal'],
    }]
  }

  /**
   * Update the credentialIds of the locally stored passkey
  */
  private updatePasskey(userName: string, credentialId: string): void {
    // Get existing passkey data from localStorage
    const passkey = process.env.NEXT_PUBLIC_PASSKEY_USERS;
    const existingPasskeys: { name: string, credentialId: string }[] = JSON.parse(localStorage.getItem(passkey)) || [];

    // Check if the userName already exists in the passkey data
    const userIndex = existingPasskeys.findIndex((user) => user.name === userName);

    if (userIndex !== -1) {
      // If it exists, update the credentialId
      existingPasskeys[userIndex].credentialId = credentialId;
    } else {
      // If it doesn't exist, create a new entry as an object
      const newUser = { name: userName, credentialId };
      existingPasskeys.push(newUser);
    }

    // Save the updated passkey data back to localStorage
    localStorage.setItem(passkey, JSON.stringify(existingPasskeys));
  }  

  private upsertShadowKey(shadowKey: ShadowKey): void {
    const keys = this.shadowKeys$.value;
    this.shadowKeys$.next([
      ...keys.filter(k => !k.equals(shadowKey)),
      shadowKey
    ]);
  }

  private deletePasswordShadowKey(): void {
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

  /**
   * Calls an API that returns true is the master key is unlocked, or throws an
   * authorization exception otherwise. This api does nothing but helping us to unlock the master key
   * in a loop.
   */
  public async checkRemoteUnlockStatus(): Promise<void> {
    return withCaughtAppException(async () => {
      await (await getApolloClient()).query({
        query: gql`
          query CheckMasterKeyLock {
            checkMasterKeyLock
          }
        `
      });
    });
  }

  /**
   * Force unlocking the master key, if there is one.
   * If there is none, this succeeds.
   *
   * This method is used to unlock first before trying to call methods that require unlocking.
   * Some methods auto catch unlock exception and retry with callWithUnlock() but in some cases we prefer to unlock
   * first (UX reasons), such as when changing password.
   */
  public ensureMasterKeyUnlocked(): Promise<boolean> {
    return callWithUnlock(async () => {
      await this.checkRemoteUnlockStatus();
      return true;
    }, true, false);
  }

  /**
   * Requests a temporary authentication url and pin code to use to sign in from another device.
   */
  public async requestTemporaryAuthenticationUrl(): Promise<{ url: string; pinCode: string }> {
    logger.log("user", "Requesting a temporary authentication url");

    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ requestTemporaryAuthentication: { url?: string; pinCode?: string; } }>({
        mutation: gql`
          mutation RequestTemporaryAuthentication {
            requestTemporaryAuthentication {
              url pinCode
            }
          }
        `
      });
    });

    if (result?.data?.requestTemporaryAuthentication?.url) {
      return {
        url: result?.data?.requestTemporaryAuthentication.url,
        pinCode: result?.data?.requestTemporaryAuthentication.pinCode
      };
    }
  }
}