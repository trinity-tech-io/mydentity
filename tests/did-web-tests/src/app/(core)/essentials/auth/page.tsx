"use client"
import { StyledButton } from "@components/StyledButton";
import { DID as ConnDID, connectivity } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { EssentialsConnector } from "@elastosfoundation/essentials-connector-client-browser";
import { FC, useState } from "react";

const essentialsConnector = new EssentialsConnector();
connectivity.registerConnector(essentialsConnector);
const didAccess = new ConnDID.DIDAccess();

const EssentialsAuthTests: FC = () => {
  const [creds, setCreds] = useState(null);

  const didAuth = async () => {
    const credentials = await didAccess.requestCredentials({
      claims: [
        ConnDID.simpleTypeClaim("Your name", "NameCredential", false)
      ]
    });
    console.log("credentials", credentials)
    setCreds(credentials)
  }

  return (
    <>
      <div className="col-span-6">
        <StyledButton onClick={didAuth}>
          Request name credential
        </StyledButton>
      </div>
      <div className="col-span-6">
        Credential received? {creds ? "YES" : "NO"}
      </div>
    </>
  )
}

export default EssentialsAuthTests;