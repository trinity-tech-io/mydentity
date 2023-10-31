"use client";
import { FC, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { DID as ConnDID } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { Intent } from "@model/intent/intent";
import { fetchIntent } from "@services/intent.service";
import { PreparingRequest } from "../components/PreparingRequest";
import { RequestDetails } from "./RequestDetails";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { setPostSignInUrl, clearPostSignInUrl } from "@services/flow.service";
import { activeIdentity$ } from "@services/identity/identity.events";
import { authUser$ } from "@services/user/user.events";

// TODO: this will cause build error: Static generation failed due to dynamic usage on /intent/request-credentials, reason: searchParams.rid
//const RequestCredentialsIntent: FC<{
//  searchParams?: {
//    rid?: string; // In theory when entering this page we get a rid query param in the url
//  };
//}> = ({ searchParams }) => {
const RequestCredentialsIntent: FC = () => {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("rid");
  const [loadingIntent, setLoadingIntent] = useState(true);
  const [intent, setIntent] =
    useState<Intent<ConnDID.CredentialDisclosureRequest>>(null);
  const [activeUser] = useBehaviorSubject(authUser$);
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);

  // Try to find an intent that corresponds to the given intent ID.
  useEffect(() => {
    //const requestId = searchParams?.rid;
    if (!requestId) return;

    fetchIntent<ConnDID.CredentialDisclosureRequest>(requestId).then(
      (_intent) => {
        setLoadingIntent(false);
        setIntent(_intent);
      }
    );
    //}, [searchParams?.rid]);
  }, [requestId]);

  // Remember where to come back in case sign up/in is needed
  useEffect(() => {
    if (!activeUser || !activeIdentity) {
      // Remember the current url to come back after signing in, if needed.
      setPostSignInUrl(window.location.href);
    } else {
      clearPostSignInUrl();
    }
  }, [activeUser, activeIdentity]);

  return (
    <div className="col-span-full">
      {loadingIntent && <PreparingRequest />}
      {!loadingIntent && intent && <RequestDetails intent={intent} />}
      {!loadingIntent && !intent && (
        <Typography variant="h6" textAlign="center">
          No matching request
        </Typography>
      )}
    </div>
  );
};

export default RequestCredentialsIntent;
