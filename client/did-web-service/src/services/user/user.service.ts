import { gql } from "@apollo/client";
import { graphQLPublicUserFields } from "@graphql/user.fields";
import { ChallengeEntity } from "@model/shadow-key/challenge-entity";
import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";
import { User } from "@model/user/user";
import { UserDTO } from "@model/user/user.dto";
import { checkNewAccessTokenForBrowserId } from "@services/browser.service";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { getPasskeyChallenge } from "@services/keyring/keyring.service";
import { logger } from "@services/logger";
import { startAuthentication } from "@simplewebauthn/browser";
import { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/typescript-types";
import Queue from "promise-queue";
import { LoggedUserOutput } from "./logged-user.output";
import { SignUpInput } from "./sign-up.input";
import { authUser$, getActiveUser } from "./user.events";

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
 * @param refreshToken current refresh token.
 */
export async function fetchSelfUser(curToken?: string, refreshToken?: string): Promise<User> {
  return fetchUserQueue.add(async () => {
    logger.log("users", "Fetching self user profile");

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
    return getApolloClient().mutate<unknown>({
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
 * Method called after a successful authentication, with new access and refresh tokens from the backend.
 * those tokens are saved as new active tokens to identity the active user and call APIs later.
 */
export async function updateUserByToken(accessToken: string, refreshToken: string) {
  const curAccessToken = localStorage.getItem('access_token');
  const curRefreshToken = localStorage.getItem('refresh_token');
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);

  try {
    const user = await fetchSelfUser(accessToken);

    await checkNewAccessTokenForBrowserId(accessToken);

    return user;
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
    logger.warn("user", "Exception while checking temporary auth key. Key expired?");
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
    logger.log("user", "Refresh token", data.refreshToken);

    const { accessToken } = data.refreshToken;

    // Only update active access token.
    localStorage.setItem("access_token", accessToken);

    await checkNewAccessTokenForBrowserId(accessToken);

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

export function isSignedIn() {
  const accessToken = localStorage.getItem('access_token');
  return accessToken && accessToken !== '';
}

function pkCredentialCreationOptions(challengeInfo: ChallengeEntity): PublicKeyCredentialRequestOptionsJSON {
  const rpId = process.env.NEXT_PUBLIC_RP_ID
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

  return publicKeyCredentialCreationOptions
}

export async function authenticateWithPasskey(): Promise<boolean> {
  logger.log("user", "Authenticating with passkey");

  const challengeInfo = await getPasskeyChallenge()
  const infos = pkCredentialCreationOptions(challengeInfo)
  // true: Autofill account password will report an error
  const attResp = await startAuthentication(infos, false)
  const authKey = {
    type: ShadowKeyType.WEBAUTHN,//-7
    keyId: attResp.id,
    key: JSON.stringify(attResp),
    challengeId: challengeInfo.id,
  };

  const result = await withCaughtAppException(() => {
    return getApolloClient().query<{
      signInWithPasskey: {
        accessToken: string;
        refreshToken: string;
      }
    }>({
      query: gql`
        query signInWithPasskey ($authKey: AuthKeyInput!) {
          signInWithPasskey (authKey: $authKey) {
            accessToken,
            refreshToken
          }
        }
      `,
      variables: {
        authKey: authKey,
      },
      fetchPolicy: "network-only" // No apollo cache, force fetch
    });
  });

  if (result?.data?.signInWithPasskey?.accessToken) {
    const accessToken = result?.data?.signInWithPasskey?.accessToken;
    const refreshToken = result?.data?.signInWithPasskey?.refreshToken;
    await updateUserByToken(accessToken, refreshToken);
    return true;
  } else {
    logger.error("Failed to sign in with passkey.");
    return false;
  }
}

