import { logger } from "@services/logger";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { gql } from "@apollo/client";
import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";
import { ChallengeEntity } from "@model/shadow-key/challengeEntity";
import { AuthKeyInput } from "@model/shadow-key/authKeyInput";
import { startAuthentication, startRegistration } from "@simplewebauthn/browser";

import {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/typescript-types';
/**
 * Service responsible to manage device password and passkey bindings, and crypto operations related to
 * securing the access to user accounts's encrypted information on the server side.
 */

/**
 * Binds the current device to the user account. Binding a device means creating a keypair on the
 * device, either through passkey or in the local storage. The keypair is stored on the client side
 * (server doesn't store it) and used by the server temporarily to generate a shadow copy of the root
 * user account key.
 */

const rpId = process.env.WEBAUTHN_RELYING_PARTY
const userName = 'test name' // TODO: replace 
const rpName = 'DID web app' // TODO: replace 

export async function passkeyProgress() {
  const challengeInfo = await getPasskeyChallenge()
  const infos = await pkCredentialCreationOptions(challengeInfo)
  const attResp = await startRegistration(infos[1])
  console.log("infos1: ", infos[1])
  console.log("attResp: ", JSON.stringify(attResp, null, 2))
  const newKey = {
    type: ShadowKeyType.WEBAUTHN, //'ED25519',
    keyId: attResp.id,
    key: JSON.stringify(attResp),
    challengeId: challengeInfo.id,
  };
  await bindKey(newKey)
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
  return await unlockAuthKey(authKey)
}

export async function unlockAuthKey(authKey: AuthKeyInput): Promise<boolean> {
  logger.log("Keyring", "start verify authKey, input: ", authKey);
  const result = await withCaughtAppException(() => {
    return getApolloClient().mutate<{}>({
      mutation: gql`
      mutation Auth($authKey: AuthKeyInput!) {
        auth(authKey: $authKey)
      }
    `,
      variables: {
        authKey
      }
    });
  });
  logger.log("verifyAuthKey", "verify authKey result: ", result);
  if (result) {
    const data = (result as any).data?.bindKey
    logger.log("verifyAuthKey", "verify authKey Success: ", data);

    return data
  } else {
    throw new Error('Can not verify authKey by verifyAuthKey api.');
  }
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

export async function bindKey(newKey: AuthKeyInput): Promise<boolean> {
  logger.log("bindPasskey", "start bind passkey, input: ", newKey);
  const result = await withCaughtAppException(() => {
    return getApolloClient().mutate<{}>({
      mutation: gql`
      mutation bindKey($newKey: AuthKeyInput!) {
        bindKey(newKey: $newKey){
          keyId
          key
          type
          createdAt
          updatedAt
        }
      }
    `,
      variables: {
        newKey
      }
    });
  });
  logger.log("Keyring", "Bind passkey result: ", result);
  if (result) {
    const data = (result as any).data?.bindKey
    logger.log("Keyring", "Bind passkey Success: ", data);

    return data
  } else {
    throw new Error('Can not Bind passkey by bindKey api.');
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

export function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function uint8ArrayToHex(uint8Array: any): string {
  let hexString = '';
  for (let i = 0; i < uint8Array.length; i++) {
    const hex = uint8Array[i].toString(16).padStart(2, '0');
    hexString += hex;
  }
  return hexString;
}

