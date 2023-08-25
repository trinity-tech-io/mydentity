/**
 * Service responsible to manage device password and passkey bindings, and crypto operations related to
 * securing the access to user accounts's encrypted information on the server side.
 */
import { gql } from "@apollo/client";
import { gqlShadowKeyFields } from "@graphql/shadow-key.fields";
import { ChallengeEntity } from "@model/shadow-key/challengeEntity";
import { ShadowKey } from "@model/shadow-key/shadow-key";
import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";
import { ShadowKeyDTO } from "@model/shadow-key/shadow-key.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/typescript-types';
import { AuthKeyInput } from "./auth-key.input";

const rpId = process.env.WEBAUTHN_RELYING_PARTY
const userName = 'test name' // TODO: replace
const rpName = 'DID web app' // TODO: replace

export async function bindPasskey() {
  logger.log("keyring", "Binding passkey");

  const challengeInfo = await getPasskeyChallenge()
  const infos = await pkCredentialCreationOptions(challengeInfo)
  const attResp = await startRegistration(infos[1])

  console.log("infos1: ", infos[1])
  console.log("attResp: ", JSON.stringify(attResp, null, 2))

  const newKey = {
    type: ShadowKeyType.WEBAUTHN,
    keyId: attResp.id,
    key: JSON.stringify(attResp),
    challengeId: challengeInfo.id,
  };
  await bindKey(newKey)
}

export async function bindPassword(newPassword: string): Promise<ShadowKey> {
  logger.log("keyring", "Binding password");

  const newKey: AuthKeyInput = {
    type: ShadowKeyType.PASSWORD,
    key: newPassword,
    keyId: "unused-for-now-for-passwords",
  }

  return bindKey(newKey);
}

/**
 * Internal shared method to bind passkey or password.
 */
async function bindKey(newKey: AuthKeyInput): Promise<ShadowKey> {
  logger.log("keyring", "Binding key");
  const result = await withCaughtAppException(() => {
    return getApolloClient().mutate<{ bindKey: ShadowKeyDTO }>({
      mutation: gql`
        mutation bindKey($newKey: AuthKeyInput!) {
          bindKey(newKey: $newKey) {
            ${gqlShadowKeyFields}
          }
        }
      `,
      variables: {
        newKey
      }
    });
  }, null);

  if (result?.data?.bindKey) {
    const shadowKey = await ShadowKey.fromJson(result?.data?.bindKey);
    logger.log("keyring", "Key bound successfully");
    return shadowKey;
  }
  else {
    return null;
  }
}

/**
 * Uses unlock authorization keys provided by the user (password, passkey) to try to unlock
 * the master key on the server. If successful, this decrypts user's master key on the server
 * side for a few minutes (memory cache) and allows calling other master-key related apis such as
 * list credentials, create identity, etc.
 */
export async function unlockMasterKey(authKey: AuthKeyInput): Promise<boolean> {
  logger.log("security", "Trying to unlock master key");

  const result = await withCaughtAppException(() => {
    return getApolloClient().mutate<{ auth: boolean }>({
      mutation: gql`
          mutation bindKey($authKey: AuthKeyInput!) {
            auth(authKey: $authKey)
          }
        `,
      variables: {
        authKey
      }
    });
  }, null);

  if (result?.data?.auth) {
    logger.log("security", "Master key unlocked successfully");
    return true;
  }
  else {
    return false;
  }
}

export async function unlockPasskey(): Promise<boolean> {
  logger.log("Keyring", "start unlock passkey...")
  const challengeInfo = await getPasskeyChallenge()
  const infos = await pkCredentialCreationOptions(challengeInfo)
  // true: Autofill account password will report an error
  const attResp = await startAuthentication(infos[0], false)
  const authKey = {
    type: ShadowKeyType.WEBAUTHN,//-7
    keyId: attResp.id,
    key: JSON.stringify(attResp),
    challengeId: challengeInfo.id,
  };
  logger.log("Keyring", "start unlock passkey, attResp: ", attResp);
  return await unlockMasterKey(authKey);
}

export async function getPasskeyChallenge(): Promise<ChallengeEntity> {
  logger.log("passkey", "get challenge to generate passkey");
  const data = await withCaughtAppException(() => {
    return getApolloClient().query<{}>({
      query: gql`
      query GenerateChallenge {
        generateChallenge{
          id,
          content
        }
    }
    `,
      fetchPolicy: "network-only",
      variables: {}
    });
  });

  logger.log("verifyAuthKey", "getPasskeyChallenge: ", data);

  if (data) {
    const id = (data as any).data?.generateChallenge.id
    const content = (data as any).data?.generateChallenge.content
    const challengeInfo: ChallengeEntity = {
      id: id,
      content: content,
    };
    return challengeInfo
  } else {
    throw new Error('Can not get challenge by generateChallenge api.');
  }
}

export async function pkCredentialCreationOptions(challengeInfo: ChallengeEntity): Promise<[PublicKeyCredentialRequestOptionsJSON, PublicKeyCredentialCreationOptionsJSON]> {
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
