"use client"
import { StyledButton } from "@components/StyledButton";
import { DID as ConnDID, connectivity } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { DIDWebConnector } from "@trinity-tech/did-web-connector";
import { FC } from "react";

const webConnector = new DIDWebConnector({
  webServiceEndpoint: "http://localhost:4000",
  webServiceAPIEndpoint: "http://localhost:3000",
});
connectivity.registerConnector(webConnector);
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