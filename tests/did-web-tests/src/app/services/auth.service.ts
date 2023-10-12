import { BehaviorSubject } from "rxjs";

/**
 * Simulates an authenticated user (session only). This value is set after getting a DID from
 * "request credential". This is necessary for further operations suc has "import" to know the targeted DID.
 */
export const authUserDID$ = new BehaviorSubject<string>(null);