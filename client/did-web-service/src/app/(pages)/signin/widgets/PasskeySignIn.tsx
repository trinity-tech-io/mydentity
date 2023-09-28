'use client';
import { DarkButton } from '@components/button';
import { callWithUnlock } from '@components/security/unlock-key-prompt/call-with-unlock';
import { Icon as ReactIcon } from '@iconify/react';
import { useToast } from "@services/feedback.service";
import { usePostSignInFlow } from '@services/flow.service';
import { authenticateWithPasskey } from "@services/user/user.service";
import { FC } from 'react';

const PasskeySignIn: FC = () => {
  const { showSuccessToast } = useToast();
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();

  const signInWithPasskey = async (): Promise<void> => {
    const bound = await callWithUnlock(() => authenticateWithPasskey());

    if (bound) {
      showSuccessToast("Successful sign in");
      navigateToPostSignInLandingPage();
    }
  }

  return (
    <DarkButton
      id="signin-pk"
      className="w-full"
      startIcon={<ReactIcon icon="material-symbols:passkey" />}
      onClick={signInWithPasskey}
    >
      Sign in with Passkey
    </DarkButton>
  )
}

export default PasskeySignIn
