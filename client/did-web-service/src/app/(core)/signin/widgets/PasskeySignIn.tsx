'use client';
import { MainButton } from '@components/MainButton';
import { Icon as ReactIcon } from '@iconify/react';
import { makeStyles } from '@mui/styles';
import { useToast } from "@services/feedback.service";
import { useCallWithUnlock } from "@services/security/security.service";
import { authenticateWithPasskey } from "@services/user/user.service";
import clsx from 'clsx';
import { useRouter } from "next/navigation";

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '10vh',
  },
}));

const PasskeySignIn = () => {
  const classes = useStyles()
  const router = useRouter()
  const { callWithUnlock } = useCallWithUnlock<boolean>()
  const { showSuccessToast } = useToast()

  const signInWithPasskey = async () => {
    const bound = await callWithUnlock(() => authenticateWithPasskey());
    console.log("bound= ", bound)

    if (bound) {
      showSuccessToast("Successful sign in");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  }

  return (
    <div className={clsx(classes.centeredContainer, 'relative')}>
      <MainButton
        leftIcon={<ReactIcon icon="" />}
        onClick={signInWithPasskey}
      >
        🔐    Sign in with Passkey
      </MainButton>
    </div>
  )
}

export default PasskeySignIn
