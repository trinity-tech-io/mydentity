import { User } from '@model/user/user';
import { Dialog, TextField } from '@mui/material';
import React, {
  Dispatch, FC,
  createContext,
  createRef,
  useContext, useState
} from 'react';
import { MainButton } from './MainButton';

type OnPasswordCallback = (password: string) => void;

type PasswordPromptActions = {
  onPassword?: OnPasswordCallback;
}

interface PasswordPromptContextType {
  actions: PasswordPromptActions;
  setActions: Dispatch<PasswordPromptActions>;
}

export const PasswordPromptContext = createContext<PasswordPromptContextType>({
  actions: null,
  setActions: null
});

export function PasswordPromptContextProvider(props: any) {
  const [anchorEvent, setAnchorEvent] = useState<any>();
  const [users, setUsers] = useState<User[]>(null);
  const [customData, setCustomData] = useState<any>(null);
  const [actions, setActions] = useState<PasswordPromptActions>(null);

  return (
    <PasswordPromptContext.Provider
      value={{ actions, setActions }}>
      {props.children}
      <UserPicker />
    </PasswordPromptContext.Provider>
  )
}

const UserPicker: FC = () => {
  const { hidePasswordPrompt } = usePasswordPrompt();
  const { actions, setActions } = useContext(PasswordPromptContext);
  const passwordRef = createRef<HTMLInputElement>()

  /* const handleListItemClick = (user: User, event: React.MouseEvent<any, MouseEvent>) => {
    actions?.onPassword?.(user, customData);
    hideUserPicker();
  };

  function handleListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === 'Tab') {
      event.preventDefault();
      hideUserPicker();
    }
  } */

  const hideDialog = () => {
    setActions(null) // Hides the dialog
  }

  const onClose = () => {
    hideDialog();
  }

  const onConfirm = () => {
    const password = passwordRef.current.value;
    actions.onPassword?.(password);
    hideDialog();
  }

  return (
    <Dialog
      open={Boolean(actions)}
      disablePortal
      onClose={onClose}
    >
      <div className='flex flex-col p-6'>
        <p>Input your master password to continue</p>
        <div className='flex flex-row gap-2 mt-4'>
          <TextField
            label="Your password"
            inputRef={passwordRef}
            autoFocus
            type='password'
            name='master-password' // TODO + user id
            variant="outlined"
            size='small'
          />
          <MainButton onClick={onConfirm} >Continue</MainButton>
        </div>
      </div>
    </Dialog>
  );
}

export default React.memo(UserPicker);

export const usePasswordPrompt = () => {
  const { setActions } = useContext(PasswordPromptContext);

  const showPasswordPrompt = (onPassword: OnPasswordCallback) => {
    setActions({ onPassword });
  }

  const hidePasswordPrompt = () => {
    setActions(null);
  }

  return { showPasswordPrompt, hidePasswordPrompt };
}