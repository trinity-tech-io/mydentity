import { AppException } from "@model/exceptions/app-exception";
import type { CallWithUnlockCallback } from "@services/security/security.service";
import { BehaviorSubject, Subject } from "rxjs";

/**
 * Global state for the unlocker. This is used by UI and services to know if they should retry to fetch some lazy data or not.
 */
export enum UnlockPromptState {
  Idle, // The unlocker has not been called, or was unlocked successfully previously.
  UnlockCancelled, // The unlocking last failed because user cancelled the unlock operation
}

export const unlockPromptState$ = new BehaviorSubject<UnlockPromptState>(UnlockPromptState.Idle);

export type UnlockRequest<T> = {
  method: CallWithUnlockCallback<T>;
  resolve: (value: any) => any;
  reject: (exception: AppException) => any;
}
export const callWithUnlockRequestEvent$ = new Subject<UnlockRequest<any>>();
