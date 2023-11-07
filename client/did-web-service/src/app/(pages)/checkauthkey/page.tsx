"use client";
import { FC, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactPinField from "react-pin-field";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Headline from "@components/layout/Headline";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { AppException } from "@model/exceptions/app-exception";
import { AuthExceptionCode } from "@model/exceptions/exception-codes";
import { usePostSignInFlow } from "@services/flow.service";
import { authUser$ } from "@services/user/user.events";
import { checkTemporaryAuthenticationKey } from "@services/user/user.service";
import { decode } from "@utils/slugid";
import { DarkButton } from "@components/button";
import { useToast } from "@services/feedback.service";
import { ColorMap } from "@/app/theming/palette";

const PinInputWrapper = styled(Box)(({ theme }) => ({
  ".pin-field": {
    backgroundColor: ColorMap[theme.palette.mode].GREY0,
    border: "1px solid #99999990",
    borderRadius: 4,
    fontSize: "2rem",
    margin: "0.25rem",
    height: "3.5rem",
    outline: "none",
    textAlign: "center",
    transitionDuration: "100ms",
    transitionProperty: "background, color, border, box-shadow, transform",
    width: "3rem",
    "&:focus": {
      borderColor: "rgb(0, 123, 255)",
      outline: "none",
      transform: "scale(1.05)",
    },
    "&:invalid": {
      animation: "shake 3 linear 75ms",
      borderColor: "rgb(220, 53, 69)",
      boxShadow: "0 0 0.25rem rgba(220, 53, 69, 0.5)",
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
  // "swd-pin-field[completed] .pin-field": {
  //   borderColor: "rgb(40, 167, 69)",
  //   backgroundColor: "rgba(40, 167, 69, 0.1)",
  // },
  "@keyframes shake": {
    from: {
      transform: "scale(1.05) translateY(-5%)",
    },
    to: {
      transform: "scale(1.05) translateY(5%)",
    },
  },
}));
const CheckAuthKey: FC = () => {
  const searchParams = useSearchParams();
  const encodedAuthKey = searchParams.get("key");
  const authKey = encodedAuthKey ? decode(encodedAuthKey as string) : null;
  const [authenticating, setAuthenticating] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();
  const [activeUser] = useBehaviorSubject(authUser$);
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();
  const { showErrorToast } = useToast();

  const handleCheckException = (e: Error): void => {
    setAuthenticating(false);
    if (e instanceof AppException) {
      switch (e.appExceptionCode) {
        case AuthExceptionCode.InvalidPINCode:
          showErrorToast("Invalid PIN code");
          return;
        case AuthExceptionCode.InexistingAuthKey:
          showErrorToast("This link is inexisting or expired");
          return;
      }
    }

    // All unreturned cases
    showErrorToast("Unexpected error");
  };

  const checkPin = (userPin: string): void => {
    setAuthenticating(true);

    if (!activeUser) {
      // sign in operation
      checkTemporaryAuthenticationKey(authKey, userPin)
        .then((authenticated) => {
          if (authenticated) {
            navigateToPostSignInLandingPage();
          } else {
            showErrorToast("Unexpected error");
            setAuthenticating(false);
          }
        })
        .catch((e) => {
          handleCheckException(e);
        });
    } else {
      // bind email operation
      setSignedIn(true);
      activeUser
        .get("email")
        .checkRawEmailBind(authKey, userPin)
        .then((bound) => {
          if (bound) {
            router.push("/account/security");
          } else {
            showErrorToast("Unexpected error");
            setAuthenticating(false);
          }
        })
        .catch((e) => {
          handleCheckException(e);
        });
    }
  };

  const handleCheckPin = (): void => {
    if (pinCode.length == 6) checkPin(pinCode);
  };

  const handleInputPin = (code: string): void => {
    setPinCode(code);

    // Automatically try to authenticate after entering the 6th digit
    if (code.length == 6 && !authenticating) checkPin(code);
  };
  return (
    <div>
      <Headline
        title="Sign in from another browser"
        description="Kindly enter the 6-digit PIN that was provided when generating a sign-in link for another browser"
        showBg={true}
      />
      <Stack
        alignItems="center"
        className="max-w-sm m-auto"
        sx={{ pt: { xs: 2, sm: 4 } }}
      >
        <Typography variant="subtitle1">Enter PIN Code</Typography>
        <PinInputWrapper>
          <ReactPinField
            autoFocus
            length={6}
            className="pin-field"
            onChange={handleInputPin}
            disabled={authenticating || undefined}
            validate={/\d/}
          />
        </PinInputWrapper>
        <div className="px-2 sm:px-12 w-full mt-8">
          <DarkButton
            loading={authenticating}
            disabled={pinCode.length < 6}
            className="w-full"
            onClick={handleCheckPin}
          >
            CONFIRM
          </DarkButton>
        </div>
      </Stack>
    </div>
  );
};
export default CheckAuthKey;
