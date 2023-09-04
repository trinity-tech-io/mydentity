import { MainButton } from '@components/generic/MainButton';
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Icon as ReactIcon } from '@iconify/react';
import { ExistingEmailException } from "@model/exceptions/existing-email-exception";
import { Container, InputBase } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";
import { authUser$ } from "@services/user/user.events";
import clsx from 'clsx';
import { useRouter } from "next/navigation";
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

export const BindEmailOnly: FC = () => {
  const emailInputRef = useRef(null);
  const [authEmailSent, setAuthEmailSent] = useState(false);
  const emailForm = useRef(null);
  const classes = useStyles();
  const [activeUser] = useBehaviorSubject(authUser$());
  const router = useRouter();

  const doEmailAuth = async () => {
    const emailAddress = emailInputRef.current.value;

    if (emailAddress !== "") {
      setAuthEmailSent(true);

      setOnGoingFlowOperation(FlowOperation.OnBoardingEmailBinding);

      try {
        void await activeUser?.get('email').bindWithEmailAddress(emailAddress);
      } catch (error) {
        if (error instanceof ExistingEmailException) {
          router.push('/account/security?error=emailExists')
        } else {
          router.push('/account/security?error=unknown')
        }
      }
    }
  }

  async function onEmailSubmit(ev?: FormEvent) {
    ev?.preventDefault();
    emailInputRef.current.blur();

    await doEmailAuth();
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

export default BindEmailOnly;
