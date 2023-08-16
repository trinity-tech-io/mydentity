'use client';

import { Typography } from '@material-ui/core';
import { decode } from '@utils/slugid';
import { FC, useEffect, useState } from 'react';
import { checkEmailAuthenticationKey } from "@services/user/user.service";
import {useSearchParams} from "next/navigation";

const CheckAuthKey: FC = () => {
  const searchParams = useSearchParams();
  const encodedAuthKey = searchParams.get('key');
  const authKey = encodedAuthKey ? decode(encodedAuthKey as string) : null;
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    if (authKey) {
      void checkEmailAuthenticationKey(authKey).then(authenticated => {
        if (authenticated) {
          window.location.replace('/dashboard');
        } else
          setAuthError(true);
      });
    }
  }, [authKey]);

  return (
    <div className='m-20 w-full'>
      {
        !authError &&
        <Typography variant="h4" className='w-full text-center'>
          Signing in...
        </Typography>
      }
      {
        authError &&
        <Typography variant="h6" className='w-full text-center'>
          Sorry, unable to sign you in. Your magic link is possibly expired.
        </Typography>
      }
    </div>
  )

  return (
      <div></div>
  );
}
export default CheckAuthKey;