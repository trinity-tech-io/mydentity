"use client";
import { VerticalStackLoadingCard } from "@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { FC, useState } from "react";
import { BindingSuggestionStep } from "./steps/BindingSuggestionStep";
import { CreateIdentityStep } from "./steps/CreateIdentityStep";

const OnBoarding: FC = () => {
  const [authUser] = useBehaviorSubject(authUser$);
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
        {
          (!isThisBrowserBound && !step1Skipped) ? <BindingSuggestionStep onSkip={skipStep1} /> : <CreateIdentityStep />
        }
      </>}
    </div>
  )
}

export default OnBoarding;