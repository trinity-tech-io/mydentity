'use client'
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { clearOnGoingFlowOperation } from "@services/flow.service";
import { authUser$ } from "@services/user/user.events";
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