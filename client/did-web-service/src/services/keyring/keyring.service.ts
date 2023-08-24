import { logger } from "@services/logger";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { gql } from "@apollo/client";
import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";
import { ChallengeEntity } from "@model/shadow-key/challengeEntity";
import { BindKeyInput } from "@model/shadow-key/bindKeyInput";
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

const userName = 'test name' // TODO: replace 
const rpId = 'localhost' // TODO: replace 
const rpName = 'DID web app' // TODO: replace 

export async function passkeyProgress() {
  const infos = await pkCredentialCreationOptions()
  const attResp = await startRegistration(infos[2])
  console.log("attResp: ", JSON.stringify(attResp, null, 2))
  const input = {
    type: ShadowKeyType.WEBAUTHN, //'ED25519',
    keyId: attResp.id,
    key: JSON.stringify(attResp),
    challengeId: infos[1].id,
    authType: null,
    authKeyId: null,
    authKey: null
  };
  await bindKey(input);
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
      variables: {}
    });
  });

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

export async function bindKey(input: BindKeyInput): Promise<boolean> {
  logger.log("bindPasskey", "start bind passkey");
  const result = await withCaughtAppException(() => {
    return getApolloClient().mutate<{}>({
      mutation: gql`
      mutation bindKey($input: BindKeyInput!) {
        bindKey(input: $input){
          keyId
          key
          type
          createdAt
          updatedAt
        }
      }
    `,
      variables: {
        input
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

export async function verifyAuthKey(input: AuthKeyInput): Promise<boolean> {
  logger.log("Keyring", "start verify authKey...");
  const infos = await pkCredentialCreationOptions()
  // true: Autofill account password will report an error
  startAuthentication(infos[0], false)
    .then(async asseResp => {
      logger.log("Keyring: ", asseResp);
      debugger;
    });
  const result = await withCaughtAppException(() => {
    return getApolloClient().mutate<{}>({
      mutation: gql`
      mutation verifyAuthKey($input: AuthKeyInput!) {
        verifyAuthKey(input: $input)
      }
    `,
      variables: {
        input
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

export async function pkCredentialCreationOptions(): Promise<[PublicKeyCredentialRequestOptionsJSON, ChallengeEntity, PublicKeyCredentialCreationOptionsJSON]> {
  const challengeInfo = await getPasskeyChallenge()
  const userId = userName

  const challengeEncoder = new TextEncoder()
  const challengeUint8Array = challengeEncoder.encode(challengeInfo.content)
  const userIdEncoder = new TextEncoder()
  const userIdUint8Array = userIdEncoder.encode(userId)
  // TO AUTH PASSKEY
  const publicKeyCredentialCreationOptions: PublicKeyCredentialRequestOptionsJSON = {
    challenge: Buffer.from(challengeUint8Array).toString(),
    allowCredentials: [{
      id: "",
      type: "public-key",
      transports: ["internal"]
    }],
    rpId: "localhost",
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
  // Authentication Options
  return [publicKeyCredentialCreationOptions, challengeInfo, pkCredentialCreationOptionsJSON]
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

