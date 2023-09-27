'use client'
import { clearOnGoingFlowOperation } from "@services/flow.service";
import { FC, useEffect } from "react";
import { AllIdentityList } from "./widgets/AllIdentityList";

const Identities: FC = () => {
  useEffect(() => {
    clearOnGoingFlowOperation();
  }, []);

  return (<>
    <AllIdentityList />
  </>)
}

export default Identities;