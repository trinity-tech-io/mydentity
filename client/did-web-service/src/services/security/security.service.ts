/**
 * Service responsible to manage device password and passkey bindings, and crypto operations related to
 * securing the access to user accounts's encrypted information on the server side.
 */

import { useUnlockKeyPrompt } from "@components/security/unlock-key-prompt/UnlockKeyPrompt";
import { AppException } from "@model/exceptions/app-exception";
import { KeyRingExceptionCode } from "@model/exceptions/exception-codes";
import { UnlockAuthorization } from "@model/user/features/security/unlock-authorization";
import { logger } from "@services/logger";

type CallWithUnlockCallback<T> = (auth: UnlockAuthorization) => Promise<T>;

/**
 * Tells if the given app exception is considered as a requirement to unlock a user's master key.
 * This happens when the API side requires the master key to be unlocked but the client side
 * provides either none, or wrong decryption methods.
 */
export function isUnlockException(e: AppException): boolean {
  // TODO: "UnsupportedAuthenticationKey" is not a great error code, need @jingyu to
  // refine and be very specific on a "need to ask user to unload on UI" kind of error
  return e.appExceptionCode === KeyRingExceptionCode.UnsupportedAuthenticationKey;
}

/**
 * Convenience helper to catch unlock exceptions from APIs, prompt user to unlock his master key
 * on the UI, and automatically retry calling the API until the call succeeds or gets cancelled by
 * the user.
 */
export function useCallWithUnlock<T>() {
  let auth: UnlockAuthorization = null;
  const { unlockMasterKey } = useUnlockKeyPrompt();

  const callWithUnlock = async (method: CallWithUnlockCallback<T>): Promise<T> => {
    try {
      const result = await method(auth);
      return result;
    }
    catch (e) {
      // Exception during the API call. Check if this is a unlock key requirement app exception and if so,
      // trigger the master unlock callback to let the UI prompt the unlock method to the user
      if (e instanceof AppException && isUnlockException(e)) {
        logger.warn("security", "This method call requires unlock authorization from the user. Prompting");
        auth = await unlockMasterKey();
        // Call the original method again wit hthe new authorization
        if (auth) {
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

/**
 * Binds the current device to the user account. Binding a device means creating a keypair on the
 * device, either through passkey or in the local storage. The keypair is stored on the client side
 * (server doesn't store it) and used by the server temporarily to generate a shadow copy of the root
 * user account key.
 */
/* export async function bindDevice() {
  const userAgent = window.navigator.userAgent;
}
 */
/**
 * Binds the main user password to the user account. Binding the user password means creating or replacing
 * the current password shadow key on the server side, in orderto re-encrypt the current user account key.
 */
/* export async function bindPassword(newPassword: string) {

} */