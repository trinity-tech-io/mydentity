'use client'
import { MainButton } from "@components/generic/MainButton";
import { VerticalStackLoadingCard } from "@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { clearOnGoingFlowOperation } from "@services/flow.service";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { AllIdentityList } from "./widgets/AllIdentityList";

const Identities: FC = () => {
  const [authUser] = useBehaviorSubject(authUser$);

  useEffect(() => {
    clearOnGoingFlowOperation();
  }, []);

  return (<>
      {/* Widgets */}
      {authUser &&
        <>
          <AllIdentityList />
        </>
      }
  </>)
}

export default Identities;