/**
 * Service responsible to manage device password and passkey bindings, and crypto operations related to
 * securing the access to user accounts's encrypted information on the server side.
 */

import { AppException } from "@model/exceptions/app-exception";
import { ClientError, KeyRingExceptionCode } from "@model/exceptions/exception-codes";

export type CallWithUnlockCallback<T> = () => Promise<T>;

/**
 * Tells if the given app exception is considered as a requirement to unlock a user's master key.
 * This happens when the API side requires the master key to be unlocked but the client side
 * provides either none, or wrong decryption methods.
 */
export function isUnlockException(e: AppException): boolean {
  return e.appExceptionCode === KeyRingExceptionCode.Unauthorized;
}

export function isUnlockPromptCancelledException(e: AppException): boolean {
  return e.appExceptionCode === ClientError.UnlockKeyCancelled;
}

