'use client'
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { clearOnGoingFlowOperation } from "@services/flow.service";
import { authUser$ } from "@services/user/user.events";
import { FC, useEffect } from "react";
import { AllRecentActivity } from "./widgets/AllRecentActivity";

const RecentActivity: FC = () => {
  const [authUser] = useBehaviorSubject(authUser$);

  useEffect(() => {
    clearOnGoingFlowOperation();
  }, []);

  return (<>
      {/* Widgets */}
      {authUser &&
        <>
          <AllRecentActivity />
        </>
      }
  </>)
}

export default RecentActivity;