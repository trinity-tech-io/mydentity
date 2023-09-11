// Separated from the service to reduce circular dependencies
import { User } from "@model/user/user";
import { LazyBehaviorSubject } from "@utils/lazy-behavior-subject";

export const authUser$ = new LazyBehaviorSubject<User>(null, async () => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem("authenticated_user");
    if (!userStr)
      return null;

    return User.fromJson(JSON.parse(userStr));
  }
});

export function getActiveUser(): User {
  return authUser$.value;
}

export function getAccessToken(): string {
  return localStorage.getItem('access_token');
}
