import { DarkButton } from "@components/button";
import { Icon as ReactIcon } from "@iconify/react";
import { InexistingEmailException } from "@model/exceptions/inexisting-email-exception";
import { FormControl, InputLabel, OutlinedInput, styled } from "@mui/material";
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";
import { authenticateWithEmailAddress } from "@services/user/user.service";
import { FC, FormEvent, useRef, useState } from "react";

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  paddingTop: "1.2rem",
  input: {
    color: "white",
  },
  ".MuiOutlinedInput-root": {
    fieldset: {
      opacity: 0.6,
      borderColor: "white",
    },
  },
  ".MuiOutlinedInput-root.Mui-focused, .MuiOutlinedInput-root:hover:not(.Mui-disabled, .Mui-error)":
    {
      fieldset: {
        opacity: 0.8,
        borderColor: "white",
      },
    },
  ".MuiOutlinedInput-root.Mui-disabled": {
    opacity: 0.5,
    input: {
      WebkitTextFillColor: "white",
      textFillColor: "white",
    },
    fieldset: {
      borderColor: "white",
    },
  },
  ".MuiInputLabel-root, .MuiInputLabel-root.Mui-focused:not(.Mui-error)": {
    color: "white",
    fontSize: "10px",
    transform: "unset",
    WebkitTransform: "unset",
  },
  "#email-address": {
    fontWeight: 600,
    fontSize: "13pt",
    caretColor: "white",
    color: "rgb(255 255 255 / 65%)",
  },
}));

enum RequestActionState {
  INIT = 0,
  SENDING = 1,
  RESULT = 2,
}
export const EmailSignIn: FC = () => {
  const emailInputRef = useRef(null);
  const [reqState, setReqState] = useState<RequestActionState>(
    RequestActionState.INIT
  );
  const emailForm = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const doEmailAuth = async (): Promise<void> => {
    setErrorMsg("");
    const emailAddress = emailInputRef.current.value;

    if (emailAddress !== "") {
      setReqState(RequestActionState.SENDING);

      setOnGoingFlowOperation(FlowOperation.EmailSignIn);

      try {
        void (await authenticateWithEmailAddress(emailAddress));
        setReqState(RequestActionState.RESULT);
      } catch (error) {
        if (error instanceof InexistingEmailException) {
          setErrorMsg("This email address is unknown.");
        } else {
          setErrorMsg("Unknown error, please try again.");
        }
        setReqState(RequestActionState.INIT);
      }
    }
  };

  async function onEmailSubmit(ev?: FormEvent): Promise<void> {
    ev?.preventDefault();
    emailInputRef.current.blur();

    await doEmailAuth();
  }

  return (
    <>
      {reqState !== RequestActionState.RESULT ? (
        <form onSubmit={onEmailSubmit} ref={emailForm} className="w-full my-2">
          <FormControlStyled variant="standard" className="w-full">
            <InputLabel shrink>Input email address</InputLabel>
            <OutlinedInput
              id="email-address"
              size="small"
              placeholder="Your email address"
              className="w-full"
              disabled={reqState === RequestActionState.SENDING}
              inputProps={{ ref: emailInputRef }}
            />
          </FormControlStyled>
          <div className="py-4 mt-4 w-full">
            <DarkButton
              id="send-button"
              loading={reqState === RequestActionState.SENDING}
              startIcon={
                reqState !== RequestActionState.SENDING ? (
                  <ReactIcon icon="material-symbols:key" />
                ) : null
              }
              onClick={doEmailAuth}
              className="w-full mt-4"
            >
              Send magic key to email
            </DarkButton>
          </div>
        </form>
      ) : (
        <div className="text-sm text-center text-white">
          Magic link sent, please check your mailbox.
        </div>
      )}
      {errorMsg && (
        <>
          <div className="text-red-600">{errorMsg}</div>
        </>
      )}
    </>
  );
};

export default EmailSignIn;
