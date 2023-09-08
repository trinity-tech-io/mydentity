// Cache to make sure we never reinstanciate the same user (same id)
// multiple times, as this would result in various parts of the app having various

import { ObjectCache } from "@utils/caches/object-cache";
import { User } from "./user";

// user instances of the same user, thus not receiving change events.
export const usersCache = new ObjectCache<User>();
