"use client";
import { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DarkButton } from "@components/button";
import { Icon as ReactIcon } from "@iconify/react";
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";

const LinkedinSignIn: FC = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (error === "oauthLinkedinEmailNotExists") {
      setErrorMsg("This email address is unknown.");
    } else if (error === "unknownLinkedin") {
      setErrorMsg("Failed to sign in with Linkedin account.");
    }
  }, [error]);

  const signInWithGoogle = (): void => {
    setOnGoingFlowOperation(FlowOperation.EmailSignIn);
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/linkedin`);
  };

  return (
    <>
      <DarkButton
        id="signin-ms"
        startIcon={<ReactIcon icon="logos:linkedin-icon" />}
        onClick={signInWithGoogle}
        className="w-full"
      >
        Sign in with Linkedin
      </DarkButton>
      {errorMsg && (
        <>
          <div className="text-red-600">{errorMsg}</div>
        </>
      )}
    </>
  );
};

export default LinkedinSignIn;
