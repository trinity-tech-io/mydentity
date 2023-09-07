// Separated from the service to reduce circular dependencies
import { User } from "@model/user/user";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";

const _authUser$ = new LazyBehaviorSubjectWrapper<User>(null, async () => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem("authenticated_user");
    if (!userStr)
      return null;

    return User.fromJson(JSON.parse(userStr));
  }
});

export function authUser$() {
  return _authUser$.getSubject();
}

export function getActiveUser(): User {
  return authUser$().value;
}

export function getAccessToken(): string {
  return localStorage.getItem('access_token');
}
