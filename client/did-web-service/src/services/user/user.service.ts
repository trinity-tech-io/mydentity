import { gql } from "@apollo/client";
import { graphQLPublicUserFields } from "@graphql/user.fields";
import { User } from "@model/user/user";
import { UserDTO } from "@model/user/user.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import Queue from "promise-queue";
import { LoggedUserOutput } from "./logged-user.output";
import { SignUpInput } from "./sign-up.input";
import { authUser$, getActiveUser } from "./user.events";
import { PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/typescript-types';
import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import { AuthKeyInput } from "./auth-key.input";
import { ChallengeEntity } from "@model/shadow-key/challengeEntity";
import { ShadowKey } from "@model/shadow-key/shadow-key";
import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";
import { ShadowKeyDTO } from "@model/shadow-key/shadow-key.dto";
import { gqlShadowKeyFields } from "@graphql/shadow-key.fields";

const fetchUserQueue = new Queue(1); // Execute user retrieval from the backend one by one to avoid duplicates

export async function userServiceInit() { }

export async function signUp(name: string): Promise<boolean> {
  logger.log("user", "Sign up user, creating new user entry");

  const input: SignUpInput = { name };

  const response = await withCaughtAppException(() => {
    return getApolloClient().mutate<{ signUp: LoggedUserOutput }>({
      mutation: gql`
        mutation SignUp($input: SignUpInput!) {
          signUp(input: $input) { accessToken refreshToken }
        }
      `,
      variables: { input }
    });
  });

  if (response?.data && response.data.signUp) {
    const { accessToken, refreshToken } = response.data.signUp;
    void updateUserByToken(accessToken, refreshToken);
    return true;
  }
  else {
    // TODO: print error
    logger.error('user', 'failed to sign up.');
    return false;
  }
}

/**
 * Store the authenticated user to local storage, for future use
 */
async function saveAuthenticatedUser(json: UserDTO): Promise<void> {
  localStorage.setItem("authenticated_user", JSON.stringify(json));
  authUser$().next(await User.fromJson(json) as User);
}

export async function saveAuthUser(user: User) {
  return saveAuthenticatedUser(user.toJson());
}

/**
 * Based on the authenticated user id, fetch the whole user profile and
 * updates the active user state.
 *
 * @param curToken current access token for user data transferring.
 * @param curToken current refresh token.
 */
export async function fetchSelfUser(curToken?: string, refreshToken?: string): Promise<User> {
  return fetchUserQueue.add(async () => {
    logger.log("users", "Fetching self user profile", curToken, refreshToken);

    if (curToken) {
      // update for apollo client
      localStorage.setItem("access_token", curToken);
    }
    if (refreshToken)
      localStorage.setItem("refresh_token", refreshToken);

    const { data } = await withCaughtAppException(() => {
      return getApolloClient().query<{ getSelfUser: UserDTO }>({
        query: gql`
        query GetSelfUser {
          getSelfUser { ${graphQLPublicUserFields} }
        }
      `
      });
    });

    if (data) {
      const rawUser = data.getSelfUser;

      // Build the real user model based on its json representation
      const user = await User.fromJson(rawUser) as User;

      // if (curToken && !user.isTemporary() && getActiveUser() && getActiveUser().isTemporary()
      //     && localStorage.getItem('access_token') !== curToken) { // why???
      //   // only transfer from temp user to real user.
      //   await getApolloClient().mutate<{ user: UserJson }>({
      //     mutation: gql`
      //     mutation TransferUserContent($token: String!) {
      //       transferUserContent(transferUserContentInput: { accessToken: $token }) { ${graphQLSelfUserFields} }
      //     }
      //   `,
      //     variables: {
      //       token: curToken
      //     }
      //   });
      // }

      // Save this new authenticated user's json to local storage
      await saveAuthenticatedUser(rawUser);

      logger.log("users", "user from fetchSelfUser():", user);

      return user;
    }

    throw new Error('no data got from fetchSelfUser()');
  });
}

/**
 * Initiates a user authentication by email address. This sends a magic auth link by email
 * and user needs to click that link to finalize the authentication.
 */
export async function authenticateWithEmailAddress(emailAddress: string): Promise<void> {
  logger.log("user", "Sending request to authentication by email");

  await withCaughtAppException(() => {
    return getApolloClient().mutate<{}>({
      mutation: gql`
      mutation RequestEmailAuthentication($emailAddress: String!) {
        requestEmailAuthentication(emailAddress: $emailAddress) { success }
      }
    `,
      variables: { emailAddress }
    });
  });
}

/**
 * from email auth
 */
export function updateUserByToken(accessToken: string, refreshToken: string) {
  const curAccessToken = localStorage.getItem('access_token');
  const curRefreshToken = localStorage.getItem('refresh_token');
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);

  try {
    return fetchSelfUser(accessToken);
  } catch (e) {
    logger.error('userService', 'failed to fetch user info.: ', e);
    localStorage.setItem("access_token", curAccessToken);
    localStorage.setItem("refresh_token", curRefreshToken);
  }
}

