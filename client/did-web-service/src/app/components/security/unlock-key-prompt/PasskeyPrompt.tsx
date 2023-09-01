import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { AuthKeyInput } from '@services/keyring/auth-key.input';
import { authUser$ } from '@services/user/user.events';
import { FC } from 'react';
import { MainButton } from '../../generic/MainButton';

export const PasskeyPrompt: FC<{
  onConfirm: (authKey: AuthKeyInput) => void;
  disabled: boolean;
}> = ({ onConfirm, disabled }) => {
  const [authUser] = useBehaviorSubject(authUser$());
  const securityFeature = authUser?.get("security");

  const onSubmit = async () => {
    const authKey = await securityFeature.unlockPasskeyLocally();
    onConfirm(authKey);
  }

  return (
    <div className='flex flex-row gap-4 bg-gray-100 mt-4 p-4 items-center'>
      <p className='uppercase text-xs'>Browser<br />authentication</p>
      <MainButton onClick={onSubmit} disabled={disabled}>Unlock with passkey</MainButton>
    </div>
  );
}
