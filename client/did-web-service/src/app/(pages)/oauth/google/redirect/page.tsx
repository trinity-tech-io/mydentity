"use client";

import { FC } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next13-progressbar"
import { ExistingEmailException } from "@model/exceptions/existing-email-exception";
import { InexistingEmailException } from "@model/exceptions/inexisting-email-exception";
import {
  clearOnGoingFlowOperation,
  FlowOperation,
  getOnGoingFlowOperation,
  usePostSignInFlow,
} from "@services/flow.service";
import {
  oauthGoogleBindEmail,
  oauthGoogleSignIn,
} from "@services/user/google/google.auth.service";
import CheckingAuth from "../../component/CheckingAuth";

const MicrosoftRedirect: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();

  if (!code) {
    alert("GoogleRedirect: No code from Google authentication callback.");
  } else {
    const op = getOnGoingFlowOperation();
    switch (op) {
      case FlowOperation.OnBoardingEmailBinding:
        {
          oauthGoogleBindEmail(code)
            .then((result) => {
              if (result) {
                router.push("/account/security");
              } else {
                clearOnGoingFlowOperation();
                router.push("/account/security?error=unknown");
              }
            })
            .catch((e) => {
              if (e && e instanceof ExistingEmailException) {
                clearOnGoingFlowOperation();
                router.push("/account/security?error=emailExists");
              } else {
                clearOnGoingFlowOperation();
                router.push("/account/security?error=unknown");
              }
            });
        }
        break;
      case FlowOperation.EmailSignIn:
        {
          oauthGoogleSignIn(code)
            .then((user) => {
              if (user) {
                clearOnGoingFlowOperation();
                navigateToPostSignInLandingPage();
              } else {
                clearOnGoingFlowOperation();
                router.push(`/signin?error=unknownGoogle`);
              }
            })
            .catch((e) => {
              if (e instanceof InexistingEmailException) {
                clearOnGoingFlowOperation();
                router.push(`/signin?error=oauthGoogleEmailNotExists`);
              }
            });
        }
        break;
      default:
        alert("Invalid operation, please try again.");
        break;
    }
  }

  return (
    <div>
      <CheckingAuth />
    </div>
  );
};

export default MicrosoftRedirect;
