// Separated from the service to reduce circular dependencies
import { User } from "@model/user/user";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { BehaviorSubject } from "rxjs";

/**
 * Whether the authenticated user status has been checked/restored or not.
 * This is used to differenciate a "null" authUser that means "not authenticated"
 * from a "null" that means "not yet restored/checked".
 */
export const authUserReady$ = new BehaviorSubject(false);

export const authUser$ = new AdvancedBehaviorSubject<User>(null, async () => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem("authenticated_user");
    if (!userStr) {
      authUserReady$.next(true); // User status has been checked
      return null;
    }

    const user = await User.fromJson(JSON.parse(userStr));
    authUserReady$.next(true); // User status has been checked
    return user;
  }
});

export function getActiveUser(): User {
  return authUser$.value;
}

export function getAccessToken(): string {
  return localStorage.getItem('access_token');
}
