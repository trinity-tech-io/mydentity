import { FC } from 'react';
import { MainButton } from '@components/MainButton';

export const PasskeyAuth: FC<{
  onConfirm: (password: string) => void;
}> = ({ onConfirm }) => {
  const onSubmit = () => {
    onConfirm("");
  }

  return (
    <div className='flex flex-row gap-4 mt-4 p-4 items-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <MainButton onClick={onSubmit} >Unlock passkey</MainButton>
    </div>
  );
}
export default PasskeyAuth;
