'use client';
import { Icon as ReactIcon } from '@iconify/react';
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";
import { useRouter } from "next/navigation";
import { FC } from 'react';
import { DarkButton } from "@components/button";

const BindEmailWithGoogle: FC = () => {
  const router = useRouter();

  const signInWithMicrosoft = (): void => {
    setOnGoingFlowOperation(FlowOperation.OnBoardingEmailBinding);
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/google`);
  };

  return (
      <DarkButton
          id="bind-ms"
          startIcon={<ReactIcon icon="logos:google-icon" />}
          onClick={signInWithMicrosoft}
          className="w-full"
      >
        Bind email with Google
      </DarkButton>
  );
};

export default BindEmailWithGoogle;

