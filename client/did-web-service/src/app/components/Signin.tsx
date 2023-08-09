"use client"

import { Icon as ReactIcon } from '@iconify/react';
import { Button, Card, createStyles, InputBase, makeStyles, Typography, useMediaQuery, withStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FC, FormEvent, useRef, useState } from 'react';

const useStyles = makeStyles(theme => ({
  bgLightGray: {
    background: 'rgba(246, 246, 246, 0.7)',
    position: "fixed",
    top: '0',
    left: '50%',
    width: '300px',
    height: '300px',
    margin: '-150px 0 0 0'
  },
  separateBar: {
    position: 'absolute',
    top: 0,
    width: 80,
    borderBottom: '1px solid #C4C4C4',
    height: 24,
    '&.left': {
      left: -70
    },
    '&.right': {
      right: -70
    }
  }
}))
const StyledButton = withStyles((theme) => createStyles({
  startIcon: {
    marginRight: 16
  }
}))((props: any) => (
  <Button
    size="large"
    variant="contained"
    color="primary"
    className='my-8 rounded-12 text-base font-bold px-32 justify-start'
    {...props}
  />
));

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
    <Card className={clsx(classes.bgLightGray, 'py-40 w-full text-center min-h-full')} elevation={0}>
      <Typography variant="h2" className='w-full text-center font-bold'>
        Sign in 🚪
      </Typography>
      <Typography variant="h5" className='w-full text-center font-semibold mt-32 mb-24 leading-9'>
        Hello! 👋<br />Welcome to did-web-service !
      </Typography>
      <div className='inline-flex flex-col mb-16'>
        {/*<StyledButton*/}
        {/*  startIcon={<ReactIcon icon="logos:google-icon" />}*/}
        {/*  onClick={signInWithGoogle}>*/}
        {/*  Sign in with Google*/}
        {/*</StyledButton>*/}
        <StyledButton
          startIcon={<ReactIcon icon="logos:microsoft-icon" />}
          onClick={signInWithMicrosoft}>
          Sign in with Microsoft
        </StyledButton>
        {/*<StyledButton*/}
        {/*  startIcon={<ReactIcon icon="la:linkedin-in" style={{ background: '#0A66C2', borderRadius: 2 }} />}*/}
        {/*  onClick={signInWithLinkedIn}>*/}
        {/*  Sign in with LinkedIn*/}
        {/*</StyledButton>*/}
        {/*<div className="relative">*/}
        {/*  <Typography variant="subtitle1" className={clsx(classes.bgLightGray, "text-base font-bold my-12 bg")}>or sign in with your email</Typography>*/}
        {/*  <div className={clsx(classes.separateBar, 'left')} />*/}
        {/*  <div className={clsx(classes.separateBar, 'right')} />*/}
        {/*</div>*/}
        {/*<EmailSignIn />*/}
      </div>
      <Typography variant="body1" color="textSecondary">
        Signing up for an account means you agree to the <br />
        <b>Privacy Policy</b> and <b>Terms of Service</b>.
      </Typography>
    </Card>
  )
}
export default SignIn;