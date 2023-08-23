import { FC } from 'react';
import { MainButton } from '../../MainButton';

export const PasskeyPrompt: FC<{
  onConfirm: (password: string) => void;
}> = ({ onConfirm }) => {
  const onSubmit = () => {
    onConfirm("");
  }

  return (
    <div className='flex flex-col mt-2'>
      <p>Browser authentication</p>
      <div className='flex flex-row gap-2 mt-4'>
        <MainButton onClick={onSubmit} >Continue</MainButton>
      </div>
    </div>
  );
}
