'use client';
import { Icon as ReactIcon } from '@iconify/react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { MainButton } from '@components/MainButton';

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

  const signInWithMicrosoft = () => {
    window.location.replace(`${process.env.NEXT_PUBLIC_BACKEND_URL}/microsoft`);
  };
  return (
    <div className={clsx(classes.centeredContainer, 'relative')}>
      <MainButton
        leftIcon={<ReactIcon icon="logos:microsoft-icon" />}
        onClick={signInWithMicrosoft}
      >
        Sign in with Microsoft
      </MainButton>
    </div>
  );
};

export default MicrosoftSignIn;

