import { MainButton } from '@components/MainButton';
import { Icon as ReactIcon } from '@iconify/react';
import { InputBase , Container} from '@material-ui/core';
import {authenticateWithEmailAddress, bindWithEmailAddress} from "@services/user/user.service";
import { FC, FormEvent, useRef, useState } from "react";
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';

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
      {!authEmailSent && <form onSubmit={onEmailSubmit} ref={emailForm}>
          <InputBase
            inputRef={emailInputRef}
            placeholder="Input email address"
            className="flex flex-1 px-11 py-4 my-8 bg-gray-200 rounded-8"
            type='email'
            name="email"
          />
        </form>
      }
      {!authEmailSent &&
        <MainButton
          leftIcon={<ReactIcon icon="material-symbols:key" />}
          onClick={doEmailAuth}
        >
          Send magic key to email
        </MainButton>
      }
    {authEmailSent && <div className='text-center mt-10'>Magic link sent, please check your mailbox.</div>}
    </Container>
  );
};

export default EmailSignIn;
