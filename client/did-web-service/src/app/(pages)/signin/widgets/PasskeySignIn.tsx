'use client';
import { MainButton } from '@components/generic/MainButton';
import { callWithUnlock } from '@components/security/unlock-key-prompt/UnlockKeyPrompt';
import { Icon as ReactIcon } from '@iconify/react';
import { makeStyles } from '@mui/styles';
import { useToast } from "@services/feedback.service";
import { authenticateWithPasskey } from "@services/user/user.service";
import clsx from 'clsx';
import { useRouter } from "next/navigation";
import { FC } from 'react';

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '10vh',
  },
}));

const PasskeySignIn: FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { showSuccessToast } = useToast()

  const signInWithPasskey = async (): Promise<void> => {
    const bound = await callWithUnlock(() => authenticateWithPasskey());

    if (bound) {
      showSuccessToast("Successful sign in");
      router.replace("/dashboard");
    }
  }

  return (
    <div className={clsx(classes.centeredContainer, 'relative')}>
      <MainButton
        leftIcon={<ReactIcon icon="" />}
        onClick={signInWithPasskey}
      >
        🔐 Sign in with Passkey
      </MainButton>
    </div>
  )
}

export default PasskeySignIn
