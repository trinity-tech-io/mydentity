"use client"
import { MainButton } from "@components/MainButton";
import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Intent } from "@model/intent/intent";
import { activeIdentity$ } from "@services/identity/identity.events";
import { fetchIntent, fulfilIntentRequest } from "@services/intent.service";
import { setQueryParameter } from "@utils/urls";
import { FC, useEffect, useState } from "react";
import { PreparingRequest } from "../components/PreparingRequest";

const RequestDetails: FC<{
  intent: Intent<VerifiableCredential[]>;
}> = ({ intent }) => {
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [preparingResponse, setPreparingResponse] = useState(false);
  const payload = intent.requestPayload;

  console.log("payload", payload)

  // User approves the upcoming request - data will be returned to the calling dApp.
  const approveRequest = async () => {
    setPreparingResponse(true);

    // Now fulfil the intent. The connector will then be able to
    // grab the result from the API.
    const responsePayload = ["did:elastos:mydid#mycredid-todo"]; // TODO: list of DIDURLs of the imported VCs.
    const fulfilled = await fulfilIntentRequest(intent.id, responsePayload);
    if (fulfilled) {
      // TODO: check fulfilled success - if error report error to user

      // Send the response to the original app, including the intent id as parameter.
      // The web connector will catch this parameter to retrieve the intent response payload and
      // to deliver it to the app through the connectivity sdk.
      const redirectUrl = setQueryParameter(intent.redirectUrl, "rid", intent.id);
      window.location.href = redirectUrl;
    }
  }

  return <>
    Do you want to save the following content issued by app XXX, to your identity? This credential will not be
    visible by anyone unless you choose share it later.
    <br /><br />
    Intent: {intent.id}
    <br /><br />
    {activeIdentity && <MainButton onClick={approveRequest} busy={preparingResponse}>Import this to my profile</MainButton>}
    {!activeIdentity && "Make an identity active to continue"}
  </>
}

const ImportCredentialsIntent: FC<{
  searchParams?: {
    rid?: string; // In theory when entering this page we get a rid query param in the url
  };
}> = ({ searchParams }) => {
  const [loadingIntent, setLoadingIntent] = useState(true);
  const [intent, setIntent] = useState<Intent<VerifiableCredential[]>>(null);

  // Try to find an intent that corresponds to the given intent ID.
  useEffect(() => {
    const requestId = searchParams?.rid;
    if (!requestId)
      return;

    fetchIntent<VerifiableCredential[]>(requestId).then(_intent => {
      setLoadingIntent(false);
      setIntent(_intent);
      console.log('intent result', _intent)
    });
  }, [searchParams?.rid]);

  return (
    <div className="col-span-full">
      {loadingIntent && <PreparingRequest className="mb-6" />}
      {!loadingIntent && intent && <RequestDetails intent={intent} />}
      {!loadingIntent && !intent && <div>No matching request</div>}
    </div>
  )
}

export default ImportCredentialsIntent;