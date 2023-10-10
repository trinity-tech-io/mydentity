import { MainButton } from "@components/MainButton";
import type { VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { DID as ConnDID, didAccessV2 } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { FC, useEffect, useState } from "react";

export const RequestCredentials: FC = () => {
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
    }, 500);

    return () => unsub;
  }, []);

  const didAuth = async () => {
    setReceivedPresentation(null);
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
    <>
      <MainButton onClick={didAuth} busy={awaitingResult}>Request name credential</MainButton>
      {
        presentation &&
        <div className="flex flex-col">
          <div className="mb-6">Presentation has been received:</div>
          <div className=" text-sm max-w-xl break-words">{presentation.toString()}</div>
        </div>
      }
    </>
  )
}