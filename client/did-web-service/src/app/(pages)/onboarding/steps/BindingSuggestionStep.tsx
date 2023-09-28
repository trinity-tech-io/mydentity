import { FC } from "react";
import { useRouter } from "next13-progressbar";
import { Button, Stack } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";
import { PortraitCard } from "@components/card";
import { DarkButton } from "@components/button";
import AtMarkIcon from "@assets/images/at-mark.svg"
import W3CircleIcon from "@assets/images/www-circle.svg"
import Headline from "@components/layout/Headline";

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
      <Headline
        title="You've made it! Welcome to Web3 identity."
        description={
          <>Your Web3 identity is <b>secured by cryptographic keys</b>. While many Web3 apps ask you to manage these keys yourself, our service offers
          partial key storage, enhancing security. Your keys remain protected by your devices or passwords, and <b>we require your consent for any
            action</b>. To ensure account recovery, bind multiple devices and browsers as <b>we cannot do this on your behalf</b>.</>
        }
      />
      <div className="py-4">
        <Button sx={{ color: '#9D3E3E', textDecoration: 'underline' }} endIcon={<KeyboardArrowRightIcon />} onClick={onSkip}>Not now. I'm just checking things out</Button>
      </div>
      <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }}>
        <PortraitCard
          logo={
            <div className="w-3/5 mt-[-8%] ml-[-5%]">
              <AtMarkIcon />
            </div>
          }
          content={
            <div className="h-full flex items-center max-sm:text-[10px]">
              <span>Verify one of your existing email addresses and bind it to your account with a password. You can later use your email and password to sign in and unlock access to your identity.</span>
            </div>
          }
          footer={
            <DarkButton
              color="primary"
              className="w-full sm:w-4/5 md:w-[70%]"
              value="dashboard"
              onClick={bindEmail}
            >
              BIND EMAIL
            </DarkButton>
          }
        />
        <PortraitCard
          logo={
            <div className="w-3/5 mt-[-8%] ml-[-5%]">
              <W3CircleIcon />
            </div>
          }
          content={
            <div className="h-full flex items-center max-sm:text-[10px]">
              <span>Bind your current browser. This doesn't require to provide any email or password, but access to your identity will be lost if you don't bind multiple devices as recovery.</span>
            </div>
          }
          footer={
            <DarkButton
              color="primary"
              className="w-full sm:w-4/5 md:w-[70%]"
              value="dashboard"
              onClick={bindBrowser}
            >
              BIND BROWSER
            </DarkButton>
          }
        />
      </Stack>
    </>
  )
}