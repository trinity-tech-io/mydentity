import { Identity } from "@model/identity/identity";
import { BehaviorSubject } from "rxjs";

export const activeIdentity$ = new BehaviorSubject<Identity>(null);

export function getActiveIdentity(): Identity {
  return activeIdentity$.value;
}
