'use client';
import { DarkButton } from '@components/button';
import { Icon as ReactIcon } from '@iconify/react';
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";
import { useRouter } from "next/navigation";
import { FC } from 'react';

const BindEmailWithMicrosoft: FC = () => {
  const router = useRouter();

  const signInWithMicrosoft = (): void => {
    setOnGoingFlowOperation(FlowOperation.OnBoardingEmailBinding);
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/microsoft`);
  };

  return (
    <DarkButton
      id="bind-ms"
      startIcon={<ReactIcon icon="logos:microsoft-icon" />}
      onClick={signInWithMicrosoft}
      className="w-full"
    >
      Bind email with Microsoft
    </DarkButton>
  );
};

export default BindEmailWithMicrosoft;

