"use client";
import { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DarkButton } from "@components/button";
import { Icon as ReactIcon } from "@iconify/react";
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";

const MicrosoftSignIn: FC = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (error === "oauthEmailNotExists") {
      setErrorMsg("This email address is unknown.");
    } else if (error === "unknown") {
      setErrorMsg("Failed to sign in with MS account.");
    }
  }, [error]);

  const signInWithMicrosoft = (): void => {
    setOnGoingFlowOperation(FlowOperation.EmailSignIn);
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/microsoft`);
  };

  return (
    <>
      <DarkButton
        startIcon={<ReactIcon icon="logos:microsoft-icon" />}
        onClick={signInWithMicrosoft}
        className="w-full"
      >
        Sign in with Microsoft
      </DarkButton>
      {errorMsg && (
        <>
          <div className="text-red-600">{errorMsg}</div>
        </>
      )}
    </>
  );
};

export default MicrosoftSignIn;
