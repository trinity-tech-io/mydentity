import { MainButton } from "@components/generic/MainButton";
import { UnlockRetrier } from "@components/security/UnlockRetrier";
import { useUnlockPromptState } from "@components/security/unlock-key-prompt/UnlockKeyPrompt";
import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { ActivityType } from "@model/activity/activity-type";
import { credentialFromVerifiableCredential } from "@model/credential/credential-builder";
import { Intent } from "@model/intent/intent";
import { JSONObject } from "@model/json";
import { Typography } from "@mui/material";
import { useToast } from "@services/feedback.service";
import { activeIdentity$ } from "@services/identity/identity.events";
import { fulfilIntentRequest } from "@services/intent.service";
import { logger } from "@services/logger";
import { authUser$ } from "@services/user/user.events";
import { setQueryParameter } from "@utils/urls";
import { FC, useEffect, useState } from "react";
import { RequestingApp } from "../components/RequestingApp";
import { CredentialPreviewWithDetails } from "./CredentialPreviewWithDetails";
import { ImportedCredential, ImportedCredentialItem } from "./page";

const TAG = 'ImportCredential';

export const RequestDetails: FC<{
  intent: Intent<VerifiableCredential[]>;
}> = ({ intent }) => {
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const identityProfileFeature = activeIdentity?.get("profile");
  const credentialFeature = activeIdentity?.get("credentials");
  const [preparingResponse, setPreparingResponse] = useState(false);
  const [credentials] = useBehaviorSubject(credentialFeature?.credentials$); // NOTE: keep it to fetch the credentials, required before importing
  const [importedCredentials, setImportedCredentials] = useState<ImportedCredential[]>(null);
  const [wrongTargetDID, setWrongTargetDID] = useState<boolean>(false);
  const { showErrorToast } = useToast();
  const { unlockerIsCancelled } = useUnlockPromptState();
  const [activeUser] = useBehaviorSubject(authUser$);
  const payload = intent.requestPayload;
  const requestingAppDID = intent.requestPayload.caller;

  useEffect(() => {
    runPreliminaryChecks();

    if (payload) {
      organizeImportedCredentials(payload.credentials).then(importedCredentials => {
        setImportedCredentials(importedCredentials);
      });
    }
  }, [payload]);

  /**
   * Check a few things after entering the screen. Mostly, imported credentials content quality.
   */
  const runPreliminaryChecks = (): void => {
    //TODO
    setWrongTargetDID(false);
  }

  /**
   * From the raw list of credentials provided by the caller, we create our internal model
   * ready for UI.
   * NOTE: We can have several credentials passed at the same time. Each credential can have several entries in its subject.
   */
  const organizeImportedCredentials = async (credentialObjList: JSONObject[]): Promise<ImportedCredential[]> => {
    if (!credentialObjList)
      return [];

    const displayableCredentials = [];
    for (const credentialObj of credentialObjList) {
      const verifiableCredential = VerifiableCredential.parse(credentialObj.toString());
      const credentialSubject = verifiableCredential.getSubject().getProperties();

      // Generate a displayable version of each entry found in the credential subject
      const displayableEntries: ImportedCredentialItem[] = [];
      for (const subjectEntryKey of Object.keys(credentialSubject)) {
        const subjectEntryValue = credentialSubject[subjectEntryKey];

        if (subjectEntryKey == "id") // Don't display the special subject id entry
          continue;

        if (subjectEntryKey == "displayable") // Don't display the special subject displayable entry
          continue;

        const displayableEntry: ImportedCredentialItem = {
          name: subjectEntryKey,
          value: subjectEntryValue.toString(),
        }

        displayableEntries.push(displayableEntry);
      }

      const displayableCredential: ImportedCredential = {
        name: verifiableCredential.getId().getFragment(),
        values: displayableEntries,
        credential: await credentialFromVerifiableCredential(verifiableCredential),
      };

      displayableCredentials.push(displayableCredential);
    }

    return displayableCredentials;
  }

  // User approves the upcoming request - data will be returned to the calling dApp.
  const approveRequest = async (): Promise<void> => {
    setPreparingResponse(true);

    // Now fulfil the intent. The connector will then be able to
    // grab the result from the API.
    const responsePayload: string[] = [];
    importedCredentials.map(importedCredential => { responsePayload.push(importedCredential.credential.getId().toString()) });
    // const responsePayload = ["did:elastos:mydid#mycredid-todo"]; // TODO: list of DIDURLs of the imported VCs.

    let fulfilled = false;
    try {
      for (const importedCredential of importedCredentials) {
        await credentialFeature.importCredential(importedCredential.credential.verifiableCredential);
      }

      fulfilled = await fulfilIntentRequest(intent.id, responsePayload);
    } catch (error) {
      logger.error(TAG, 'Import credential error', error);
    }

    if (!fulfilled) {
      showErrorToast('Import credential error, Please retry after a while.');
      return;
    }

    const activity = await activeUser?.get('activity').createActivity(ActivityType.VC_IMPORTED, { did: activeIdentity.did });
    if (!activity) {
      logger.warn(`failed to create activity for VC created by ${activeIdentity.did}`);
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
        <RequestingApp applicationDID={requestingAppDID} />

        <Typography mt={4}>
          You are going to attach some infomation provided by a third party to your identity.
        </Typography>
        <Typography mt={1}>
          Please review the following data:
        </Typography>
        {importedCredentials?.map((importedCredential, i) => {
          return (
            <CredentialPreviewWithDetails key={i} importedCredential={importedCredential} />
          )
        })}
        <MainButton onClick={approveRequest} busy={preparingResponse} disabled={!credentials}>Import this to my profile</MainButton>
        {unlockerIsCancelled && <UnlockRetrier className="mt-2" />}
      </div>
    }

    {!activeIdentity && "Make an identity active to continue"}
  </>
}
