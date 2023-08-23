import { TextField } from '@mui/material';
import { FC, createRef } from 'react';
import { MainButton } from '../../MainButton';

export const PasswordPrompt: FC<{
  onConfirm: (password: string) => void;
}> = ({ onConfirm }) => {
  const passwordRef = createRef<HTMLInputElement>()

  const onSubmit = () => {
    const password = passwordRef.current.value;
    onConfirm(password);
  }

  return (
    <div className='flex flex-row gap-4 bg-gray-100 mt-4 p-4'>
      <p className='uppercase text-xs'>master<br />password</p>
      <TextField
        label="Your password"
        inputRef={passwordRef}
        autoFocus
        type='password'
        name='master-password' // TODO + user id
        variant="outlined"
        size='small'
      />
      <MainButton onClick={onSubmit} >Continue</MainButton>
    </div>
  );
}
