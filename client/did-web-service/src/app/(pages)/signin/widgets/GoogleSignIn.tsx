"use client";
import { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DarkButton } from "@components/button";
import { Icon as ReactIcon } from "@iconify/react";
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";

const GoogleSignIn: FC = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (error === "oauthGoogleEmailNotExists") {
      setErrorMsg("This email address is unknown.");
    } else if (error === "unknownGoogle") {
      setErrorMsg("Failed to sign in with Google account.");
    }
  }, [error]);

  const signInWithMicrosoft = (): void => {
    setOnGoingFlowOperation(FlowOperation.EmailSignIn);
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/google`);
  };

  return (
    <>
      <DarkButton
        id="signin-ms"
        startIcon={<ReactIcon icon="logos:google-icon" />}
        onClick={signInWithMicrosoft}
        className="w-full"
      >
        Sign in with Google
      </DarkButton>
      {errorMsg && (
        <>
          <div className="text-red-600">{errorMsg}</div>
        </>
      )}
    </>
  );
};

export default GoogleSignIn;
