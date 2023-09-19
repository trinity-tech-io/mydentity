import { CallWithUnlockCallback, isUnlockPromptCancelledException } from "@services/security/security.service";
import { UnlockPromptState, callWithUnlockRequestEvent$, unlockPromptState$ } from "./unlock.events";

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
export async function callWithUnlock<T>(method: CallWithUnlockCallback<T>, silentCancellation = false, defaultValue?: T): Promise<T> {
  const p = new Promise<T>((resolve, reject) => {
    unlockPromptState$.next(UnlockPromptState.Idle);
    callWithUnlockRequestEvent$.next({ method, resolve, reject });
  }).catch(e => {
    if (silentCancellation && isUnlockPromptCancelledException(e)) {
      // Silent, catch the cancellation exception and let the promise return successfully with no value.
    }
    else {
      // For all other errors, rethrow the exception, the caller needs to handle that.
      throw e;
    }
  });

  return (await p) || defaultValue;
}
