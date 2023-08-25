import { FC } from 'react';
import { MainButton } from '../../MainButton';

export const PasskeyPrompt: FC<{
  onConfirm: (password: string) => void;
  disabled: boolean;
}> = ({ onConfirm, disabled }) => {
  const onSubmit = () => {
    onConfirm("");
  }

  return (
    <div className='flex flex-row gap-4 bg-gray-100 mt-4 p-4 items-center'>
      <p className='uppercase text-xs'>Browser<br />authentication</p>
      <MainButton onClick={onSubmit} disabled={disabled}>Unlock with passkey</MainButton>
    </div>
  );
}
