'use client';

import {LinearProgress} from "@mui/material";
import {useRouter, useSearchParams} from "next/navigation";
import {FC, useEffect} from "react";
import {logger} from "@services/logger";
import {fetchSelfUser} from "@services/user/user.service";

const OauthConfirmation: FC = () => {
  const searchParams = useSearchParams();
  const action = searchParams.get('action');
  const error = searchParams.get('error');
  const router = useRouter();

  logger.log(`enter oauth/confirmation, action=${action}`);

  useEffect(() => {
    if (!action || !['bind', 'login'].includes(action)) {
      alert('invalid action, please check and try again.');
      return;
    }

    if (error === 'emailNotExists' || error === 'emailAlreadyExists') {
      if (action === 'login') {
        router.push(`/signin?error=oauthEmailNotExists`);
      } else { // bind
        router.push(`/account/security?error=emailExists`);
      }
    } else {
      if (action === 'login') {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        if (accessToken && accessToken !== '' && refreshToken && refreshToken != '') {
          fetchSelfUser(accessToken, refreshToken).then(user => {
            router.push('/dashboard');
          });
        } else {
          alert('invalid operation (access token not provided), please try again.');
        }
      } else {
        router.push('/account/security');
      }
    }
  }, []);

  return (<div className="col-span-full">
    <div className={"flex flex-col w-full"}>
      <div className="italic">Checking authentication, hold on...</div>
      <LinearProgress />
    </div>
  </div>)
}

export default OauthConfirmation;