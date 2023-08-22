'use client';

import { LinearProgress } from "@mui/material";
import { FlowOperation, getOnGoingFlowOperation } from "@services/flow.service";
import { bindOauthEmail, isLogined } from "@services/user/user.service";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";

const BindOauth: FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const currentFlowOperation = getOnGoingFlowOperation();
  const router = useRouter();

  // TODO @yufei: don't check logined or not. Use the "flow operation" like the example below
  useEffect(() => {
    const logined = isLogined();
    if (logined) { // email binding if logined.
      if (email) {
        bindOauthEmail(email).then(success => {
          if (!success) {
            alert('Failed to bind oauth email.');
          }
          window.location.replace('/account/security');
        });
      }
    } else { // login if not login.
      window.location.replace(`/dashboard?accessToken=${accessToken}&refreshToken=${refreshToken}`);
    }
  }, [])

  switch (currentFlowOperation) {
    // User email bound during the on boarding. Now redirect to prompt for password
    case FlowOperation.OnBoardingEmailBinding:
      router.push("/onboarding/bind-email-password");
      break;
  }

  return (<div className="col-span-full">
    <div className={"flex flex-col w-full"}>
      <div className="italic">Checking authentication, hold on...</div>
      <LinearProgress />
    </div>
  </div>)
}

export default BindOauth;