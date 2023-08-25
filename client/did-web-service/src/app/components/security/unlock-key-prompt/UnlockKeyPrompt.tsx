import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { ShadowKeyType } from '@model/shadow-key/shadow-key-type';
import { Dialog, Typography } from '@mui/material';
import { AuthKeyInput } from '@services/keyring/auth-key.input';
import { authUser$ } from '@services/user/user.events';
import React, {
  Dispatch, FC,
  createContext,
  useContext, useState
} from 'react';
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

export function UnlockKeyPromptContextProvider(props: any) {
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
  const [authUser] = useBehaviorSubject(authUser$());
  const securityFeature = authUser?.get("security");
  const [passwordKeys] = useBehaviorSubject(securityFeature?.passwordKeys$);
  const [passkeyKeys] = useBehaviorSubject(securityFeature?.passkeyKeys$);

  const hideDialog = () => {
    setActions(null) // Hides the dialog
  }

  // User closing
  const onClose = () => {
    actions.onUnlockKey?.(null); // Notify that unlock was completed but with no result
    hideDialog();
  }

  const onPasswordConfirmation = (password: string) => {
    actions.onUnlockKey?.({
      type: ShadowKeyType.PASSWORD,
      keyId: "unused-for-now-for-passwords",
      key: password
    });
    hideDialog();
  }

  const onPasskeyConfirmation = () => {
    // TODO
  }

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

export const useUnlockKeyPrompt = () => {
  const { setActions } = useContext(UnlockKeyPromptContext);

  const promptMasterKeyUnlock = (): Promise<AuthKeyInput> => {
    return new Promise((resolve) => {
      setActions({ onUnlockKey: resolve });
    });
  }

  return { promptMasterKeyUnlock };
}