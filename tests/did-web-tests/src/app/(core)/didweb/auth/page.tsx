"use client"
import { MainButton } from "@components/MainButton";
import { DID as ConnDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { CircularProgress } from "@mui/material";
import { FC, useState } from "react";

const didAccess = new ConnDID.DIDAccess();

const DIDWebAuthTests: FC = () => {
  const [awaitingResult, setAwaitingResult] = useState(false);

  const didAuth = async () => {
    setAwaitingResult(true);
    const credentials = await didAccess.requestCredentials({
      claims: [
        ConnDID.simpleTypeClaim("Your name", "NameCredential", false)
      ]
    });
    setAwaitingResult(false);
    console.log("credentials", credentials)
  }

  return (
    <div className="col-span-full">
      <div className="flex flex-row items-center">
        {awaitingResult && <CircularProgress size={20} className="mr-4" />}
        <MainButton onClick={didAuth} title="Request name credential" disabled={awaitingResult} />
      </div>
    </div>
  )
}

export default DIDWebAuthTests;