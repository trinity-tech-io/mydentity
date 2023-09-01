'use client';

import {LinearProgress} from "@mui/material";
import {clearOnGoingFlowOperation, FlowOperation, getOnGoingFlowOperation} from "@services/flow.service";
import {useRouter, useSearchParams} from "next/navigation";
import {FC, useEffect} from "react";
import {oauthMSBindEmail, oauthMSSignIn} from "@services/user/user.service";
import {EmailExistsException} from "@model/exceptions/email-exists-exception";
import {EmailNotExistsException} from "@model/exceptions/email-not-exists-exception";

const MicrosoftRedirect: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      alert('MicrosoftRedirect: No code from microsoft authentication callback.');
      return;
    }

    const op = getOnGoingFlowOperation();

    console.log('oauth', 'op', op);

    switch (op) {
      case FlowOperation.OnBoardingEmailBinding:
        {
          clearOnGoingFlowOperation();
          oauthMSBindEmail(code).then(result => {
            if (result) {
              router.push('/account/security');
            } else {
              router.push('/account/security?error=unknown');
            }
          }).catch((e) => {
            if (e instanceof EmailExistsException) {
              router.push('/account/security?error=emailExists');
            }
          });
        }
        break;
      case FlowOperation.OnBoardingEmailSignIn:
        {
          clearOnGoingFlowOperation();
          oauthMSSignIn(code).then(result => {
            if (result) {
              router.push(`/dashboard`);
            } else {
              router.push(`/signin?error=unknown`);
            }
          }).catch((e) => {
            if (e instanceof EmailNotExistsException) {
              router.push(`/signin?error=oauthEmailNotExists`);
            }
          });
        }
        break;
      default:
        alert('Invalid operation, please try again.');
        return;
    }
  }, []);

  return (<div className="col-span-full">
    <div className={"flex flex-col w-full"}>
      <div className="italic">Checking authentication, hold on...</div>
      <LinearProgress />
    </div>
  </div>)
}

export default MicrosoftRedirect;