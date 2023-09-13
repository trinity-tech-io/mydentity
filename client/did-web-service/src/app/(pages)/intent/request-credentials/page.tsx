"use client"
import { DID as ConnDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { Intent } from "@model/intent/intent";
import { fetchIntent } from "@services/intent.service";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { PreparingRequest } from "../components/PreparingRequest";
import { RequestDetails } from "./RequestDetails";

// TODO: this will cause build error: Static generation failed due to dynamic usage on /intent/request-credentials, reason: searchParams.rid
//const RequestCredentialsIntent: FC<{
//  searchParams?: {
//    rid?: string; // In theory when entering this page we get a rid query param in the url
//  };
//}> = ({ searchParams }) => {
const RequestCredentialsIntent: FC = () => {
  const searchParams = useSearchParams();
  const requestId = searchParams.get('rid');
  const [loadingIntent, setLoadingIntent] = useState(true);
  const [intent, setIntent] = useState<Intent<ConnDID.CredentialDisclosureRequest>>(null);

  // Try to find an intent that corresponds to the given intent ID.
  useEffect(() => {
    //const requestId = searchParams?.rid;
    if (!requestId)
      return;

    fetchIntent<ConnDID.CredentialDisclosureRequest>(requestId).then(_intent => {
      setLoadingIntent(false);
      setIntent(_intent);
      console.log('intent result', _intent)
    });
    //}, [searchParams?.rid]);
  }, [requestId]);

  return (
    <div className="col-span-full">
      {loadingIntent && <PreparingRequest className="mb-6" />}
      {!loadingIntent && intent && <RequestDetails intent={intent} />}
      {!loadingIntent && !intent && <div>No matching request</div>}
    </div>
  )
}

export default RequestCredentialsIntent;