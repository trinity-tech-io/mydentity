"use client"
import { MainButton } from "@components/MainButton";
import { Intent } from "@model/intent/intent";
import { fetchIntent } from "@services/intent.service";
import { FC, useEffect, useState } from "react";
import { PreparingRequest } from "../components/PreparingRequest";

const RequestDetails: FC<{
  intent: Intent;
}> = ({ intent }) => {
  // User approves the upcoming request - data will be returned to the calling dApp.
  const approveRequest = () => {

  }

  return <>This app XXX is requesting information from you:
    <br /><br />
    Intent: {intent.id}
    <br /><br />
    List of credentials
    <br /><br />
    <MainButton title="Approve" onClick={approveRequest} />
  </>
}

const RequestCredentialsIntent: FC<{
  searchParams?: {
    rid?: string; // In theory when entering this page we get a rid query param in the url
  };
}> = ({ searchParams }) => {
  const [loadingIntent, setLoadingIntent] = useState(true);
  const [intent, setIntent] = useState(null);

  // Try to find an intent that corresponds to the given intent ID.
  useEffect(() => {
    const requestId = searchParams?.rid;
    if (!requestId)
      return;

    fetchIntent(requestId).then(_intent => {
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