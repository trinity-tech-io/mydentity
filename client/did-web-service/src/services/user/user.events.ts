// Separated from the service to reduce circular dependencies
import { User } from "@model/user/user";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";

export const authUser$ = new AdvancedBehaviorSubject<User>(null, async () => {
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
