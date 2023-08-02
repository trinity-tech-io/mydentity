// Separated from the service to reduce circular dependencies
import { User } from "@model/user/user";
import { BehaviorSubject } from "rxjs";

export const authUser$ = new BehaviorSubject<User>(null);

export function getActiveUser(): User {
  return authUser$.value;
}
