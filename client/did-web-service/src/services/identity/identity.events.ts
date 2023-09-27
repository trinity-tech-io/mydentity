import type { Identity } from "@model/identity/identity";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { BehaviorSubject, filter } from "rxjs";

export const activeIdentity$ = new BehaviorSubject<RegularIdentity>(null);

export function getActiveIdentity(): Identity {
  return activeIdentity$.value;
}

/**
 * Awaits until an active identity exists (not null)
 */
export function awaitActiveIdentity(): Promise<Identity> {
  return new Promise(resolve => {
    activeIdentity$.pipe(filter(i => !!i)).subscribe((i) => {
      resolve(i);
    });
  });
}