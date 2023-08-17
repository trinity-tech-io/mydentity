import { Credential } from "@model/credential/credential";
import { BehaviorSubject } from "rxjs";

export const activeCredential$ = new BehaviorSubject<Credential>(null);

export function getActiveCredential(): Credential {
  return activeCredential$.value;
}
