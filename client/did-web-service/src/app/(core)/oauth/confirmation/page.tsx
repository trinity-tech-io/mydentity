'use client';

import {LinearProgress} from "@mui/material";
import {useRouter, useSearchParams} from "next/navigation";
import {FC, useEffect} from "react";
import {logger} from "@services/logger";

const OauthConfirmation: FC = () => {
  const searchParams = useSearchParams();
  const action = searchParams.get('action');
  const router = useRouter();

  logger.log(`enter oauth/confirmation, action=${action}`);

  useEffect(() => {
    if (!action || !['bind', 'login'].includes(action)) {
      alert('invalid action, please check and try again.');
      return;
    }

    if (action === 'login') {
      router.push('/dashboard');
    } else {
      router.push('/account/security');
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