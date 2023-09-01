'use client';
import { MainButton } from '@components/generic/MainButton';
import { Icon as ReactIcon } from '@iconify/react';
import { makeStyles } from '@mui/styles';
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";
import clsx from 'clsx';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '10vh',
  },
}));

const MicrosoftSignIn = () => {
  const classes = useStyles();
  const router = useRouter();

  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (error === 'oauthEmailNotExists') {
      setErrorMsg('This email address is unknown.');
    } else if (error === 'unknown') {
      setErrorMsg('Failed to sign in with MS account.');
    }
  }, [])

  const signInWithMicrosoft = () => {
    setOnGoingFlowOperation(FlowOperation.OnBoardingEmailSignIn);
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/microsoft`);
  };

  return (
    <div className={clsx(classes.centeredContainer, 'relative')}>
      <MainButton
        leftIcon={<ReactIcon icon="logos:microsoft-icon" />}
        onClick={signInWithMicrosoft}
      >
        Sign in with Microsoft
      </MainButton>
      {errorMsg && <>
        <div className='text-red-600'>{errorMsg}</div>
      </>
      }
    </div>
  );
};

export default MicrosoftSignIn;

