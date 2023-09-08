// Cache to make sure we never reinstanciate the same object (same id)
// multiple times, as this would result in various parts of the app having various
// instances of the same actual object, thus not receiving change events.

import { ObjectCache } from "@utils/caches/object-cache";
import { Browser } from "./browser";

export const browserCache = new ObjectCache<Browser>();
