import { AppException } from "@model/exceptions/app-exception";
import type { CallWithUnlockCallback } from "@services/security/security.service";
import { BehaviorSubject } from "rxjs";

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
  handled: boolean; // This request has already been handled
  silentCancellation: boolean;
  defaultValue: T;
}

/**
 * Use a BehaviorSubject here to make sure that even when the unlock key prompt component
 * is destroyed/restored during screen transitions, we never loose any event.
 *
 * The latest request will be received several time then, but a "handled" boolean is used to
 * know if it should be handled or not. A bit dirty but nothing better for now.
 */
export const callWithUnlockRequestEvent$ = new BehaviorSubject<UnlockRequest<any>>(null);
