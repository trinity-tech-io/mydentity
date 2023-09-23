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

export const EmailSignIn: FC = () => {
  const emailInputRef = useRef(null);
  const [authEmailSent, setAuthEmailSent] = useState(false);
  const emailForm = useRef(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const doEmailAuth = async (): Promise<void> => {
    const emailAddress = emailInputRef.current.value;

    if (emailAddress !== "") {
      setAuthEmailSent(true);

      setOnGoingFlowOperation(FlowOperation.EmailSignIn);

      try {
        void (await authenticateWithEmailAddress(emailAddress));
      } catch (error) {
        if (error instanceof InexistingEmailException) {
          setErrorMsg("This email address is unknown.");
        } else {
          setErrorMsg("Unknown error, please try again.");
        }

        setAuthEmailSent(false);
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
      {!authEmailSent && (
        <form onSubmit={onEmailSubmit} ref={emailForm} className="w-full my-4">
          <FormControlStyled variant="standard" className="w-full">
            <InputLabel shrink>Input email address</InputLabel>
            <OutlinedInput
              id="email-address"
              size="small"
              placeholder="Your email address"
              className="w-full"
              inputProps={{ ref: emailInputRef }}
            />
          </FormControlStyled>
        </form>
      )}
      <div className="py-4 w-full">
        {!authEmailSent && (
          <DarkButton
            startIcon={<ReactIcon icon="material-symbols:key" />}
            onClick={doEmailAuth}
            className="w-full mt-4"
          >
            Send magic key to email
          </DarkButton>
        )}
      </div>
      {authEmailSent && (
        <div className="text-center mt-10">
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
