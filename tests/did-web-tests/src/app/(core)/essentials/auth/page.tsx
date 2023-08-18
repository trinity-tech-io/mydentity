"use client"
import { MainButton } from "@components/MainButton";
import { DID as ConnDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { CircularProgress } from "@mui/material";
import { FC, useState } from "react";

const didAccess = new ConnDID.DIDAccess();

const EssentialsAuthTests: FC = () => {
  const [creds, setCreds] = useState(null);
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
    setCreds(credentials)
  }

  return (
    <>
      <div className="col-span-6">
        {awaitingResult && <CircularProgress size={20} className="mr-4" />}
        <MainButton onClick={didAuth} busy={awaitingResult} >Request name credential</MainButton>
      </div>
      <div className="col-span-6">
        Credential received? {creds ? "YES" : "NO"}
      </div>
    </>
  )
}

export default EssentialsAuthTests;