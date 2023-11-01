"use client";

import { FC, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ExistingEmailException } from "@model/exceptions/existing-email-exception";
import { InexistingEmailException } from "@model/exceptions/inexisting-email-exception";
import {
  clearOnGoingFlowOperation,
  FlowOperation,
  getOnGoingFlowOperation,
  usePostSignInFlow,
} from "@services/flow.service";
import {
  oauthMSBindEmail,
  oauthMSSignIn,
} from "@services/user/microsoft/ms.auth.service";
import CheckingAuth from "../../component/CheckingAuth";

const MicrosoftRedirect: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();

  useEffect(() => {
    if (!code) {
      alert(
        "MicrosoftRedirect: No code from Microsoft authentication callback."
      );
    } else {
      const op = getOnGoingFlowOperation();
      switch (op) {
        case FlowOperation.OnBoardingEmailBinding:
          {
            oauthMSBindEmail(code)
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
            oauthMSSignIn(code)
              .then((user) => {
                if (user) {
                  clearOnGoingFlowOperation();
                  navigateToPostSignInLandingPage();
                } else {
                  clearOnGoingFlowOperation();
                  router.push(`/signin?error=unknown`);
                }
              })
              .catch((e) => {
                if (e instanceof InexistingEmailException) {
                  clearOnGoingFlowOperation();
                  router.push(`/signin?error=oauthEmailNotExists`);
                }
              });
          }
          break;
        default:
          alert("Invalid operation, please try again.");
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CheckingAuth />
    </div>
  );
};

export default MicrosoftRedirect;
