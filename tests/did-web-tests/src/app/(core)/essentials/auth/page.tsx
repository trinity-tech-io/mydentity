"use client"
import { FC } from "react";
import { ImportCredentials } from "./ImportCredentials";
import { RequestCredentials } from "./RequestCredentials";


const EssentialsAuthTests: FC = () => {

  return (
    <div className="col-span-full">
      <div className="flex flex-col gap-4 items-center">
        <RequestCredentials />
        <ImportCredentials />
      </div>
    </div>
  )
}

export default EssentialsAuthTests;