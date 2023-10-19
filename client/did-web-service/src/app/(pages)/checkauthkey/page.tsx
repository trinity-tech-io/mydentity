'use client';

import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { AppException } from "@model/exceptions/app-exception";
import { AuthExceptionCode } from "@model/exceptions/exception-codes";
import { CircularProgress, TextField, Typography } from "@mui/material";
import { usePostSignInFlow } from "@services/flow.service";
import { authUser$ } from "@services/user/user.events";
import { checkRawEmailAuthenticationKey } from "@services/user/user.service";
import { decode } from '@utils/slugid';
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FC, useState } from 'react';

const CheckAuthKey: FC = () => {
  const searchParams = useSearchParams();
  const encodedAuthKey = searchParams.get('key');
  const authKey = encodedAuthKey ? decode(encodedAuthKey as string) : null;
  const [authenticating, setAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string>(null);
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();
  const [activeUser] = useBehaviorSubject(authUser$);
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();

  const handleCheckException = (e: Error): void => {
    setAuthenticating(false);
    if (e instanceof AppException) {
      switch (e.appExceptionCode) {
        case AuthExceptionCode.InvalidPINCode:
          setAuthError("Invalid PIN code");
          return;
        case AuthExceptionCode.InexistingAuthKey:
          setAuthError("This link is inexisting or expired");
          return;
      }
    }

    // All unreturned cases
    setAuthError("Unexpected error");
  }

  const checkPin = (userPin: string): void => {
    setAuthenticating(true);

    if (!activeUser) { // sign in operation
      checkRawEmailAuthenticationKey(authKey, userPin).then(authenticated => {
        if (authenticated) {
          navigateToPostSignInLandingPage();
        } else {
          setAuthError("Unexpected error");
          setAuthenticating(false);
        }
      }).catch(e => {
        handleCheckException(e);
      });
    } else { // bind email operation
      setSignedIn(true);
      activeUser.get("email").checkRawEmailBind(authKey, userPin).then(bound => {
        if (bound) {
          router.push('/account/security');
        } else {
          setAuthError("Unexpected error");
          setAuthenticating(false);
        }
      }).catch(e => {
        handleCheckException(e);
      });
    }
  }

  const onPinChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setAuthError(null);

    const userPin = event.currentTarget?.value;

    // Automatically try to authenticate after entering the 6th digit
    if (userPin.length == 6)
      checkPin(userPin);
  };

  return (
    <div className='w-full'>
      <Typography variant="h4">Enter PIN code</Typography>
      <Typography>(This is the 6 digit PIN code provided earlier, not your account password)</Typography>

      <div className="flex flex-row items-center mt-4">
        <TextField
          autoFocus
          onChange={onPinChange}
          margin="dense"
          id="pinCode"
          label="PIN Code"
          variant="outlined"
          autoComplete="off"
          disabled={authenticating}
        />
        {authenticating && <div className="ml-4">
          <CircularProgress size={20} />
        </div>}
      </div>

      {
        authError &&
        <Typography className='w-full text-red-500 mt-4'>
          {authError}
        </Typography>
      }
    </div>
  )

  return (
    <div></div>
  );
}
export default CheckAuthKey;