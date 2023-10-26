import { MainButton } from "@components/generic/MainButton";
import { UnlockRetrier } from "@components/security/UnlockRetrier";
import { useUnlockPromptState } from "@components/security/unlock-key-prompt/UnlockKeyPrompt";
import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { ActivityType } from "@model/activity/activity-type";
import { credentialFromVerifiableCredential } from "@model/credential/credential-builder";
import { Intent } from "@model/intent/intent";
import { JSONObject } from "@model/json";
import { Button, Grid, Stack, Typography } from "@mui/material";
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
import { DarkButton } from "@components/button";

const TAG = "ImportCredential";

export const RequestDetails: FC<{
  intent: Intent<VerifiableCredential[]>;
}> = ({ intent }) => {
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const identityProfileFeature = activeIdentity?.profile();
  const credentialFeature = activeIdentity?.credentials();
  const [preparingResponse, setPreparingResponse] = useState(false);
  const [credentials] = useBehaviorSubject(credentialFeature?.credentials$); // NOTE: keep it to fetch the credentials, required before importing
  const [importedCredentials, setImportedCredentials] =
    useState<ImportedCredential[]>(null);
  // The target DID should belong to the user
  const [wrongTargetDID, setWrongTargetDID] = useState<boolean>(false);
  const [targetDID, setTargetDID] = useState<string>("");
  // Make sure that all subjects of imported VCs are for the same DID
  const [differentTargetDID, setDifferentTargetDID] = useState<boolean>(false);
  // The target DID belongs to the user, but is not the active identity.
  const [needSwitchIdentity, setNeedSwitchIdentity] = useState<boolean>(false);
  const { showErrorToast } = useToast();
  const { unlockerIsCancelled } = useUnlockPromptState();
  const [activeUser] = useBehaviorSubject(authUser$);
  const [identities] = useBehaviorSubject(
    activeUser?.get("identity").regularIdentities$
  );
  const payload = intent.requestPayload;
  const requestingAppDID = intent.requestPayload.caller;

  useEffect(() => {
    if (payload && identities && activeIdentity) {
      organizeImportedCredentials(payload.credentials).then(
        (importedCredentials) => {
          setImportedCredentials(importedCredentials);
        }
      );
    }
  }, [payload, identities, activeIdentity]);

  /**
   * Check a few things after entering the screen. Mostly, imported credentials content quality.
   */
  const runPreliminaryChecks = (): void => {};

  /**
   * From the raw list of credentials provided by the caller, we create our internal model
   * ready for UI.
   * NOTE: We can have several credentials passed at the same time. Each credential can have several entries in its subject.
   */
  const organizeImportedCredentials = async (
    credentialObjList: JSONObject[]
  ): Promise<ImportedCredential[]> => {
    if (!credentialObjList) return [];

    let targetDID = null;
    const displayableCredentials = [];
    for (const credentialObj of credentialObjList) {
      const verifiableCredential = VerifiableCredential.parse(
        credentialObj.toString()
      );
      const credentialSubject = verifiableCredential
        .getSubject()
        .getProperties();

      const vcTargetDID = verifiableCredential.id.getDid().toString();
      // The target DID must belong to this user
      const index = identities.findIndex((i) => i.did == vcTargetDID);
      if (index == -1) {
        setWrongTargetDID(true);
      }

      if (!targetDID) {
        targetDID = vcTargetDID;
      } else if (targetDID != vcTargetDID) {
        setDifferentTargetDID(true);
      }

      if (targetDID != activeIdentity.did) {
        setNeedSwitchIdentity(true);
      }

      // Generate a displayable version of each entry found in the credential subject
      const displayableEntries: ImportedCredentialItem[] = [];
      for (const subjectEntryKey of Object.keys(credentialSubject)) {
        const subjectEntryValue = credentialSubject[subjectEntryKey];

        if (subjectEntryKey == "id")
          // Don't display the special subject id entry
          continue;

        if (subjectEntryKey == "displayable")
          // Don't display the special subject displayable entry
          continue;

        const displayableEntry: ImportedCredentialItem = {
          name: subjectEntryKey,
          value: subjectEntryValue.toString(),
        };

        displayableEntries.push(displayableEntry);
      }

      const displayableCredential: ImportedCredential = {
        name: verifiableCredential.getId().getFragment(),
        values: displayableEntries,
        credential: await credentialFromVerifiableCredential(
          verifiableCredential
        ),
      };

      displayableCredentials.push(displayableCredential);
    }

    setTargetDID(targetDID);
    return displayableCredentials;
  };

  // User approves the upcoming request - data will be returned to the calling dApp.
  const approveRequest = async (): Promise<void> => {
    setPreparingResponse(true);

    // Now fulfil the intent. The connector will then be able to
    // grab the result from the API.
    const responsePayload: string[] = [];
    importedCredentials.map((importedCredential) => {
      responsePayload.push(importedCredential.credential.getId().toString());
    });
    // const responsePayload = ["did:elastos:mydid#mycredid-todo"]; // TODO: list of DIDURLs of the imported VCs.

    let fulfilled = false;
    try {
      for (const importedCredential of importedCredentials) {
        await credentialFeature.importCredential(
          importedCredential.credential.verifiableCredential,
          payload.caller
        );
      }

      fulfilled = await fulfilIntentRequest(intent.id, responsePayload);
    } catch (error) {
      logger.error(TAG, "Import credential error", error);
    }

    if (!fulfilled) {
      showErrorToast("Import credential error, Please retry after a while.");
      return;
    }

    await activeUser?.get("activity").createActivity({
      type: ActivityType.CREDENTIALS_IMPORTED,
      credentialsCount: importedCredentials.length,
      appDid: requestingAppDID,
    });

    // TODO: check fulfilled success - if error report error to user
    // Send the response to the original app, including the intent id as parameter.
    // The web connector will catch this parameter to retrieve the intent response payload and
    // to deliver it to the app through the connectivity sdk.
    const redirectUrl = setQueryParameter(intent.redirectUrl, "rid", intent.id);
    window.location.href = redirectUrl;
  };

  // User reject the upcoming request.
  const rejectRequest = async (): Promise<void> => {
    //  Fulfill request with empty payload (meaning cancelled)
    await fulfilIntentRequest(intent.id, null);

    // Send the response to the original app, including the intent id as parameter.
    // The web connector will catch this parameter to retrieve the intent response payload and
    // to deliver it to the app through the connectivity sdk.
    const redirectUrl = setQueryParameter(intent.redirectUrl, "rid", intent.id);
    window.location.href = redirectUrl;
  };

  return (
    <>
      {activeIdentity && (
        <Stack spacing={2} alignItems="center">
          <RequestingApp applicationDID={requestingAppDID} />
          <Typography
            variant="body2"
            color="text.primary"
            textAlign="center"
            className="max-w-lg"
          >
            You are going to attach some infomation provided by a third party to
            your identity. Please review the following data:
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ ml: "-16px !important" }}
          >
            {importedCredentials?.map((importedCredential, i) => {
              return (
                <Grid item key={i} xs={12} sm={"auto"}>
                  <CredentialPreviewWithDetails
                    importedCredential={importedCredential}
                  />
                </Grid>
              );
            })}
          </Grid>

          {differentTargetDID && (
            <Typography my={4}>
              Import is only supported for one identity at a time for now.
            </Typography>
          )}

          {wrongTargetDID && (
            <Typography my={4}>
              Is this credential really for you? It's not targeted at any of
              your existing identities...
            </Typography>
          )}

          {(differentTargetDID || wrongTargetDID) && (
            <MainButton onClick={rejectRequest}>Cancel</MainButton>
          )}

          {!wrongTargetDID && !differentTargetDID && needSwitchIdentity && (
            <div>
              <Typography my={4}>
                The identity that will contain the imported information is:
              </Typography>
              <Typography fontSize={14}>{targetDID}</Typography>
            </div>
          )}

          {!wrongTargetDID && !differentTargetDID && !needSwitchIdentity && (
            <div className="flex w-full max-w-lg items-center gap-2 sm:gap-4 md:gap-6 sm:px-4">
              <Button
                variant="contained"
                className="sm:flex-1"
                onClick={rejectRequest}
                color="error"
              >
                CANCEL
              </Button>
              <DarkButton
                className="flex-1"
                onClick={approveRequest}
                loading={preparingResponse}
              >
                IMPORT TO MY PROFILE
              </DarkButton>
            </div>
          )}

          {unlockerIsCancelled && <UnlockRetrier className="mt-2" />}
        </Stack>
      )}

      {!activeUser && (
        <Typography variant="h6">
          Please sign in or sign up to continue
        </Typography>
      )}
      {activeUser && !activeIdentity && (
        <Typography variant="h6">
          Please make an identity active to continue
        </Typography>
      )}
    </>
  );
};