export function signOut() {
  localStorage.removeItem("authenticated_user")
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  authUser$().next(null);
}

/**
 * Checks the given temporary authentication key and signs the user in if successful
 */
export async function checkEmailAuthenticationKey(authKey: string): Promise<boolean> {
  logger.log("user", "Checking temporary authentication key");

  try {
    const { data } = await withCaughtAppException(() => {
      return getApolloClient().mutate<{
        checkEmailAuthentication: {
          accessToken: string;
          refreshToken: string;
        }
      }>({
        mutation: gql`
        mutation CheckEmailAuthentication($authKey: String!) {
          checkEmailAuthentication(authKey: $authKey) { accessToken refreshToken }
        }
      `,
        variables: { authKey }
      });
    });

    if (data && data.checkEmailAuthentication) {
      const { accessToken, refreshToken } = data.checkEmailAuthentication;
      await updateUserByToken(accessToken, refreshToken);
      return true;
    }
    else {
      return false;
    }
  }
  catch (e) {
    // Probably a 401 error
    logger.warn("auth", "Exception while checking temporary auth key. Key expired?");
    return null;
  }
}

export async function refreshToken(): Promise<string> {
  const token = localStorage.getItem('refresh_token');
  if (!token) {
    onRefreshTokenFailed();
    return;
  }

  const { data } = await withCaughtAppException(() => {
    return getApolloClient().mutate({
      mutation: gql`
        mutation RefreshToken($token: String!) {
          refreshToken(refreshTokenInput: { refreshToken: $token }) { accessToken }
        }
      `,
      variables: {
        token
      }
    });
  });

  if (data) {
    logger.log("graphql", "Refresh token", data.refreshToken);

    const { accessToken } = data.refreshToken;

    // Only update active access token.
    localStorage.setItem("access_token", accessToken);

    // Notify user access token changed, websocket will recreated.
    authUser$().next(getActiveUser());

    return accessToken;
  } else {
    throw new Error('Can not get access token by refresh token.');
  }
}

export function onRefreshTokenFailed() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("authenticated_user");
  // TODO: go to sign-out page.
  window.location.href = '/dashboard';
}

export function isLogined() {
  const accessToken = localStorage.getItem('access_token');
  return accessToken && accessToken !== '';
}

export async function bindPasskey(userName: string): Promise<ShadowKey> {
  logger.log("User", "Binding passkey");

  const challengeInfo = await getPasskeyChallenge()
  console.log("User: challengeInfo=", challengeInfo)
  console.log("User: name = ", userName)

  const infos = await pkCredentialCreationOptions(challengeInfo, userName)
  console.log("User: ", challengeInfo)
  console.log("infos1: ", infos[1])
  const attResp = await startRegistration(infos[1])

  console.log("infos1: ", infos[1])
  console.log("attResp: ", JSON.stringify(attResp, null, 2))

  const newKey = {
    type: ShadowKeyType.WEBAUTHN,
    keyId: attResp.id,
    key: JSON.stringify(attResp),
    challengeId: challengeInfo.id,
  };
  return await bindKey(newKey)
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
  const infos = await pkCredentialCreationOptions(challengeInfo, null)
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

export async function pkCredentialCreationOptions(challengeInfo: ChallengeEntity, userName?: string): Promise<[PublicKeyCredentialRequestOptionsJSON, PublicKeyCredentialCreationOptionsJSON]> {
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

