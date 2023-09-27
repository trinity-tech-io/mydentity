import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { ExistingEmailException } from "@model/exceptions/existing-email-exception";
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";
import { authUser$ } from "@services/user/user.events";
import { EmailFormBox, RequestActionState } from '@/app/(pages)/signin/widgets/EmailSignIn';
import { useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";

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
