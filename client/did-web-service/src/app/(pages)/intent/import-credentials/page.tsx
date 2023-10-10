"use client"
import type { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Credential } from "@model/credential/credential";
import { Intent } from "@model/intent/intent";
import { clearPostSignInUrl, setPostSignInUrl } from "@services/flow.service";
import { activeIdentity$ } from "@services/identity/identity.events";
import { fetchIntent } from "@services/intent.service";
import { authUser$ } from "@services/user/user.events";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { PreparingRequest } from "../components/PreparingRequest";
import { RequestDetails } from "./RequestDetails";

// Displayable version of a verifiable credential subject entry (a credential can contain several information
// in its subject).
export type ImportedCredentialItem = {
  name: string,
  value: string
}

// Displayable version of a verifiable credential. Can contain one or more ImportedCredentialItem that
// are displayable version of verifiable credential subject entries.
export type ImportedCredential = {
  name: string,
  values: ImportedCredentialItem[],
  credential: Credential,
}

// TODO: this will cause build error: Static generation failed due to dynamic usage on /intent/request-credentials, reason: searchParams.rid
//const ImportCredentialsIntent: FC<{
//  searchParams?: {
//    rid?: string; // In theory when entering this page we get a rid query param in the url
//  };
//}> = ({ searchParams }) => {
const ImportCredentialsIntent: FC = () => {
  const searchParams = useSearchParams();
  const requestId = searchParams.get('rid');
  const [loadingIntent, setLoadingIntent] = useState(true);
  const [intent, setIntent] = useState<Intent<VerifiableCredential[]>>(null);
  const [activeUser] = useBehaviorSubject(authUser$);
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);

  // Try to find an intent that corresponds to the given intent ID.
  useEffect(() => {
    //const requestId = searchParams?.rid;
    if (!requestId)
      return;

    fetchIntent<VerifiableCredential[]>(requestId).then(_intent => {
      setLoadingIntent(false);
      setIntent(_intent);
    });
    //}, [searchParams?.rid]);
  }, [requestId]);

  // Remember where to come back in case sign up/in is needed
  useEffect(() => {
    if (!activeUser || !activeIdentity) {
      // Remember the current url to come back after signing in, if needed.
      setPostSignInUrl(window.location.href);
    }
    else {
      clearPostSignInUrl();
    }
  }, [activeUser, activeIdentity]);

  return (
    <div className="col-span-full">
      {loadingIntent && <PreparingRequest className="mb-6" />}
      {!loadingIntent && intent && <RequestDetails intent={intent} />}
      {!loadingIntent && !intent && <div>No matching request</div>}
    </div>
  )
}

export default ImportCredentialsIntent;