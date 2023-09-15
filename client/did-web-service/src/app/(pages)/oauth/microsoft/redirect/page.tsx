'use client';

import {ActivityType} from "@model/activity/activity-type";
import {ExistingEmailException} from "@model/exceptions/existing-email-exception";
import {InexistingEmailException} from "@model/exceptions/inexisting-email-exception";
import {LinearProgress} from "@mui/material";
import {clearOnGoingFlowOperation, FlowOperation, getOnGoingFlowOperation} from "@services/flow.service";
import {oauthMSBindEmail, oauthMSSignIn} from "@services/user/user.service";
import {useRouter, useSearchParams} from "next/navigation";
import {FC, useEffect} from "react";
import {UserEmailProvider} from "@model/user-email/user-email-provider";

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
    switch (op) {
      case FlowOperation.OnBoardingEmailBinding:
        {
          oauthMSBindEmail(code).then(result => {
            if (result) {
              clearOnGoingFlowOperation();
              router.push('/account/security');
            } else {
              clearOnGoingFlowOperation();
              router.push('/account/security?error=unknown');
            }
          }).catch((e) => {
            if (e instanceof ExistingEmailException) {
              clearOnGoingFlowOperation();
              router.push('/account/security?error=emailExists');
            }
          });
        }
        break;
      case FlowOperation.EmailSignIn:
        {
          oauthMSSignIn(code).then(user => {
            if (user) {
              user.get('activity').createActivity({ type: ActivityType.USER_SIGN_IN, userEmailProvider: UserEmailProvider.MICROSOFT }).then(activity => {
                clearOnGoingFlowOperation();
                router.push(`/dashboard`);
              }).catch(e => {
                clearOnGoingFlowOperation();
                router.push(`/dashboard`);
              })
            } else {
              clearOnGoingFlowOperation();
              router.push(`/signin?error=unknown`);
            }
          }).catch((e) => {
            if (e instanceof InexistingEmailException) {
              clearOnGoingFlowOperation();
              router.push(`/signin?error=oauthEmailNotExists`);
            }
          });
        }
        break;
      default:
        alert('Invalid operation, please try again.');
        return;
    }
  }, [code, router]);

  return (<div className="col-span-full">
    <div className={"flex flex-col w-full"}>
      <div className="italic">Checking authentication, hold on...</div>
      <LinearProgress />
    </div>
  </div>)
}

export default MicrosoftRedirect;