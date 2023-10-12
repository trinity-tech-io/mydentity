"use client"
import { authUserDID$ } from "@/app/services/auth.service";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { FC } from "react";
import { ImportCredentials } from "./ImportCredentials";
import { RequestCredentials } from "./RequestCredentials";

const DIDWebAuthTests: FC = () => {
  const [authUserDID] = useBehaviorSubject(authUserDID$);

  return (
    <div className="col-span-full">
      {authUserDID && <div className="mb-4 text-center">{authUserDID}</div>}
      <div className="flex flex-col gap-4 items-center">
        <RequestCredentials />
        <ImportCredentials />
      </div>
    </div>
  )
}

export default DIDWebAuthTests;