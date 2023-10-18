'use client';

import { UserEmailFeature } from "@model/user/features/email/user-email.feature";
import { TextField, Typography } from "@mui/material";
import { usePostSignInFlow } from "@services/flow.service";
import { checkRawEmailAuthenticationKey, isSignedIn } from "@services/user/user.service";
import { decode } from '@utils/slugid';
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FC, useState } from 'react';

const CheckAuthKey: FC = () => {
  const searchParams = useSearchParams();
  const encodedAuthKey = searchParams.get('key');
  const authKey = encodedAuthKey ? decode(encodedAuthKey as string) : null;
  const [authenticating, setAuthenticating] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();

  const checkPin = (): void => {
    setAuthenticating(true);
    if (!isSignedIn()) { // login
      void checkRawEmailAuthenticationKey(authKey).then(authenticated => {
        if (authenticated) {
          navigateToPostSignInLandingPage();
        } else
          setAuthError(true);
      });
    } else { // bind email
      setSignedIn(true);
      UserEmailFeature.checkRawEmailBind(authKey).then(bound => {
        if (bound) {
          router.push('/account/security');
        } else
          setAuthError(true);
      });
    }
  }

  const onPinChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const userPin = event.currentTarget?.value;

    // Automatically try to authenticate after entering the 6th digit
    if (userPin.length == 6)
      checkPin();
  };

  return (
    <div className='w-full'>
      {
        !authenticating && <>
          <Typography variant="h4">Enter PIN code</Typography>
          <Typography>(This is the 6 digit PIN code provided earlier, not your account password)</Typography>
          <TextField
            autoFocus
            onChange={onPinChange}
            margin="dense"
            id="pinCode"
            label="PIN Code"
            variant="outlined"
            autoComplete="off"
          />
        </>
      }
      {
        authenticating && <>
          {
            !authError &&
            <Typography variant="h4" className='w-full text-center'>
              {signedIn ? 'Bind email' : 'Signing In'}...
            </Typography>
          }
          {
            authError &&
            <Typography variant="h6" className='w-full text-center'>
              Sorry, unable to {signedIn ? 'bind your email' : 'sign you in'}. Your magic link is possibly expired.
            </Typography>
          }
        </>
      }
    </div>
  )

  return (
    <div></div>
  );
}
export default CheckAuthKey;