"use client"
import { MainButton } from "@components/MainButton";
import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { DID as ConnDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Intent } from "@model/intent/intent";
import { activeIdentity$ } from "@services/identity/identity.events";
import { fetchIntent } from "@services/intent.service";
import { FC, useEffect, useState } from "react";
import { PreparingRequest } from "../components/PreparingRequest";

const RequestDetails: FC<{
  intent: Intent<ConnDID.CredentialDisclosureRequest>;
}> = ({ intent }) => {
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const payload = intent.requestPayload;

  console.log("payload", payload)

  // User approves the upcoming request - data will be returned to the calling dApp.
  const approveRequest = async () => {
    // Generate the VP for the Active identity and fulfill the request with its JSON value.
    const selectedCredentials: VerifiableCredential[] = []; // TODO - real selection from user
    const presentation = await activeIdentity.createVerifiablePresentation(
      selectedCredentials,
      payload.realm,
      payload.nonce);

    // TODO: check presentation not null

    // Now fulfil the intent request using this generated VP. The connector will then be able to
    // grab the result from the API.
    // TODO const responsePayload = presentation.toJSON();
    const responsePayload = { todo: true };
    // NOT NEEDED ANY MORE? const fulfilled = await fulfilIntentRequest(intent.id, responsePayload);
    // TODO: check fulfilled success

    // Send the response to the original app
    //window.location.href = intent.redirectUrl;

    // TODO: move this code to intent service
    window.opener.postMessage({
      intentId: intent.id,
      responsePayload
    }, '*');
  }

  return <>This app XXX is requesting information from you:
    <br /><br />
    Intent: {intent.id}
    <br /><br />
    List of credentials
    <br /><br />
    <MainButton onClick={approveRequest} >Approve</MainButton>
  </>
}

const RequestCredentialsIntent: FC<{
  searchParams?: {
    rid?: string; // In theory when entering this page we get a rid query param in the url
  };
}> = ({ searchParams }) => {
  const [loadingIntent, setLoadingIntent] = useState(true);
  const [intent, setIntent] = useState<Intent<ConnDID.CredentialDisclosureRequest>>(null);

  // Try to find an intent that corresponds to the given intent ID.
  useEffect(() => {
    const requestId = searchParams?.rid;
    if (!requestId)
      return;

    fetchIntent<ConnDID.CredentialDisclosureRequest>(requestId).then(_intent => {
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

export default RequestCredentialsIntent;