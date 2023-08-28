'use client';
import { Icon as ReactIcon } from '@iconify/react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { MainButton } from '@components/MainButton';
import {useRouter} from "next/navigation";
import { useToast } from "@services/feedback.service";
import { useCallWithUnlock } from "@services/security/security.service";
import { feactAccessTokenWithPasskey } from "@services/user/user.service";

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
    const bound = await callWithUnlock(() => feactAccessTokenWithPasskey());
    console.log("bound= ", bound)

    if (bound) {
      showSuccessToast("Unlock passkey successfully");
      setTimeout(() => {
      router.push("/onboarding");
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
