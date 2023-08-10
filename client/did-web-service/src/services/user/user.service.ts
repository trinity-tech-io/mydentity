import { User } from "@model/user/user";
import { authUser$ } from "./user.events";
import Queue from "promise-queue";
import {logger} from "@services/logger";
import {getApolloClient} from "@services/graphql.service";
import {UserDTO} from "@model/user/user.dto";
import {gql} from "@apollo/client";
import {graphQLPublicUserFields} from "@graphql/user.fields";
import {ProfileEntry} from "@model/user/features/profile/profile-entry";
import {activityService} from "@services/activity/activity.service";
import {graphQLProfileFields} from "@graphql/profile.fields";
import {ProfileEntryDto} from "@model/user/features/profile/profile-entry.dto";

const fetchUserQueue = new Queue(1); // Execute user retrieval from the backend one by one to avoid duplicates

export async function userServiceInit() {
  // TEMPORARY BEFORE REAL USER AUTH IMPLEMENTATION
  const fakeUser = await User.fromJson({
    id: "abcd",
    createdAt: "2000-10-31T01:30:00.000-05:00"
  });
  authUser$.next(fakeUser);
}

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
 */
export async function fetchSelfUser(curToken?: string): Promise<User> {
  return fetchUserQueue.add(async () => {
    logger.log("users", "Fetching self user profile");

    if (curToken) {
      // update for apollo client
      localStorage.setItem("access_token", curToken);
    }

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
