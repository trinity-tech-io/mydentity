'use client';
import { Icon as ReactIcon } from '@iconify/react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { MainButton } from '@components/MainButton';
import {FlowOperation, setOnGoingFlowOperation} from "@services/flow.service";

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '10vh',
  },
}));

const BindEmailWithMicrosoft = () => {
  const classes = useStyles();

  const signInWithMicrosoft = () => {
    setOnGoingFlowOperation(FlowOperation.OnBoardingEmailBinding);
    window.location.replace(`${process.env.NEXT_PUBLIC_BACKEND_URL}/microsoft`);
  };

  return (
    <div className={clsx(classes.centeredContainer, 'relative')}>
      <MainButton
        leftIcon={<ReactIcon icon="logos:microsoft-icon" />}
        onClick={signInWithMicrosoft}
      >
        Bind email with Microsoft
      </MainButton>
    </div>
  );
};

export default BindEmailWithMicrosoft;

