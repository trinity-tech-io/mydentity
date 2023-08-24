'use client';

import { Typography } from '@material-ui/core';
import { decode } from '@utils/slugid';
import { FC, useEffect, useState } from 'react';
import {checkEmailAuthenticationKey, isLogined} from "@services/user/user.service";
import {useRouter, useSearchParams} from "next/navigation";
import {useBehaviorSubject} from "@hooks/useBehaviorSubject";
import {authUser$} from "@services/user/user.events";

const CheckAuthKey: FC = () => {
  const searchParams = useSearchParams();
  const encodedAuthKey = searchParams.get('key');
  const authKey = encodedAuthKey ? decode(encodedAuthKey as string) : null;
  const [authError, setAuthError] = useState(false);
  const [logined, setLogined] = useState(false);
  const [activeUser] = useBehaviorSubject(authUser$());
  const router = useRouter();

  useEffect(() => {
    if (authKey) {
      if (!isLogined()) {
        void checkEmailAuthenticationKey(authKey).then(authenticated => {
          if (authenticated) {
            router.push('/dashboard');
          } else
            setAuthError(true);
        });
      } else {
        setLogined(true);
        void activeUser?.get('email').checkEmailBind(authKey).then(bound => {
          if (bound) {
            router.push('/account/security');
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