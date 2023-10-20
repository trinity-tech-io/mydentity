import { FC, FormEvent, useRef, useState } from 'react';
import { InputLabel } from '@mui/material';
import { DarkButton } from '@components/button';
import AccountForm from '@components/form/AccountForm';
import PasswordInput from '@/app/(pages)/register/components/PasswordInput';

export const PasswordPrompt: FC<{
  onConfirm: (password: string) => void;
  disabled: boolean;
}> = ({ onConfirm, disabled }) => {
  const [password, setPassword] = useState<string>("");
  const pwInputRef = useRef(null);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitPassword = (event: FormEvent | MouseEvent) => {
    event.preventDefault();
    if(!pwInputRef.current.value) {
      pwInputRef.current.focus()
      return
    }
    onConfirm(pwInputRef.current.value);
  };

  return (
    <>
      <form onSubmit={submitPassword}>
        <AccountForm fullWidth>
          <InputLabel htmlFor="pw">PASSWORD</InputLabel>
          <PasswordInput
            outerProps={{
              autoFocus: true,
              disabled,
              onChange: handlePassword,
            }}
            inputProps={{ ref: pwInputRef }}
          />
        </AccountForm>
      </form>
      <div className="p-2 pt-3 sm:pt-4 pb-0 text-center">
        <DarkButton
          id="bind-ms"
          className="w-11/12 sm:w-4/5"
          disabled={disabled || !password.length}
          onClick={submitPassword}
        >
          Continue
        </DarkButton>
      </div>
    </>
  );
}
