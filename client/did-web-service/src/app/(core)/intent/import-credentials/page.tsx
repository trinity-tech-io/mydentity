"use client"
import { MainButton } from "@components/generic/MainButton";
import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Intent } from "@model/intent/intent";
import { JSONObject } from "@model/json";
import { Avatar, Stack, Typography } from "@mui/material";
import { useToast } from "@services/feedback.service";
import { activeIdentity$ } from "@services/identity/identity.events";
import { fetchIntent, fulfilIntentRequest } from "@services/intent.service";
import { logger } from "@services/logger";
import { setQueryParameter } from "@utils/urls";
import { FC, useEffect, useState } from "react";
import { CredentialAndDetailComponent } from "../components/CredentialAndDetailComponent";
import { PreparingRequest } from "../components/PreparingRequest";

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
  credential: VerifiableCredential,
}

const RequestDetails: FC<{
  intent: Intent<VerifiableCredential[]>;
}> = ({ intent }) => {
  const TAG = 'ImportCredential';
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [preparingResponse, setPreparingResponse] = useState(false);
  const [importedCredentials, setImportedCredentials] = useState<ImportedCredential[]>(null);
  const [wrongTargetDID, setWrongTargetDID] = useState<boolean>(false);
  const [requestingAppIconUrl, setRequestingAppIconUrl] = useState<string>('');
  const [requestingAppName, setRequestingAppName] = useState<string>('');
  const { showErrorToast } = useToast();

  const payload = intent.requestPayload;
  useEffect(() => {
    runPreliminaryChecks();
    getDappIcon();
    fetchApplicationDidInfo();
    if (payload) {
      const importedCredentials = organizeImportedCredentials(payload.credentials)
      setImportedCredentials(importedCredentials);
    }
  }, [payload]);

  /**
   * Check a few things after entering the screen. Mostly, imported credentials content quality.
   */
  const runPreliminaryChecks = () => {
    //TODO
    setWrongTargetDID(false);
  }

  const getDappIcon = () => {
    //TODO
    setRequestingAppIconUrl("");
  }

  const fetchApplicationDidInfo = () => {
    //TODO
    setRequestingAppName('Demo app')
  }

  /**
   * From the raw list of credentials provided by the caller, we create our internal model
   * ready for UI.
   * NOTE: We can have several credentials passed at the same time. Each credential can have several entries in its subject.
   */
  const organizeImportedCredentials = (credentialObjList: JSONObject[]): ImportedCredential[] => {
    if (!credentialObjList)
      return [];

    let displayableCredentials = [];
    credentialObjList.map((credentialObj: JSONObject) => {
      const verifiableCredential = VerifiableCredential.parse(credentialObj.toString());
      let credentialSubject = verifiableCredential.getSubject().getProperties();

      // Generate a displayable version of each entry found in the credential subject
      let displayableEntries: ImportedCredentialItem[] = [];
      for (let subjectEntryKey of Object.keys(credentialSubject)) {
        let subjectEntryValue = credentialSubject[subjectEntryKey];

        if (subjectEntryKey == "id") // Don't display the special subject id entry
          continue;

        if (subjectEntryKey == "displayable") // Don't display the special subject displayable entry
          continue;

        let displayableEntry: ImportedCredentialItem = {
          name: subjectEntryKey,
          value: subjectEntryValue.toString(),
        }

        displayableEntries.push(displayableEntry);
      }

      let displayableCredential: ImportedCredential = {
        name: verifiableCredential.getId().getFragment(),
        values: displayableEntries,
        credential: verifiableCredential,
      };

      displayableCredentials.push(displayableCredential);
    });

    return displayableCredentials;
  }

  // User approves the upcoming request - data will be returned to the calling dApp.
  const approveRequest = async () => {
    setPreparingResponse(true);

    // Now fulfil the intent. The connector will then be able to
    // grab the result from the API.
    let responsePayload: string[] = [];
    importedCredentials.map(importedCredential => { responsePayload.push(importedCredential.credential.getId().toString()) });
    // const responsePayload = ["did:elastos:mydid#mycredid-todo"]; // TODO: list of DIDURLs of the imported VCs.

    let fulfilled = false;
    try {
      fulfilled = await fulfilIntentRequest(intent.id, responsePayload);
    } catch (error) {
      logger.error(TAG, 'Import credential error', error);
    }

    if (!fulfilled) {
      showErrorToast('Import credential error, Please retry after a while.');
      return;
    }

    // TODO: check fulfilled success - if error report error to user
    // Send the response to the original app, including the intent id as parameter.
    // The web connector will catch this parameter to retrieve the intent response payload and
    // to deliver it to the app through the connectivity sdk.
    const redirectUrl = setQueryParameter(intent.redirectUrl, "rid", intent.id);
    window.location.href = redirectUrl;
  }

  return <>
    {/* Do you want to save the following content issued by app XXX, to your identity? This credential will not be
    visible by anyone unless you choose share it later.
    <br /><br />
    Intent: {intent.id}
    <br /><br /> */}
    {activeIdentity &&
      <div className=" text-center">
        <Stack direction="row" justifyContent="center">
          <Typography>
          </Typography>
          {/* {requestingAppIconUrl && <Avatar src={requestingAppIconUrl} sx={{ ml:2, width: 120, height: 120 }}/>}
        {!requestingAppIconUrl && <Avatar src={requestingAppIconUrl} sx={{ ml:2, width: 120, height: 120 }}/>} */}
          <Avatar sx={{ ml: 2, width: 120, height: 120 }} />
        </Stack>
        <Typography mt={4}>
          {requestingAppName}
        </Typography>

        <Typography mt={4}>
          You are going to attach some infomation provided by a third party to your identity.
        </Typography>
        <Typography mt={1}>
          Please review the following data:
        </Typography>
        {importedCredentials?.map(importedCredential => {
          return (
            <CredentialAndDetailComponent key={importedCredential.name + "credentialanddetail"} importedCredential={importedCredential} />
          )
        })}
        <MainButton onClick={approveRequest} busy={preparingResponse} >Import this to my profile</MainButton>
      </div>
    }

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