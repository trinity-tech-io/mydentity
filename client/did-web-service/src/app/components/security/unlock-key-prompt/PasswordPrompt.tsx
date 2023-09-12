import { TextField } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { MainButton } from '../../generic/MainButton';

export const PasswordPrompt: FC<{
  onConfirm: (password: string) => void;
  disabled: boolean;
}> = ({ onConfirm, disabled }) => {
  const [password, setPassword] = useState<string>("");

  const onSubmit = () => {
    onConfirm(password);
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }

  return (
    <div className='flex flex-row gap-4 bg-gray-100 mt-4 p-4'>
      <p className='uppercase text-xs'>master<br />password</p>
      <TextField
        label="Your password"
        autoFocus
        type='password'
        name='master-password' // TODO + user id
        variant="outlined"
        size='small'
        onChange={onInputChange}
        disabled={disabled}
      />
      <MainButton onClick={onSubmit} disabled={disabled || !password}>Continue</MainButton>
    </div>
  );
}
