import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { AppException } from '@model/exceptions/app-exception';
import { ClientError } from '@model/exceptions/exception-codes';
import { ShadowKeyType } from '@model/shadow-key/shadow-key-type';
import { Dialog, Typography } from '@mui/material';
import { withCaughtAppException } from '@services/error.service';
import { AuthKeyInput } from '@services/keyring/auth-key.input';
import { unlockMasterKey } from '@services/keyring/keyring.service';
import { logger } from '@services/logger';
import { isUnlockException } from '@services/security/security.service';
import { authUser$ } from '@services/user/user.events';
import React, {
  Dispatch, FC,
  createContext,
  useContext, useEffect,
  useState
} from 'react';
import { PasskeyPrompt } from './PasskeyPrompt';
import { PasswordPrompt } from './PasswordPrompt';
import { callWithUnlock } from './call-with-unlock';
import { UnlockPromptState, UnlockRequest, callWithUnlockRequestEvent$, unlockPromptState$ } from './unlock.events';

type OnUnlockKeyCallback = (authorization: AuthKeyInput) => void;

type UnlockKeyPromptActions = {
  onUnlockKey?: OnUnlockKeyCallback;
}

interface UnlockKeyPromptContextType {
  actions: UnlockKeyPromptActions;
  setActions: Dispatch<UnlockKeyPromptActions>;
}

export const UnlockKeyPromptContext = createContext<UnlockKeyPromptContextType>({
  actions: null,
  setActions: null
});

export function UnlockKeyPromptContextProvider(props: any): JSX.Element {
  const [actions, setActions] = useState<UnlockKeyPromptActions>(null);

  return (
    <UnlockKeyPromptContext.Provider
      value={{ actions, setActions }}>
      {props.children}
      <UnlockKeyPrompt />
    </UnlockKeyPromptContext.Provider>
  )
}


const UnlockKeyPrompt: FC = () => {
  const { actions, setActions } = useContext(UnlockKeyPromptContext);
  const [authUser] = useBehaviorSubject(authUser$);
  const securityFeature = authUser?.get("security");
  const [passwordKeys] = useBehaviorSubject(securityFeature?.passwordKeys$);
  const [passkeyKeys] = useBehaviorSubject(securityFeature?.passkeyKeys$);
  const { promptMasterKeyUnlock } = useUnlockKeyPrompt();

  const hideDialog = (): void => {
    setActions(null) // Hides the dialog
  }

  // User closing / click outside
  const onClose = (): void => {
    actions.onUnlockKey?.(null); // Notify that unlock was completed but with no result
    hideDialog();
  }

  const onPasswordConfirmation = (password: string): void => {
    actions.onUnlockKey?.({
      type: ShadowKeyType.PASSWORD,
      keyId: "unused-for-now-for-passwords",
      key: password
    });
    hideDialog();
  }

  const onPasskeyConfirmation = (authKey: AuthKeyInput): void => {
    actions.onUnlockKey?.(authKey);
    hideDialog();
  }

  useEffect(() => {
    const sub = callWithUnlockRequestEvent$.subscribe(request => {
      if (!request || request.handled)
        return;

      request.handled = true;

      callWithUnlockHandler(request, promptMasterKeyUnlock);
    });
    return () => sub.unsubscribe();
  }, [promptMasterKeyUnlock]);

  return (
    <Dialog
      open={Boolean(actions)}
      disablePortal
      onClose={onClose}
    >
      <div className='p-4'>
        <Typography variant='h4'>
          Content unlock needed!
        </Typography>
        <Typography color='#666' fontSize={14}>
          Your encrypted data needs to be unlocked so we can display it.<br />
          We can't do this without your interaction.
        </Typography>

        <div className='mt-4'>
          <PasswordPrompt onConfirm={onPasswordConfirmation} disabled={passwordKeys?.length == 0} />
        </div>
        <div className='my-4 text-center text-xs'>
          or
        </div>
        <div className='mt-4'>
          <PasskeyPrompt onConfirm={onPasskeyConfirmation} disabled={passkeyKeys?.length == 0} />
        </div>
      </div>
    </Dialog>
  );
}

export default React.memo(UnlockKeyPrompt);

/**
 * Convenient hooked booleans to get unlocker state
 */
export function useUnlockPromptState(): {
  unlockerIsIdle: boolean;
  unlockerIsCancelled: boolean;
} {
  const [unlockerState] = useBehaviorSubject(unlockPromptState$);
  const [unlockerIsIdle, setUnlockerIsIdle] = useState(true);
  const [unlockerIsCancelled, setUnlockerIsCancelled] = useState(false);

  useEffect(() => {
    switch (unlockerState) {
      case UnlockPromptState.Idle:
        setUnlockerIsIdle(true);
        setUnlockerIsCancelled(false);
        break;
      case UnlockPromptState.UnlockCancelled:
        setUnlockerIsIdle(false);
        setUnlockerIsCancelled(true);
        break;
    }
  }, [unlockerState]);

  return { unlockerIsIdle, unlockerIsCancelled };
}

export const useUnlockKeyPrompt = (): {
  promptMasterKeyUnlock: () => Promise<AuthKeyInput>;
  retryUnlock: () => Promise<void>;
} => {
  const { setActions } = useContext(UnlockKeyPromptContext);
  const [activeUser] = useBehaviorSubject(authUser$);

  const promptMasterKeyUnlock = (): Promise<AuthKeyInput> => {
    return new Promise((resolve) => {
      setActions({ onUnlockKey: resolve });
    });
  }

  const retryUnlock = (): Promise<void> => {
    return callWithUnlock(() => {
      return activeUser.get("security").checkRemoteUnlockStatus();
    })
  }

  return { promptMasterKeyUnlock, retryUnlock };
}

/**
 * Counterpart to callWithUnlock() running in the UI context.
 */
async function callWithUnlockHandler(request: UnlockRequest<any>, promptMasterKeyUnlock: () => Promise<AuthKeyInput>): Promise<void> {
  try {
    const result = await withCaughtAppException(() => {
      return request.method();
    });
    request.resolve(result);
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
        const result = await callWithUnlock(request.method, request.silentCancellation, request.defaultValue, false);
        request.resolve(result);
      }
      else {
        // Operation cancelled by user, this is a failure to bind password
        unlockPromptState$.next(UnlockPromptState.UnlockCancelled);
        logger.warn("security", "Unlock operation cancelled by user");
        request.reject(AppException.newClientError(ClientError.UnlockKeyCancelled, "CANCELLED"));
      }
    }
    else {
      logger.error("security", "Unhandled callWithUnlock() exception (will get stuck):", e);
    }
  }
}