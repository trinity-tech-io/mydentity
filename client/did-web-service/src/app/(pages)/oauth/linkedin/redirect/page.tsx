"use client";
import { FC, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next13-progressbar";
import { ExistingEmailException } from "@model/exceptions/existing-email-exception";
import { InexistingEmailException } from "@model/exceptions/inexisting-email-exception";
import {
  clearOnGoingFlowOperation,
  FlowOperation,
  getOnGoingFlowOperation,
  usePostSignInFlow,
} from "@services/flow.service";
import {
  oauthLinkedinBindEmail,
  oauthLinkedinSignIn,
} from "@services/user/linkedin/linkedin.auth.service";
import CheckingAuth from "../../component/CheckingAuth";

const LinkedinRedirect: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();

  useEffect(() => {
    if (!code) {
      alert("LinkedinRedirect: No code from Linked authentication callback.");
    } else {
      const op = getOnGoingFlowOperation();
      switch (op) {
        case FlowOperation.OnBoardingEmailBinding:
          {
            oauthLinkedinBindEmail(code)
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
            oauthLinkedinSignIn(code)
              .then((user) => {
                if (user) {
                  clearOnGoingFlowOperation();
                  navigateToPostSignInLandingPage();
                } else {
                  clearOnGoingFlowOperation();
                  router.push(`/signin?error=unknownLinkedin`);
                }
              })
              .catch((e) => {
                if (e instanceof InexistingEmailException) {
                  clearOnGoingFlowOperation();
                  router.push(`/signin?error=oauthLinkedinEmailNotExists`);
                }
              });
          }
          break;
        default:
          alert("Invalid operation, please try again.");
          return;
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

export default LinkedinRedirect;
