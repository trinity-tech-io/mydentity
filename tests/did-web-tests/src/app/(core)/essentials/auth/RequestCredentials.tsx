import { MainButton } from "@components/MainButton";
import type { VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { DID as ConnDID, didAccessV2 } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { FC, useEffect, useState } from "react";

export const RequestCredentials: FC = () => {
  const [awaitingResult, setAwaitingResult] = useState(false);
  const [presentation, setReceivedPresentation] = useState<VerifiablePresentation>(null);
  const [errorMessage, setErrorMessage] = useState<string>(null);

  useEffect(() => {
    let unsub = null;
    // Simulated late registration to event to make sure the SDK queued the responses
    setTimeout(() => {
      // Called after page redirection
      unsub = didAccessV2.onRequestCredentialsResponse((context, presentation) => {
        console.log("onRequestCredentialsResponse", context, presentation);
        if (presentation)
          setReceivedPresentation(presentation);
        setAwaitingResult(false);
      });
    }, 500);

    return () => unsub;
  }, []);

  const didAuthV1 = async () => {
    setErrorMessage(null);
    setReceivedPresentation(null);
    setAwaitingResult(true);
    try {
      const didAccess = new ConnDID.DIDAccess();
      const credentials = await didAccess.requestCredentials({
        claims: [
          ConnDID.simpleTypeClaim("Your name", "NameCredential", false)
        ]
      });
      console.log("credentials", credentials)
      setReceivedPresentation(credentials)
    } catch (e) {
      console.log("exception:", e)
      setErrorMessage(e.toString())
    } finally {
      setAwaitingResult(false);
    }
  }

  const didAuthV2 = async () => {
    setErrorMessage(null);
    setReceivedPresentation(null);
    setAwaitingResult(true);
    try {
      await didAccessV2.requestCredentials({
        claims: [
          ConnDID.simpleTypeClaim("Your name", "NameCredential", false),
          ConnDID.standardEmailClaim('Used during the KYC process', false),
        ]
      }, {
        purpose: "authenticate user",
        customJson: { appData: 123 }
      });
    } catch (e) {
      console.log("exception:", e)
      setErrorMessage(e.toString())
      setAwaitingResult(false);
    }

  }

  return (
    <>
      <MainButton onClick={didAuthV1} busy={awaitingResult}>Request name credential (V1)</MainButton>
      <MainButton onClick={didAuthV2} busy={awaitingResult}>Request name credential (V2)</MainButton>
      {
        presentation &&
        <div className="flex flex-col">
          <div className="mb-6">Presentation has been received:</div>
          <div className=" text-sm max-w-xl break-words">{presentation.toString()}</div>
        </div>
      }
      {
        errorMessage &&
        <div className="flex flex-col">
          <div className="mb-6">Request Credentials Failed:</div>
          <div className=" text-sm max-w-xl break-words">{errorMessage}</div>
        </div>
      }
    </>
  )
}