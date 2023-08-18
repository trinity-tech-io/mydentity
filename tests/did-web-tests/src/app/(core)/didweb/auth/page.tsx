"use client"
import { MainButton } from "@components/MainButton";
import { VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { DID as ConnDID, didAccessV2 } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { FC, useEffect, useState } from "react";

const DIDWebAuthTests: FC = () => {
  const [awaitingResult, setAwaitingResult] = useState(false);
  const [presentation, setReceivedPresentation] = useState<VerifiablePresentation>(null);

  useEffect(() => {
    let unsub = null;
    // Simulated late registration to event to make sure the SDK queued the responses
    setTimeout(() => {
      // Called after page redirection
      unsub = didAccessV2.onRequestCredentialsResponse((context, presentation) => {
        console.log("onRequestCredentialsResponse", context, presentation);
        setReceivedPresentation(presentation);
      });
    }, 2000);

    return () => unsub;
  }, []);

  const didAuth = async () => {
    setAwaitingResult(true);
    await didAccessV2.requestCredentials({
      claims: [
        ConnDID.simpleTypeClaim("Your name", "NameCredential", false)
      ]
    }, {
      purpose: "authenticate user",
      customJson: { appData: 123 }
    });
  }

  return (
    <div className="col-span-full">
      <div className="flex flex-col gap-4 items-center">
        <MainButton onClick={didAuth} busy={awaitingResult}>Request name credential</MainButton>
        {presentation &&
          <div className="flex flex-col">
            <div className="mb-6">Presentation has been received:</div>
            <div className=" text-sm max-w-xl break-words">{presentation.toString()}</div>
          </div>
        }
      </div>
    </div>
  )
}

export default DIDWebAuthTests;