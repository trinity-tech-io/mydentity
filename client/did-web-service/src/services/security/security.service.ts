/**
 * Service responsible to manage device password and passkey bindings, and crypto operations related to
 * securing the access to user accounts's encrypted information on the server side.
 */

import { useUnlockKeyPrompt } from "@components/security/unlock-key-prompt/UnlockKeyPrompt";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { AppException } from "@model/exceptions/app-exception";
import { KeyRingExceptionCode } from "@model/exceptions/exception-codes";
import { unlockMasterKey } from "@services/keyring/keyring.service";
import { logger } from "@services/logger";
import { authUser$ } from "@services/user/user.events";

type CallWithUnlockCallback<T> = () => Promise<T>;

/**
 * Tells if the given app exception is considered as a requirement to unlock a user's master key.
 * This happens when the API side requires the master key to be unlocked but the client side
 * provides either none, or wrong decryption methods.
 */
export function isUnlockException(e: AppException): boolean {
  return e.appExceptionCode === KeyRingExceptionCode.Unauthorized;
}

/**
 * Convenience helper to catch unlock exceptions from APIs, prompt user to unlock his master key
 * on the UI, and automatically retry calling the API until the call succeeds or gets cancelled by
 * the user.
 */
export function useCallWithUnlock<T>(): {
  callWithUnlock: (method: CallWithUnlockCallback<T>) => Promise<T>;
} {
  const [authUser] = useBehaviorSubject(authUser$());
  const { promptMasterKeyUnlock } = useUnlockKeyPrompt();

  const callWithUnlock = async (method: CallWithUnlockCallback<T>): Promise<T> => {
    try {
      const result = await method();
      return result;
    }
    catch (e) {
      // Exception during the API call. Check if this is a unlock key requirement app exception and if so,
      // trigger the master unlock callback to let the UI prompt the unlock method to the user
      if (e instanceof AppException && isUnlockException(e)) {
        logger.warn("security", "This method call requires unlock authorization from the user. Prompting");
        const auth = await promptMasterKeyUnlock();
        if (auth) {
          // Client side auth provided: try to unlock on the API side and call the original api again
          await unlockMasterKey(auth);
          return callWithUnlock(method);
        }
        else {
          // Operation cancelled by user, failure to bind password
          logger.warn("security", "Unlock operation cancelled by user");
          return null;
        }
      }
    }
  }

  return {
    callWithUnlock
  }
}
