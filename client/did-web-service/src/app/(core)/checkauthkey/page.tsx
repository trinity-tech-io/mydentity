'use client';

import { Typography } from '@mui/material';
import { checkEmailAuthenticationKey, checkEmailBind, isLogined } from "@services/user/user.service";
import { decode } from '@utils/slugid';
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from 'react';

const CheckAuthKey: FC = () => {
  const searchParams = useSearchParams();
  const encodedAuthKey = searchParams.get('key');
  const authKey = encodedAuthKey ? decode(encodedAuthKey as string) : null;
  const [authError, setAuthError] = useState(false);
  const [logined, setLogined] = useState(false);

  useEffect(() => {
    if (authKey) {
      if (!isLogined()) {
        void checkEmailAuthenticationKey(authKey).then(authenticated => {
          if (authenticated) {
            window.location.replace('/dashboard');
          } else
            setAuthError(true);
        });
      } else {
        setLogined(true);
        void checkEmailBind(authKey).then(bound => {
          if (bound) {
            window.location.replace('/account/security');
          } else
            setAuthError(true);
        });
      }
    }
  }, [authKey]);

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