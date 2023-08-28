'use client';

import {LinearProgress} from "@mui/material";
import {clearOnGoingFlowOperation, FlowOperation, getOnGoingFlowOperation} from "@services/flow.service";
import {useRouter, useSearchParams} from "next/navigation";
import {FC, useEffect} from "react";
import {getAccessToken} from "@services/user/user.events";

const MicrosoftRedirect: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      alert('MicrosoftRedirect: No token from microsoft authentication.');
      return;
    }

    let action = null;
    const op = getOnGoingFlowOperation();

    console.log('oauth', 'op', op);

    switch (op) {
      case FlowOperation.OnBoardingEmailBinding:
        clearOnGoingFlowOperation();
        action = 'bind';
        break;
      case FlowOperation.OnBoardingEmailSignIn:
        clearOnGoingFlowOperation();
        action = 'login';
        break;
      default:
        alert('Invalid operation, please try again.');
        return;
    }

    let redirectUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/microsoft/redirectBack?token=${token}&action=${action}`;
    const accessToken = getAccessToken();
    if (accessToken)
      redirectUrl += `&accessToken=${accessToken}`;

    router.push(redirectUrl);
  }, []);

  return (<div className="col-span-full">
    <div className={"flex flex-col w-full"}>
      <div className="italic">Checking authentication, hold on...</div>
      <LinearProgress />
    </div>
  </div>)
}

export default MicrosoftRedirect;