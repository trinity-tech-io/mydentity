'use client';
import { Icon as ReactIcon } from '@iconify/react';
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";
import { useRouter } from "next/navigation";
import { FC } from 'react';
import { DarkButton } from "@components/button";

const BindEmailWithLinkedin: FC = () => {
  const router = useRouter();

  const doBind = (): void => {
    setOnGoingFlowOperation(FlowOperation.OnBoardingEmailBinding);
    router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/linkedin`);
  };

  return (
      <DarkButton
          id="bind-ms"
          startIcon={<ReactIcon icon="logos:linkedin-icon" />}
          onClick={doBind}
          className="w-full"
      >
        Bind email with Linkedin
      </DarkButton>
  );
};

export default BindEmailWithLinkedin;