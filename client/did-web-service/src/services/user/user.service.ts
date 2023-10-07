import { gql } from "@apollo/client";
import { graphQLPublicUserFields } from "@graphql/user.fields";
import { ChallengeEntity } from "@model/shadow-key/challenge-entity";
import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";
import { User } from "@model/user/user";
import { UserDTO } from "@model/user/user.dto";
import { checkNewAccessTokenForBrowserKey } from "@services/browser.service";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { identityService } from "@services/identity/identity.service";
import { getPasskeyChallenge } from "@services/keyring/keyring.service";
import { logger } from "@services/logger";
import { MsSignInInput } from "@services/user/ms-sign-in.input";
import { startAuthentication } from "@simplewebauthn/browser";
import { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/typescript-types";
import Queue from "promise-queue";
import { LoggedUserOutput } from "./logged-user.output";
import { SignUpInput } from "./sign-up.input";
import { authUser$, getActiveUser } from "./user.events";
import { GoogleSignInInput } from "@services/user/google-sign-in.input";
import { MsBindEmailInput } from "@services/user/ms-bind-email.input";
import { GoogleBindEmailInput } from "@services/user/google-bind-email.input";
import { LinkedinSignInInput } from "@services/user/linkedin-sign-in.input";
import { LinkedinBindEmailInput } from "@services/user/linkedin-bind-email.input";

const fetchUserQueue = new Queue(1); // Execute user retrieval from the backend one by one to avoid duplicates

export async function signUp(name: string): Promise<User> {
  logger.log("user", "Sign up user, creating new user entry");

  const input: SignUpInput = { name };

  const response = await withCaughtAppException(async () => {
    return (await getApolloClient()).mutate<{ signUp: LoggedUserOutput }>({
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
    return updateUserByToken(accessToken, refreshToken);
  }
  else {
    // TODO: print error
    logger.error('user', 'failed to sign up.');
    return null;
  }
}

/**
 * Store the authenticated user to local storage, for future use
 */
async function saveAuthenticatedUser(json: UserDTO): Promise<void> {
  localStorage.setItem("authenticated_user", JSON.stringify(json));
  authUser$.next(await User.fromJson(json) as User);
}

export async function saveAuthUser(user: User): Promise<void> {
  return saveAuthenticatedUser(user.toJson());
}

/**
 * Based on the authenticated user id, fetch the whole user profile and
 * updates the active user state.
 */
export async function fetchSelfUser(): Promise<User> {
  return fetchUserQueue.add(async () => {
    logger.log("users", "Fetching self user profile");

    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).query<{ getSelfUser: UserDTO }>({
        query: gql`
          query GetSelfUser {
            getSelfUser { ${graphQLPublicUserFields} }
          }
        `
      });
    });

    if (result?.data?.getSelfUser) {
      // Build the real user model based on its json representation
      const rawUser = result?.data?.getSelfUser;
      const user = await User.fromJson(rawUser);

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

  await withCaughtAppException(async () => {
    return (await getApolloClient()).mutate<unknown>({
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
export async function updateUserByToken(accessToken: string, refreshToken: string): Promise<User> {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);

  try {
    const user = await fetchSelfUser();

    await checkNewAccessTokenForBrowserKey(accessToken);

    logger.log("user", "Updated user by token, got user:", user);

    return user;
  } catch (e) {
    logger.error('userService', 'failed to fetch user info.: ', e);
    signOut();
    return null;
  }
}

export function signOut(): void {
  logger.log("user", "Signing out from current user. Deleting user and access tokens");

  localStorage.removeItem("authenticated_user")
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  authUser$.next(null);
  identityService.setActiveIdentity(null);
}

/**
 * Checks the given temporary authentication key and signs the user in if successful
 */
export async function checkRawEmailAuthenticationKey(authKey: string): Promise<boolean> {
  logger.log("user", "Checking temporary authentication key");

  try {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{
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

    if (result?.data?.checkEmailAuthentication) {
      const { accessToken, refreshToken } = result.data.checkEmailAuthentication;
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

  const result = await withCaughtAppException(async () => {
    return (await getApolloClient()).mutate<{ refreshToken: { accessToken: string } }>({
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

  if (result?.data?.refreshToken) {
    logger.log("user", "Got refreshed access token");

    const { accessToken } = result.data.refreshToken;

    // Only update active access token.
    localStorage.setItem("access_token", accessToken);

    await checkNewAccessTokenForBrowserKey(accessToken);

    // Notify user access token changed, websocket will recreated.
    authUser$.next(getActiveUser());

    return accessToken;
  } else {
    throw new Error('Can not get access token by refresh token.');
  }
}

export function onRefreshTokenFailed(): void {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("authenticated_user");
  // TODO: go to sign-out page.
  window.location.href = '/dashboard';
}

export function isSignedIn(): boolean {
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

  const result = await withCaughtAppException(async () => {
    return (await getApolloClient()).query<{
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
      }
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

// Microsoft Oauth

export async function oauthMSSignIn(code: string): Promise<User> {
  logger.log('user', 'oauth MS sign in.');

  const input: MsSignInInput = { code };

  const response = await withCaughtAppException(async () => {
    return (await getApolloClient()).mutate<{ oauthMSSignIn: LoggedUserOutput }>({
      mutation: gql`
        mutation OauthMSSignIn($input: MsSignInInput!) {
          oauthMSSignIn(input: $input) { accessToken refreshToken }
        }
      `,
      variables: { input }
    });
  });

  if (response?.data && response.data.oauthMSSignIn) {
    const { accessToken, refreshToken } = response.data.oauthMSSignIn;
    return updateUserByToken(accessToken, refreshToken);
  }
  else {
    // TODO: print error
    logger.error('user', 'failed to oauth MS sign in.');
    return null;
  }
}

export async function oauthMSBindEmail(code: string): Promise<boolean> {
  logger.log('user', 'oauth MS bind email.');

  const input: MsBindEmailInput = { code };

  const response = await withCaughtAppException(async () => {
    return (await getApolloClient()).mutate<{ oauthMSBindEmail: boolean }>({
      mutation: gql`
        mutation OauthMSBindEmail($input: MsBindEmailInput!) {
          oauthMSBindEmail(input: $input)
        }
      `,
      variables: { input }
    });
  });

  if (response?.data && response.data.oauthMSBindEmail) {
    logger.log('user', 'Oauth MS email bound successfully');
    return true;
  }
  else {
    // TODO: print error
    logger.error('user', 'failed to oauth MS bind email.');
    return false;
  }
}

// Google Oauth

export async function oauthGoogleSignIn(code: string): Promise<User> {
  logger.log('user', 'oauth Google sign in.');

  const input: GoogleSignInInput = { code };

  const response = await withCaughtAppException(async () => {
    return (await getApolloClient()).mutate<{ oauthGoogleSignIn: LoggedUserOutput }>({
      mutation: gql`
        mutation OauthGoogleSignIn($input: GoogleSignInInput!) {
          oauthGoogleSignIn(input: $input) { accessToken refreshToken }
        }
      `,
      variables: { input }
    });
  });

  if (response?.data && response.data.oauthGoogleSignIn) {
    const { accessToken, refreshToken } = response.data.oauthGoogleSignIn;
    return updateUserByToken(accessToken, refreshToken);
  }
  else {
    // TODO: print error
    logger.error('user', 'failed to oauth Google sign in.');
    return null;
  }
}

export async function oauthGoogleBindEmail(code: string): Promise<boolean> {
  logger.log('user', 'oauth Google bind email.');

  const input: GoogleBindEmailInput = { code };

  const response = await withCaughtAppException(async () => {
    return (await getApolloClient()).mutate<{ oauthGoogleBindEmail: boolean }>({
      mutation: gql`
        mutation OauthGoogleBindEmail($input: GoogleBindEmailInput!) {
          oauthGoogleBindEmail(input: $input)
        }
      `,
      variables: { input }
    });
  });

  if (response?.data && response.data.oauthGoogleBindEmail) {
    logger.log('user', 'Oauth Google email bound successfully');
    return true;
  }
  else {
    // TODO: print error
    logger.error('user', 'failed to oauth Google bind email.');
    return false;
  }
}

// Linkedin Oauth

export async function oauthLinkedinSignIn(code: string): Promise<User> {
  logger.log('user', 'oauth Linkedin sign in.');

  const input: LinkedinSignInInput = { code };

  const response = await withCaughtAppException(async () => {
    return (await getApolloClient()).mutate<{ oauthLinkedinSignIn: LoggedUserOutput }>({
      mutation: gql`
        mutation OauthLinkedinSignIn($input: LinkedinSignInInput!) {
          oauthLinkedinSignIn(input: $input) { accessToken refreshToken }
        }
      `,
      variables: { input }
    });
  });

  if (response?.data && response.data.oauthLinkedinSignIn) {
    const { accessToken, refreshToken } = response.data.oauthLinkedinSignIn;
    return updateUserByToken(accessToken, refreshToken);
  }
  else {
    // TODO: print error
    logger.error('user', 'failed to oauth Linkedin sign in.');
    return null;
  }
}

export async function oauthLinkedinBindEmail(code: string): Promise<boolean> {
  logger.log('user', 'oauth Linkedin bind email.');

  const input: LinkedinBindEmailInput = { code };

  const response = await withCaughtAppException(async () => {
    return (await getApolloClient()).mutate<{ oauthLinkedBindEmail: boolean }>({
      mutation: gql`
        mutation OauthLinkedBindEmail($input: LinkedinBindEmailInput!) {
          oauthLinkedBindEmail(input: $input)
        }
      `,
      variables: { input }
    });
  });

  if (response?.data && response.data.oauthLinkedBindEmail) {
    logger.log('user', 'Oauth Linkedin email bound successfully');
    return true;
  }
  else {
    // TODO: print error
    logger.error('user', 'failed to oauth Linkedin bind email.');
    return false;
  }
}