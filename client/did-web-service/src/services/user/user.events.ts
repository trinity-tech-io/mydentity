// Separated from the service to reduce circular dependencies
import { User } from "@model/user/user";
import {LazyBehaviorSubjectWrapper} from "@utils/lazy-behavior-subject";

const _authUser$ = new LazyBehaviorSubjectWrapper<User>(null, async () => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem("authenticated_user");
    // console.log(`>>>>>> load active user: ${userStr}`);
    if (!userStr)
      return null;

    const user = await User.fromJson(JSON.parse(userStr));
    authUser$().next(user); // MUST do this.
    return user;
  }
});

export function authUser$() {
  return _authUser$.getSubject();
}

export function getActiveUser(): User {
  return authUser$().value;
}
