import { MainButton } from '@components/generic/MainButton';
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Icon as ReactIcon } from '@iconify/react';
import { ExistingEmailException } from "@model/exceptions/existing-email-exception";
import { Container, InputBase } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";
import { authUser$ } from "@services/user/user.events";
import { EmailFormBox, RequestActionState } from '@/app/(pages)/signin/widgets/EmailSignIn';
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
  const [reqState, setReqState] = useState<RequestActionState>(
    RequestActionState.INIT
  );
  const [activeUser] = useBehaviorSubject(authUser$);
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();

  const doEmailAuth = async (): Promise<void> => {
    setErrorMsg("");
    const emailAddress = emailInputRef.current.value;

    if (emailAddress !== "") {
      setReqState(RequestActionState.SENDING);

      setOnGoingFlowOperation(FlowOperation.OnBoardingEmailBinding);

      try {
        void await activeUser?.get('email').bindWithEmailAddress(emailAddress);
        setReqState(RequestActionState.RESULT);
      } catch (error) {
        if (error instanceof ExistingEmailException) {
          router.push('/account/security?error=emailExists')
        } else {
          router.push('/account/security?error=unknown')
        }
        setReqState(RequestActionState.INIT);
      }
    }
  };

  const formBoxProps = { emailInputRef, reqState, doEmailAuth, errorMsg }
  return (
    <EmailFormBox {...formBoxProps} actionName="Send temporary link" />
  );
};

export default BindEmailOnly;
