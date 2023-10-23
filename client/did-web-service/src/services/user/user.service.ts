import { gql } from "@apollo/client";
import { graphQLPublicUserFields } from "@graphql/user.fields";
import { AuthExceptionCode } from "@model/exceptions/exception-codes";
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
import { startAuthentication } from "@simplewebauthn/browser";
import { PublicKeyCredentialDescriptorJSON, PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/typescript-types";
import Queue from "promise-queue";
import { LoggedUserOutput } from "./logged-user.output";
import { SignUpInput } from "./sign-up.input";
import { authUser$, getActiveUser } from "./user.events";

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
export async function authenticateWithEmailAddress(emailAddress: string): Promise<{ pinCode: string }> {
  logger.log("user", "Sending request to authentication by email");

  const result = await withCaughtAppException(async () => {
    return (await getApolloClient()).mutate<{ requestEmailAuthentication: { success: boolean; pinCode?: string; } }>({
      mutation: gql`
      mutation RequestEmailAuthentication($emailAddress: String!) {
        requestEmailAuthentication(emailAddress: $emailAddress) {
          success pinCode
        }
      }
    `,
      variables: { emailAddress }
    });
  });

  if (result?.data?.requestEmailAuthentication?.success) {
    return {
      pinCode: result.data.requestEmailAuthentication.pinCode
    }
  }
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
export async function checkTemporaryAuthenticationKey(authKey: string, pinCode: string): Promise<boolean> {
  logger.log("user", "Checking temporary authentication key");

  const result = await withCaughtAppException(async () => {
    return (await getApolloClient()).mutate<{
      checkTemporaryAuthentication: {
        accessToken: string;
        refreshToken: string;
      }
    }>({
      mutation: gql`
          mutation CheckTemporaryAuthentication($authKey: String!, $pinCode: String!) {
            checkTemporaryAuthentication(authKey: $authKey, pinCode: $pinCode) { accessToken refreshToken }
          }
        `,
      variables: { authKey, pinCode }
    });
  }, null, [
    AuthExceptionCode.InvalidPINCode,
    AuthExceptionCode.InexistingAuthKey
  ]);

  if (result?.data?.checkTemporaryAuthentication) {
    const { accessToken, refreshToken } = result.data.checkTemporaryAuthentication;
    await updateUserByToken(accessToken, refreshToken);
    return true;
  }
  else {
    return false;
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

function unlockPasskeyOptions(credentialId: string, challengeInfo: ChallengeEntity): PublicKeyCredentialRequestOptionsJSON {
  const rpId = process.env.NEXT_PUBLIC_RP_ID
  const allowCredentials = getPasskeyPublicKeyCredentialWithUserName(credentialId)
  const publicKeyCredentialCreationOptions: PublicKeyCredentialRequestOptionsJSON = {
    challenge: challengeInfo.content,
    allowCredentials: allowCredentials,
    rpId: rpId,
    userVerification: "preferred",
    timeout: 30000
  };

  return publicKeyCredentialCreationOptions
}

/**
 * Get the PublicKeyCredentialDescriptorJSON
*/
function getPasskeyPublicKeyCredentialWithUserName(credentialId: string): PublicKeyCredentialDescriptorJSON[] {
  return [{
    id: credentialId,
    type: 'public-key',
    transports: ['internal'],
  }]
}

/**
 * Get all local passkey users.
*/
export function getPasskeyAllUsers(): { name: string, credentialId: string }[] {
  const passkey = process.env.NEXT_PUBLIC_PASSKEY_USERS
  const passkeyUsersString = localStorage.getItem(passkey);
  const passkeyUsers: { name: string, credentialId: string }[] = passkeyUsersString ? JSON.parse(passkeyUsersString) : [];
  console.log("TODO: REMOVE: passkeyUsers: ", passkeyUsers)
  return passkeyUsers
}

export async function authenticateWithPasskey(credentialId: string): Promise<boolean> {
  logger.log("user", "Authenticating with passkey");

  const challengeInfo = await getPasskeyChallenge()
  const unlockOptions = unlockPasskeyOptions(credentialId, challengeInfo)
  // true: Autofill account password will report an error
  // TODO: REMOVE
  console.log("authenticateWithPasskey>>>>>>>>>>>> unlockOptions: ", unlockOptions)
  const authenResponse = await startAuthentication(unlockOptions, false)
  // TODO: REMOVE
  console.log("authenticateWithPasskey>>>>>>>>>>>> authenResponse: ", authenResponse)
  const authKey = {
    type: ShadowKeyType.WEBAUTHN,//-7
    keyId: authenResponse.id,
    key: JSON.stringify(authenResponse),
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

  // TODO: REMOVE
  console.log("authenticateWithPasskey>>>>>>>>>>>> result: ", result)
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