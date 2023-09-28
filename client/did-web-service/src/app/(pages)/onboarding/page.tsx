"use client";
import { FC, useState } from "react";
import { useRouter } from "next13-progressbar";
import { VerticalStackLoadingCard } from "@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { BindingSuggestionStep } from "./steps/BindingSuggestionStep";
import { CreateIdentityStep } from "./steps/CreateIdentityStep";

const OnBoarding: FC = () => {
  const router = useRouter();
  const [authUser] = useBehaviorSubject(authUser$);
  const securityFeature = authUser?.get("security");
  const [shadowKeys] = useBehaviorSubject(securityFeature?.shadowKeys$);
  const initialDataFetched = !!shadowKeys;
  const isThisBrowserBound = securityFeature?.isThisBrowserBound();
  // const [step1Skipped, setStep1Skipped] = useState(false);

  const skipBindingStep = (): void => {
    router.push("new-identity");
  };

  return (
    <div className="col-span-full">
      {!initialDataFetched ? (
        <VerticalStackLoadingCard />
      ) : (
        <>
          {!isThisBrowserBound ? (
            <BindingSuggestionStep onSkip={skipBindingStep} />
          ) : (
            <CreateIdentityStep />
          )}
        </>
      )}
      {/* {initialDataFetched && <>
        {
          (!isThisBrowserBound && !step1Skipped) ? <BindingSuggestionStep onSkip={skipBindingStep} /> : <CreateIdentityStep />
        }
      </>} */}
    </div>
  );
};

export default OnBoarding;
