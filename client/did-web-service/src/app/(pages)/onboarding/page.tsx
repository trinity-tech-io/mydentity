"use client";
import { VerticalStackLoadingCard } from "@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { FC, useState } from "react";
import { OnBoardingStep1 } from "./steps/step1";
import { OnBoardingStep2 } from "./steps/step2";

const OnBoarding: FC = () => {
  const [authUser] = useBehaviorSubject(authUser$());
  const securityFeature = authUser?.get("security");
  const [shadowKeys] = useBehaviorSubject(securityFeature?.shadowKeys$);
  const initialDataFetched = !!shadowKeys;
  const isThisBrowserBound = securityFeature?.isThisBrowserBound();
  const [step1Skipped, setStep1Skipped] = useState(false);

  const skipStep1 = (): void => {
    setStep1Skipped(true)
  }

  return (
    <div className="col-span-full">
      {!initialDataFetched && <VerticalStackLoadingCard />}
      {initialDataFetched && <>
        {(!isThisBrowserBound && !step1Skipped) && <OnBoardingStep1 onSkip={skipStep1} />}
        {(isThisBrowserBound || step1Skipped) && <OnBoardingStep2 />}
      </>}
    </div>
  )
}

export default OnBoarding;