import { FC } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";
import { MainButton } from "@components/generic/MainButton";
import { PortraitCard } from "@components/card";
import { DarkButton } from "@components/button";
import AtMarkIcon from "@assets/images/at-mark.svg"

export const BindingSuggestionStep: FC<{
  onSkip: () => void;
}> = ({ onSkip }) => {
  const router = useRouter();

  const bindEmail = (): void => {
    setOnGoingFlowOperation(FlowOperation.OnBoardingEmailBinding);
    router.push("/account/security/bind-email");
  }

  const bindBrowser = (): void => {
    setOnGoingFlowOperation(FlowOperation.OnBoardingBrowserBinding);
    router.push("/account/security/bind-passkey");
  }

  return (
    <>
      <h3 className='w-full text-4xl font-bold	text-center'>
        You've made it! Welcome to Web3 identity.
      </h3>
      <p className="mt-4">
        Your Web3 identity is <b>secured by cryptographic keys</b>. While many Web3 apps ask you to manage these keys yourself, our service offers
        partial key storage, enhancing security. Your keys remain protected by your devices or passwords, and <b>we require your consent for any
          action</b>. To ensure account recovery, bind multiple devices and browsers as <b>we cannot do this on your behalf</b>.
      </p>
      <div className="py-4">
        <Button sx={{ color: '#9D3E3E', textDecoration: 'underline' }} endIcon={<KeyboardArrowRightIcon />}>Not now. I'm just checking things out</Button>
      </div>
      <div>
        <PortraitCard
          logo={
            <div className="w-3/5 mt-[-8%] ml-[-5%]">
              <AtMarkIcon />
            </div>
          }
          content={
            <div className="h-full flex items-center">
              <span>Verify one of your existing email addresses and bind it to your account with a password. You can later use your email and password to sign in and unlock access to your identity.</span>
            </div>
          }
          footer={
            <DarkButton
              color="primary"
              className="w-4/5 md:w-3/5"
              value="dashboard"
              // onClick={handleButton}
            >
              BIND EMAIL
            </DarkButton>
          }
        />
      </div>
      <div className="flex flex-row mt-4 gap-4 w-full">
        <div className="flex flex-col gap-6 bg-slate-200 rounded-lg p-10 flex-1">
          <p>Verify one of your existing email addresses and bind it to your account with a password. You can later use your <b>email and password</b> to sign in and unlock access to your identity.</p>
          <MainButton onClick={bindEmail}>Bind an email address</MainButton>
        </div>
        <div className="flex flex-col gap-6 bg-slate-200 rounded-lg p-10 flex-1">
          <p>Bind your current browser. This <b>doesn't require to provide any email or password</b>, but access to your identity will be lost if you don't bind multiple devices as recovery.</p>
          <MainButton onClick={bindBrowser}>Bind my browser</MainButton>
        </div>
      </div>

      <div className="flex flex-row justify-center mt-10">
        <a className="cursor-pointer" onClick={onSkip}>I'll do this later, just taking a first look for now.</a>
      </div>
    </>
  )
}