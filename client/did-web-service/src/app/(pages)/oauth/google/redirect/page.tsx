'use client';

import { ExistingEmailException } from "@model/exceptions/existing-email-exception";
import { InexistingEmailException } from "@model/exceptions/inexisting-email-exception";
import { LinearProgress } from "@mui/material";
import { clearOnGoingFlowOperation, FlowOperation, getOnGoingFlowOperation, usePostSignInFlow } from "@services/flow.service";
import { oauthGoogleBindEmail, oauthGoogleSignIn } from "@services/user/user.service";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";

const MicrosoftRedirect: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();

  useEffect(() => {
    if (!code) {
      alert('GoogleRedirect: No code from Google authentication callback.');
      return;
    }

    const op = getOnGoingFlowOperation();
    switch (op) {
      case FlowOperation.OnBoardingEmailBinding:
        {
          oauthGoogleBindEmail(code).then(result => {
            if (result) {
              router.push('/account/security');
            } else {
              clearOnGoingFlowOperation();
              router.push('/account/security?error=unknown');
            }
          }).catch((e) => {
            if (e && e instanceof ExistingEmailException) {
              clearOnGoingFlowOperation();
              router.push('/account/security?error=emailExists');
            } else {
              clearOnGoingFlowOperation();
              router.push('/account/security?error=unknown');
            }
          });
        }
        break;
      case FlowOperation.EmailSignIn:
        {
          oauthGoogleSignIn(code).then(user => {
            if (user) {
              clearOnGoingFlowOperation();
              navigateToPostSignInLandingPage();
            } else {
              clearOnGoingFlowOperation();
              router.push(`/signin?error=unknownGoogle`);
            }
          }).catch((e) => {
            if (e instanceof InexistingEmailException) {
              clearOnGoingFlowOperation();
              router.push(`/signin?error=oauthGoogleEmailNotExists`);
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