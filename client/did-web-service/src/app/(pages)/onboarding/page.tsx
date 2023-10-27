"use client";
import { FC, useEffect } from "react";
import { useRouter } from "next13-progressbar";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { BindingSuggestionStep } from "./steps/BindingSuggestionStep";

const OnBoarding: FC = () => {
  const router = useRouter();
  const [authUser] = useBehaviorSubject(authUser$);
  const securityFeature = authUser?.get("security");
  const [shadowKeys] = useBehaviorSubject(securityFeature?.shadowKeys$);
  const initialDataFetched = !!shadowKeys;
  const isThisBrowserBound = securityFeature?.isThisBrowserBound();
  // const [step1Skipped, setStep1Skipped] = useState(false);

  useEffect(() => {
    if (isThisBrowserBound) skipBindingStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isThisBrowserBound]);

  const skipBindingStep = (): void => {
    router.push("new-identity");
  };

  return (
    <div className="col-span-full">
      <BindingSuggestionStep onSkip={skipBindingStep} initialDataFetched={initialDataFetched} />
    </div>
  );
};

export default OnBoarding;
