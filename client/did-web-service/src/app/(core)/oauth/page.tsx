'use client';

import {LinearProgress} from "@mui/material";
import {clearOnGoingFlowOperation, FlowOperation, getOnGoingFlowOperation} from "@services/flow.service";
import {bindOauthEmail, fetchSelfUser} from "@services/user/user.service";
import {useRouter, useSearchParams} from "next/navigation";
import {FC, useEffect} from "react";

const BindOauth: FC = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');
  const router = useRouter();

  useEffect(() => {
    const op = getOnGoingFlowOperation();
    console.log('oauth', 'op', op);
    switch (op) {
        // User email bound during the on boarding. Now redirect to prompt for password
      case FlowOperation.OnBoardingEmailBinding:
        // router.push("/onboarding/bind-email-password");
        clearOnGoingFlowOperation();

        if (email) {
          bindOauthEmail(email).then(success => {
            if (!success) {
              alert('Failed to bind oauth email.');
            }
            router.push('/account/security');
          });
        } else {
          alert('Invalid operation, please try again.');
        }
        break;
      case FlowOperation.OnBoardingEmailSignIn:
        clearOnGoingFlowOperation();

        if (accessToken && accessToken !== '' && refreshToken && refreshToken != '') {
          fetchSelfUser(accessToken, refreshToken).then(user => {
            router.push('/dashboard');
          });
        } else {
          alert('Invalid operation, please try again..');
        }
        break;
      default:
        alert('Invalid operation, please try again...');
        break;
    }
  }, []);

  return (<div className="col-span-full">
    <div className={"flex flex-col w-full"}>
      <div className="italic">Checking authentication, hold on...</div>
      <LinearProgress />
    </div>
  </div>)
}

export default BindOauth;