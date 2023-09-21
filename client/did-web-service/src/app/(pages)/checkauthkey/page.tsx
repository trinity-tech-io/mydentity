'use client';

import { Typography } from "@mui/material";
import { checkRawEmailAuthenticationKey, isSignedIn } from "@services/user/user.service";
import { decode } from '@utils/slugid';
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from 'react';
import { UserEmailFeature } from "@model/user/features/email/user-email.feature";
import { usePostSignInFlow } from "@services/flow.service";

const CheckAuthKey: FC = () => {
  const searchParams = useSearchParams();
  const encodedAuthKey = searchParams.get('key');
  const authKey = encodedAuthKey ? decode(encodedAuthKey as string) : null;
  const [authError, setAuthError] = useState(false);
  const [logined, setLogined] = useState(false);
  const router = useRouter();
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();

  useEffect(() => {
    if (authKey) {
      if (!isSignedIn()) { // login
        void checkRawEmailAuthenticationKey(authKey).then(authenticated => {
          if (authenticated) {
            navigateToPostSignInLandingPage();
          } else
            setAuthError(true);
        });
      } else { // bind email
        setLogined(true);
        UserEmailFeature.checkRawEmailBind(authKey).then(bound => {
          if (bound) {
            router.push('/account/security');
          } else
            setAuthError(true);
        });
      }
    }
  }, [authKey, router]);

  return (
    <div className='m-20 w-full'>
      {
        !authError &&
        <Typography variant="h4" className='w-full text-center'>
          {logined ? 'Bind email' : 'Sign In'}...
        </Typography>
      }
      {
        authError &&
        <Typography variant="h6" className='w-full text-center'>
          Sorry, unable to {logined ? 'bind your email' : 'sign you in'}. Your magic link is possibly expired.
        </Typography>
      }
    </div>
  )

  return (
    <div></div>
  );
}
export default CheckAuthKey;