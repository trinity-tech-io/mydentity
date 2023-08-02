import { User } from "@model/user/user";
import { authUser$ } from "./user.events";

export async function userServiceInit() {
  // TEMPORARY BEFORE REAL USER AUTH IMPLEMENTATION
  const fakeUser = await User.fromJson({
    id: "abcd",
    createdAt: "2000-10-31T01:30:00.000-05:00"
  });
  authUser$.next(fakeUser);
}
