import { MainButton } from "@components/generic/MainButton";
import { Typography } from "@mui/material";
import { FlowOperation, setOnGoingFlowOperation } from "@services/flow.service";
import { useRouter } from "next/navigation";
import { FC } from "react";

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
      <Typography variant="h5" className='w-full text-center font-semibold mt-32 mb-24 leading-9'>
        You're now on board, welcome to your Web3 identity.
      </Typography>
      <p className="mt-4">
        Your identity is a Web3 identity, <b>protected by cryptographic keys</b>. Many Web3 applications require you to
        save those keys by yourself, and you will sometimes do that in unsafe ways. On the contrary, this service
        partially stores the complex cryptographic keys
        for you so you don&apos;t have to do it. Your keys are protected by your own devices or passwords
        and <b>this app cannot do anything without your consent</b>. For this reason, you need to bind multiple devices and browsers,
        as this is your only way to recover your account later in case one of the devices is lost. <b>We cannot do that for you</b>.
      </p>

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