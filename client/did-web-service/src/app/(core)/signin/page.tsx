"use client";
import { MainButton } from '@components/MainButton';
import { Icon as ReactIcon } from '@iconify/react';
import { Card, Typography, makeStyles, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FC } from "react";
import { EmailSignIn } from './EmailSignIn';

const useStyles = makeStyles(theme => ({
  separateBar: {
    position: 'absolute',
    width: 80,
    borderBottom: '1px solid #C4C4C4',
    '&.left': {
      left: -70
    },
    '&.right': {
      right: -70
    }
  }
}))

const SignIn: FC = () => {
  const theme = useTheme();
  const classes = useStyles();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const signInWithGoogle = () => {
    window.location.replace(`${process.env.NEXT_PUBLIC_BACKEND_URL}/google`);
  }

  const signInWithLinkedIn = () => {
    window.location.replace(`${process.env.NEXT_PUBLIC_BACKEND_URL}/linkedin`);
  }

  const signInWithMicrosoft = () => {
    window.location.replace(`${process.env.NEXT_PUBLIC_BACKEND_URL}/microsoft`);
  }

  return (
    <div className="col-span-full">
      <Card className={clsx('py-40 w-full text-center min-h-full')} elevation={0}>
        <Typography variant="h5" className='w-full text-center font-semibold mt-32 mb-24 leading-9'>
          Hello! 👋<br />
        </Typography>
        <Typography variant="h2" className='w-full text-center font-bold'>
          Welcome back
        </Typography>

        <div className='inline-flex flex-col mb-16 pt-6'>
          {/*<StyledButton*/}
          {/*  startIcon={<ReactIcon icon="logos:google-icon" />}*/}
          {/*  onClick={signInWithGoogle}>*/}
          {/*  Sign in with Google*/}
          {/*</StyledButton>*/}
          <MainButton
            leftIcon={<ReactIcon icon="logos:microsoft-icon" />}
            onClick={signInWithMicrosoft}>
            Sign in with Microsoft
          </MainButton>
          {/*<StyledButton*/}
          {/*  startIcon={<ReactIcon icon="la:linkedin-in" style={{ background: '#0A66C2', borderRadius: 2 }} />}*/}
          {/*  onClick={signInWithLinkedIn}>*/}
          {/*  Sign in with LinkedIn*/}
          {/*</StyledButton>*/}
          <div className="relative pt-6">
            <Typography variant="subtitle1" className={clsx("text-base font-bold")}>sign in with your email</Typography>
            <div className={clsx(classes.separateBar, 'left')} />
            <div className={clsx(classes.separateBar, 'right')} />
          </div>
          <EmailSignIn />
        </div>
      </Card>
    </div>
  )
}

export default SignIn;