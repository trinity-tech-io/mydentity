import { FC } from 'react';
import { Icon as ReactIcon } from "@iconify/react";
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { AuthKeyInput } from '@services/keyring/auth-key.input';
import { authUser$ } from '@services/user/user.events';
import { DarkButton } from '@components/button';

export const PasskeyPrompt: FC<{
  onConfirm: (authKey: AuthKeyInput) => void;
  disabled: boolean;
}> = ({ onConfirm, disabled }) => {
  const [authUser] = useBehaviorSubject(authUser$);
  const securityFeature = authUser?.get("security");

  const onSubmit = async (): Promise<void> => {
    const authKey = await securityFeature.unlockPasskeyLocally();
    onConfirm(authKey);
  }

  return (
    <DarkButton
      id="bind-ms"
      className="w-11/12 sm:w-4/5"
      startIcon={<ReactIcon icon="material-symbols:passkey" />}
      disabled={disabled}
      onClick={onSubmit}
    >
      Unlock with passkey
    </DarkButton>
  );
}
