'use client';

import { ActivityType } from "@model/activity/activity-type";
import { UserEmailProvider } from "@model/user-email/user-email-provider";
import { ActivityFeature } from "@model/user/features/activity/activity.feature";
import { UserEmailFeature } from "@model/user/features/email/user-email.feature";
import { Typography } from "@mui/material";
import { usePostSignInFlow } from "@services/flow.service";
import { checkRawEmailAuthenticationKey, isSignedIn } from "@services/user/user.service";
import { decode } from '@utils/slugid';
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from 'react';

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
            ActivityFeature.createActivity({ type: ActivityType.USER_SIGN_IN, userEmailProvider: UserEmailProvider.RAW }).then(activity => {
              navigateToPostSignInLandingPage();
            }).catch(e => {
              navigateToPostSignInLandingPage(); // Still means success.
            })
          } else
            setAuthError(true);
        });
      } else { // bind email
        setLogined(true);
        UserEmailFeature.checkRawEmailBind(authKey).then(bound => {
          if (bound) {
            ActivityFeature.createActivity({ type: ActivityType.BIND_EMAIL, userEmailProvider: UserEmailProvider.RAW }).then(activity => {
              router.push('/account/security');
            }).catch(e => {
              router.push('/account/security'); // Still means success.
            })
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