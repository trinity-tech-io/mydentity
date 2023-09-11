import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { AppException } from '@model/exceptions/app-exception';
import { ShadowKeyType } from '@model/shadow-key/shadow-key-type';
import { Dialog, Typography } from '@mui/material';
import { AuthKeyInput } from '@services/keyring/auth-key.input';
import { unlockMasterKey } from '@services/keyring/keyring.service';
import { logger } from '@services/logger';
import { CallWithUnlockCallback, isUnlockException } from '@services/security/security.service';
import { authUser$ } from '@services/user/user.events';
import React, {
  Dispatch, FC,
  createContext,
  useContext, useEffect,
  useState
} from 'react';
import { Subject } from 'rxjs';
import { PasskeyPrompt } from './PasskeyPrompt';
import { PasswordPrompt } from './PasswordPrompt';

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

type UnlockRequest<T> = {
  method: CallWithUnlockCallback<T>;
  resolve: (value: any) => any;
}
const callWithUnlockRequestEvent = new Subject<UnlockRequest<any>>();


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

  // User closing
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
    const sub = callWithUnlockRequestEvent.subscribe(request => {
      callWithUnlockHandler(request, promptMasterKeyUnlock);
    });
    return () => sub.unsubscribe();
  }, []);

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

export const useUnlockKeyPrompt = (): {
  promptMasterKeyUnlock: () => Promise<AuthKeyInput>;
} => {
  const { setActions } = useContext(UnlockKeyPromptContext);

  const promptMasterKeyUnlock = (): Promise<AuthKeyInput> => {
    return new Promise((resolve) => {
      setActions({ onUnlockKey: resolve });
    });
  }

  return { promptMasterKeyUnlock };
}




export async function callWithUnlock<T>(method: CallWithUnlockCallback<T>): Promise<T> {
  return new Promise<T>((resolve) => {
    callWithUnlockRequestEvent.next({ method, resolve });
  });
}

async function callWithUnlockHandler(request: UnlockRequest<any>, promptMasterKeyUnlock: () => Promise<AuthKeyInput>): Promise<void> {
  try {
    const result = await request.method();
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
        const result = await callWithUnlock(request.method)
        request.resolve(result);
      }
      else {
        // Operation cancelled by user, failure to bind password
        logger.warn("security", "Unlock operation cancelled by user");
      }
    }
  }
}