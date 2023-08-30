"use client"
import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { Credential } from "@model/credential/credential";
import { Intent } from "@model/intent/intent";
import { fetchIntent } from "@services/intent.service";
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