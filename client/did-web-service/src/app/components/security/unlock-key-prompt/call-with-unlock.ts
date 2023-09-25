import { AppException } from "@model/exceptions/app-exception";
import { ClientError } from "@model/exceptions/exception-codes";
import { logger } from "@services/logger";
import { CallWithUnlockCallback, isUnlockPromptCancelledException } from "@services/security/security.service";
import Queue from "promise-queue";
import { UnlockPromptState, callWithUnlockRequestEvent$, unlockPromptState$ } from "./unlock.events";

const unlockQueue = new Queue(1);

/**
 * Convenience helper to catch unlock exceptions from APIs, prompt user to unlock his master key
 * on the UI, and automatically retry calling the API until the call succeeds or gets cancelled by
 * the user.
 *
 * silentCancellation is used to let some methods such as active user actions (create identity, etc) automatically
 * catch cancellation events, while letting behavior subjects throw the exception to be able to know
 * such cancellation happened and then to retry initializing their data later.
 *
 * NOTE: in a separate file to reduce circular dependencies.
 */
export async function callWithUnlock<T>(method: CallWithUnlockCallback<T>, silentCancellation = false, defaultValue?: T, useLockQueue = true): Promise<T> {
  unlockPromptState$.next(UnlockPromptState.Idle);

  if (useLockQueue) {
    // Make sure only only UI unlock at a time
    return unlockQueue.add(async () => {
      return callWithUnlockReal(method, silentCancellation, defaultValue);
    });
  }
  else {
    return callWithUnlockReal(method, silentCancellation, defaultValue);
  }
}

export async function callWithUnlockReal<T>(method: CallWithUnlockCallback<T>, silentCancellation = false, defaultValue?: T): Promise<T> {
  // In case 2 operations required unlocking, and the second one was queued behind the first one, and the user cancelled the unlock prompt
  // during the first prompt, we don't want to prompt again right after for the second operation.
  // The prompt state will later be reset to "idle" when someone calls callWithUnlock() again.
  if (unlockPromptState$.value === UnlockPromptState.UnlockCancelled) {
    if (silentCancellation)
      return defaultValue;
    else
      throw AppException.newClientError(ClientError.UnlockKeyCancelled, "CANCELLED (queued operation)"); // Throw a cancellation exception to let the caller know (possibly behavior subject) that he needs to retry later
  }

  const previousEvent = callWithUnlockRequestEvent$.value;
  const deadlockCheckInterval = setInterval(() => {
    logger.warn("security", "callWithUnlock call still locked after a few seconds", "method:", method, "previous event: ", previousEvent)
  }, 5000);

  const p = new Promise<T>((resolve, reject) => {
    callWithUnlockRequestEvent$.next({ method, resolve, reject, handled: false, silentCancellation, defaultValue, deadlockCheckInterval });
  }).catch(e => {
    clearInterval(deadlockCheckInterval);
    if (silentCancellation && isUnlockPromptCancelledException(e)) {
      // Silent, catch the cancellation exception and let the promise return successfully with no value.
    }
    else {
      // For all other errors, rethrow the exception, the caller needs to handle that.
      throw e;
    }
  });

  const result = (await p) || defaultValue;
  clearInterval(deadlockCheckInterval);

  return result;
}
