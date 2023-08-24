import { FC } from 'react';
import { MainButton } from '../../MainButton';

export const PasskeyPrompt: FC<{
  onConfirm: (password: string) => void;
}> = ({ onConfirm }) => {
  const onSubmit = () => {
    onConfirm("");
  }

  return (
    <div className='flex flex-row gap-4 bg-gray-100 mt-4 p-4 items-center'>
      <p className='uppercase text-xs'>Browser<br />authentication</p>
      <MainButton onClick={onSubmit} >Unlock with passkey</MainButton>
    </div>
  );
}
