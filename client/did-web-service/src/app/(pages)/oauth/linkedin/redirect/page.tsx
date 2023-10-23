'use client';

import { ExistingEmailException } from "@model/exceptions/existing-email-exception";
import { InexistingEmailException } from "@model/exceptions/inexisting-email-exception";
import { LinearProgress } from "@mui/material";
import { clearOnGoingFlowOperation, FlowOperation, getOnGoingFlowOperation, usePostSignInFlow } from "@services/flow.service";
import { oauthLinkedinBindEmail, oauthLinkedinSignIn } from "@services/user/linkedin/linkedin.auth.service";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect } from "react";

const LinkedinRedirect: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();
  let init = false;

  useEffect(() => {
    // INFO: Another way is set reactStrictMode to false on next.config.js to avoid call userEffect twice.
    if (init) {
      return;
    }
    init = true;

    if (!code) {
      alert('LinkedinRedirect: No code from Linked authentication callback.');
      return;
    }

    const op = getOnGoingFlowOperation();
    switch (op) {
      case FlowOperation.OnBoardingEmailBinding:
        {
          oauthLinkedinBindEmail(code).then(result => {
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
          oauthLinkedinSignIn(code).then(user => {
            if (user) {
              clearOnGoingFlowOperation();
              navigateToPostSignInLandingPage();
            } else {
              clearOnGoingFlowOperation();
              router.push(`/signin?error=unknownLinkedin`);
            }
          }).catch((e) => {
            if (e instanceof InexistingEmailException) {
              clearOnGoingFlowOperation();
              router.push(`/signin?error=oauthLinkedinEmailNotExists`);
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

export default LinkedinRedirect;