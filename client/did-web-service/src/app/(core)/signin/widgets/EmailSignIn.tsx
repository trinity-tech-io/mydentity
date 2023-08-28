import { MainButton } from '@components/MainButton';
import { Icon as ReactIcon } from '@iconify/react';
import { Container, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";
import { authenticateWithEmailAddress } from "@services/user/user.service";
import clsx from 'clsx';
import { FC, FormEvent, useRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
  centeredContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '20vh',
  },
}));

export const EmailSignIn: FC = () => {
  const emailInputRef = useRef(null);
  const [authEmailSent, setAuthEmailSent] = useState(false);
  const emailForm = useRef(null);
  const classes = useStyles();

  const doEmailAuth = () => {
    const emailAddress = emailInputRef.current.value;

    if (emailAddress !== "") {
      setAuthEmailSent(true);

      setOnGoingFlowOperation(FlowOperation.OnBoardingEmailSignIn);
      void authenticateWithEmailAddress(emailAddress);
    }
  }

  function onEmailSubmit(ev?: FormEvent) {
    ev?.preventDefault();
    emailInputRef.current.blur();

    doEmailAuth();
  }
  return (
    <Container component="div" className={clsx(classes.centeredContainer)}>
      {
        !authEmailSent &&
        <form onSubmit={onEmailSubmit} ref={emailForm} className='w-full my-4'>
          <TextField
            inputRef={emailInputRef}
            label="Your email address"
            placeholder="Input email address"
            className="w-full"
            size='small'
            type='email'
            name="email"
          />
        </form>
      }
      {!authEmailSent &&
        <MainButton
          leftIcon={<ReactIcon icon="material-symbols:key" />}
          onClick={doEmailAuth}
          className="w-full"
        >
          Send magic key to email
        </MainButton>
      }
      {authEmailSent && <div className='text-center mt-10'>Magic link sent, please check your mailbox.</div>}
    </Container>
  );
};

export default EmailSignIn;
