import { gql } from "@apollo/client";
import { graphQLProfileFields } from "@graphql/profile.fields";
import { graphQLPublicUserFields } from "@graphql/user.fields";
import { ProfileEntry } from "@model/user/features/profile/profile-entry";
import { ProfileEntryDto } from "@model/user/features/profile/profile-entry.dto";
import { User } from "@model/user/user";
import { UserDTO } from "@model/user/user.dto";
import { activityService } from "@services/activity/activity.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import Queue from "promise-queue";
import { authUser$, getActiveUser } from "./user.events";

const fetchUserQueue = new Queue(1); // Execute user retrieval from the backend one by one to avoid duplicates

export async function userServiceInit() { }

/**
 * Store the authenticated user to local storage, for future use
 */
export async function saveAuthenticatedUser(json: UserDTO): Promise<void> {
  localStorage.setItem("authenticated_user", JSON.stringify(json));
  authUser$.next(await User.fromJson(json) as User);
}

export async function getSelfUser() {
  const userStr = localStorage.getItem("authenticated_user");
  if (!userStr)
    return null;

  return await User.fromJson(JSON.parse(userStr)) as User;
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
    logger.log("users", "Fetching self user profile");

    if (curToken) {
      // update for apollo client
      localStorage.setItem("access_token", curToken);
    }
    if (refreshToken)
      localStorage.setItem("refresh_token", refreshToken);

    const { data } = await getApolloClient().query<{ getSelfUser: UserDTO }>({
      query: gql`
        query GetSelfUser {
          getSelfUser { ${graphQLPublicUserFields} }
        }
      `
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

      logger.log("users", "Self user:", user);

      return user;
    }

    throw new Error('no data got from getSelfUser()');
  });
}

export async function fetchUserProfile(userId: string): Promise<ProfileEntry[]> {
  return activityService.runActivity(async () => {
    const { data } = await getApolloClient().query<{ userProfile: ProfileEntryDto[] }>({
      query: gql`
      query FetchUserProfile ($userId: String!) {
        userProfile (userId: $userId) {
          ${graphQLProfileFields}
        }
      }
    `,
      variables: {
        userId
      }
    });

    if (data && data.userProfile) {
      const profile = data.userProfile.map(n => ProfileEntry.fromJson(n));
      return profile;
    }
  })
}

/**
 * Initiates a user authentication by email address. This sends a magic auth link by email
 * and user needs to click that link to finalize the authentication.
 */
export async function authenticateWithEmailAddress(emailAddress: string): Promise<void> {
  logger.log("user", "Sending request to authentication by email");

  await getApolloClient().mutate<{}>({
    mutation: gql`
      mutation RequestEmailAuthentication($emailAddress: String!) {
        requestEmailAuthentication(emailAddress: $emailAddress) { success }
      }
    `,
    variables: { emailAddress }
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
    return fetchSelfUser(curAccessToken);
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
  authUser$.next(null);
}

/**
 * Checks the given temporary authentication key and signs the user in if successful
 */
export async function checkEmailAuthenticationKey(authKey: string): Promise<boolean> {
  logger.log("user", "Checking temporary authentication key");

  try {
    const { data } = await getApolloClient().mutate<{
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

  const { data } = await getApolloClient().mutate({
    mutation: gql`
      mutation RefreshToken($token: String!) {
        refreshToken(refreshTokenInput: { refreshToken: $token }) { accessToken }
      }
    `,
    variables: {
      token
    }
  });

  if (data) {
    logger.log("graphql", "Refresh token", data.refreshToken);

    const { accessToken } = data.refreshToken;

    // Only update active access token.
    localStorage.setItem("access_token", accessToken);

    // Notify user access token changed, websocket will recreated.
    authUser$.next(getActiveUser());

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
