"use client"
import { StyledButton } from "@components/StyledButton";
import { DID as ConnDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { EssentialsConnector } from "@elastosfoundation/essentials-connector-client-browser";
import { FC } from "react";

const essentialsConnector = new EssentialsConnector();
// TODO: REGISTER THE WEB AUTH CONNECTOR HERE INSTEAD OF ESSENTIALS
// connectivity.registerConnector(essentialsConnector);
const didAccess = new ConnDID.DIDAccess();

const DIDWebAuthTests: FC = () => {

  const didAuth = async () => {
    const credentials = await didAccess.requestCredentials({
      claims: [
        ConnDID.simpleTypeClaim("Your name", "NameCredential", false)
      ]
    });
    console.log("credentials", credentials)
  }

  return (
    <div className="col-span-full">
      <StyledButton onClick={didAuth}>
        Request name credential
      </StyledButton>
    </div>
  )
}

export default DIDWebAuthTests;