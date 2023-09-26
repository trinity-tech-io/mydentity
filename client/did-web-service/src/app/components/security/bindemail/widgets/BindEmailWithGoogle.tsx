'use client';
import { MainButton } from '@components/generic/MainButton';
import { Icon as ReactIcon } from '@iconify/react';
import { makeStyles } from '@mui/styles';
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";
import clsx from 'clsx';
import { useRouter } from "next/navigation";
import { FC } from 'react';

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '6vh',
  },
}));

const BindEmailWithGoogle: FC = () => {
  const classes = useStyles();
  const router = useRouter();

  const signInWithGoogle = (): void => {
    setOnGoingFlowOperation(FlowOperation.OnBoardingEmailBinding);
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/google`);
  };

  return (
    <div className={clsx(classes.centeredContainer, 'relative')}>
      <MainButton
        leftIcon={<ReactIcon icon="logos:google-icon" />}
        onClick={signInWithGoogle}
      >
        Bind email with Google
      </MainButton>
    </div>
  );
};

export default BindEmailWithGoogle;

