/**
 * Service responsible to manage device password and passkey bindings, and crypto operations related to
 * securing the access to user accounts's encrypted information on the server side.
 */
import { gql } from "@apollo/client";
import { gqlShadowKeyFields } from "@graphql/shadow-key.fields";
import { ChallengeEntity } from "@model/shadow-key/challengeEntity";
import { ShadowKey } from "@model/shadow-key/shadow-key";
import { ShadowKeyDTO } from "@model/shadow-key/shadow-key.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { AuthKeyInput } from "./auth-key.input";

/**
 * Internal shared method to bind passkey or password.
 */
export async function bindKey(newKey: AuthKeyInput): Promise<ShadowKey> {
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
          mutation auth($authKey: AuthKeyInput!) {
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