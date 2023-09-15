'use client';

import {useBehaviorSubject} from "@hooks/useBehaviorSubject";
import {ActivityType} from "@model/activity/activity-type";
import {Typography} from "@mui/material";
import {authUser$} from "@services/user/user.events";
import {checkRawEmailAuthenticationKey, isSignedIn} from "@services/user/user.service";
import {decode} from '@utils/slugid';
import {useRouter, useSearchParams} from "next/navigation";
import {FC, useEffect, useState} from 'react';
import {UserEmailProvider} from "@model/user-email/user-email-provider";

const CheckAuthKey: FC = () => {
  const searchParams = useSearchParams();
  const encodedAuthKey = searchParams.get('key');
  const authKey = encodedAuthKey ? decode(encodedAuthKey as string) : null;
  const [authError, setAuthError] = useState(false);
  const [logined, setLogined] = useState(false);
  const [activeUser] = useBehaviorSubject(authUser$);
  const router = useRouter();

  useEffect(() => {
    if (authKey) {
      if (!isSignedIn()) {
        void checkRawEmailAuthenticationKey(authKey).then(authenticated => {
          if (authenticated) {
            activeUser?.get('activity').createActivity({type: ActivityType.USER_SIGN_IN, userEmailProvider: UserEmailProvider.RAW}).then(activity => {
              router.push('/dashboard');
            }).catch(e => {
              router.push('/dashboard'); // Still means success.
            })
          } else
            setAuthError(true);
        });
      } else {
        setLogined(true);
        void activeUser?.get('email').checkRawEmailBind(authKey).then(bound => {
          if (bound) {
            router.push('/account/security');
          } else
            setAuthError(true);
        });
      }
    }
  }, [authKey, activeUser, router]);

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