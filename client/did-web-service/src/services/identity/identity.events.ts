import { Identity } from "@model/identity/identity";
import { BehaviorSubject, filter } from "rxjs";

export const activeIdentity$ = new BehaviorSubject<Identity>(null);

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