"use client";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { EditableCredentialAvatar } from "@components/credential/EditableCredentialAvatar";
import { MainButton } from "@components/generic/MainButton";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Credential } from "@model/credential/credential";
import { Document } from "@model/document/document";
import { editAvatarOnHive } from "@model/regular-identity/features/profile/upload-avatar";
import { TextField, Typography } from "@mui/material";
import { useToast } from "@services/feedback.service";
import { didDocumentService } from "@services/identity/diddocuments.service";
import { logger } from "@services/logger";
import { authUser$ } from "@services/user/user.events";
import { ChangeEvent, FC, useEffect, useState } from "react";

/*

TODO:
- upload avatar to hive, display preview, save to app credential
- when clicking publish:
    - should upsert the local app credential, make it visible, and publish the did document
- button to get the mnemonic displayed (not shown by default)
*/

const ApplicationDetailsPage: FC<{
  params: {
    applicationdid: string;
  }
}> = ({ params }) => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const identityFeature = activeUser?.get("identity");
  const [appIdentities] = useBehaviorSubject(identityFeature?.applicationIdentities$);
  const applicationDid = decodeURIComponent(params?.applicationdid); // From the url, app we are trying to manage
  const appIdentity = appIdentities?.find(a => a.did === applicationDid); // Real app identity object from the user, if found
  const [localAppIdentityCredentials] = useBehaviorSubject(appIdentity?.credentials().credentials$); // Credentials of the app identity, local (maybe not published) - KEEP it unused to local the credentials
  const [localAppCredential, setLocalAppCredential] = useState<Credential>(null);
  const [appName, setAppName] = useState<string>(null); // UI model, possibly not yet saved to local VC/published VC
  const [appIconUrl, setAppIconUrl] = useState<string>(null); // UI model, possibly not yet saved to local VC/published VC

  const [appDIDDocumentStatusWasChecked, setAppDIDDocumentStatusWasChecked] = useState(false); // Whether the App DID document has been checked on chain or not yet
  const [publishedDIDDocument, setPublishedDIDDocument] = useState<Document>(null);
  const [appIdentityNeedsToBePublished, setAppIdentityNeedsToBePublished] = useState(false);
  //const developerDIDDocument: DIDPlugin.DIDDocument = null;
  const [publishingIdentity, setPublishingIdentity] = useState(false);
  const fetchingIcon = false;
  const uploadingIcon = false;
  const base64iconPath: string = null;

  const { showSuccessToast, showErrorToast } = useToast();

  // Component initialization
  useEffect(() => {
    // Get the did document on chain, without any local cache
    logger.log("developers", "Checking if the application DID is on chain or not");
    didDocumentService.resolveDIDDocument(applicationDid, true).then(async doc => {
      setPublishedDIDDocument(doc);
      setAppDIDDocumentStatusWasChecked(true);

      if (doc) {
        logger.log("developers", "App DID is on chain");
      }
      else {
        logger.log("developers", "App DID is NOT on chain");

        //appName = app.name; // TODO
      }
    })
  }, []);

  // App identity initialization
  useEffect(() => {
    if (appIdentity) {
      appIdentity.synchronizeDIDDocument();
    }
  }, [applicationDid, appIdentity]);

  useEffect(() => {
    if (localAppCredential) {
      setAppName(localAppCredential?.getSubject().getProperty("name"));
      setAppIconUrl(localAppCredential?.getSubject().getProperty("iconUrl"));
    }
  }, [localAppCredential]);

  useEffect(() => {
    updateAppIdentityNeedsToBePublished();
  }, [appName, appIconUrl, publishedDIDDocument]);

  useEffect(() => {
    setLocalAppCredential(appIdentity?.credentials().getCredentialByType("ApplicationCredential"));
  }, [localAppIdentityCredentials]);

  const updateLocalAppCredential = async () => {
    await appIdentity.update(appName, appIconUrl);
  }

  const publishAppIdentity = async (): Promise<void> => {
    if (publishingIdentity)
      return;

    // Must set the app icon
    if (!appIconUrl) {
      showErrorToast("Set app icon");
      return;
    }

    setPublishingIdentity(true);
    // Update local app identity data (local VC + local DID document)
    updateLocalAppCredential();
    // Publish the local DID document on chain
    const publishedSuccessfully = await appIdentity.publication().publish();
    setPublishingIdentity(false);

    // TODO: check pub status?
  }

  const isAppIdentityPublished = (): boolean => {
    return appDIDDocumentStatusWasChecked && publishedDIDDocument != null
  }

  const getOnChainEndpoint = (endPointName: string): string => {
    if (!publishedDIDDocument)
      return "";

    const credential = publishedDIDDocument.getDIDDocument().getCredential("#appinfo");
    if (!credential)
      return "";

    const subject = credential.getSubject();
    if (!("endpoints" in subject))
      return "";
    else
      return subject.getProperty("endpoints")[endPointName] || "";
  }

  const getOnChainAppDeveloperDID = (): string => {
    if (!publishedDIDDocument)
      return null;

    const credential = publishedDIDDocument.getDIDDocument().getCredential("#appinfo");
    if (!credential)
      return null;

    const subject = credential.getSubject();
    if (!("developer" in subject))
      return "";
    else
      return subject.getProperty("developer")["did"] || "";
  }

  const chainAppNameMatchesLocalAppName = (): boolean => {
    const appCredential = publishedDIDDocument.getCredentialByType("ApplicationCredential");
    if (!appCredential)
      return false;

    return appName === appCredential.getSubject().getProperty("name");
  }

  const chainAppIconMatchesLocalAppIcon = (): boolean => {
    const appCredential = publishedDIDDocument.getCredentialByType("ApplicationCredential");
    if (!appCredential)
      return false;

    return appIconUrl === appCredential.getSubject().getProperty("iconUrl");
  }

  /**
   * Based on on going changes, updates the state that tells us if we should publish the
   * app did on chain again to reflect the recent changes or not.
   */
  const updateAppIdentityNeedsToBePublished = (): void => {
    setAppIdentityNeedsToBePublished(
      !isAppIdentityPublished() ||
      !chainAppNameMatchesLocalAppName() ||
      !chainAppIconMatchesLocalAppIcon()
    );
  }

  const onAppTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setAppName(event.currentTarget?.value);
    updateAppIdentityNeedsToBePublished();
  };

  const copyAppDIDToClipboard = async (): Promise<void> => {
    /* await native.copyClipboard(app.didString);
    native.genericToast('developers.app-did-copied', 2000); */
  }

  /* private async fetchAppIcon() {
  if (appIconUrl) {
    fetchingIcon = true;
    logger.log("developers", `Fetching app icon from ${appIconUrl}`);
    base64iconPath = await globalHiveService.fetchHiveScriptPictureToDataUrl(appIconUrl);
    logger.log("developers", `Got app icon`);
    fetchingIcon = false;
  }
} */

  /* public getAppIcon(): string {
  return base64iconPath || "assets/developers/images/logo.png";
} */

  const handleAppIconFileChanged = async (file: File): Promise<void> => {
    //setUploadingAvatar(true);
    //await identityProfileFeature.upsertIdentityAvatar(file);
    //setUploadingAvatar(false);
    const uploadedAvatar = await editAvatarOnHive(appIdentity, file);
    console.log("uploadedAvatar", uploadedAvatar)

    await appIdentity.update(appName, uploadedAvatar.avatarHiveURL);
  }

  return (
    <div className="col-span-full">
      <Breadcrumbs entries={["developers", "application-details"]} />

      <div>
        <Typography variant="h6">Application details</Typography>

        {/*  Header */}
        <div className="flex flex-col">
          {/* App icon */}
          <div>
            <EditableCredentialAvatar credential={localAppCredential} onFileUpload={handleAppIconFileChanged} />
            {/* <ion-img *ngIf="!fetchingIcon && !uploadingIcon" [src]="getAppIcon()"
              onClick="selectAndUploadAppIconFromLibrary()"></ion-img> */}
            {/* <p *ngIf="!fetchingIcon && !uploadingIcon && !base64iconPath">{{ 'developers.set-app-icon' | translate
              }}</p>
            <p *ngIf="!fetchingIcon && !uploadingIcon && base64iconPath">{{ 'developers.touch-to-change' | translate
              }}</p> */}
            {/* <ion-spinner * ngIf="fetchingIcon || uploadingIcon" ></ion - spinner > */}
          </div>

          {/* App title */}
          <div className="flex flex-row mt-4 items-center gap-4">
            <div>Name</div>
            <div>
              <TextField
                className='w-full'
                label="Application name"
                onChange={onAppTitleChange}
                defaultValue={appName}
                autoFocus
                variant="outlined"
                autoComplete="off"
              />

              {/* <ion-input [(ngModel)]="appName" placeholder="{{ 'developers.appName-placeholder' | translate }}">
            </ion-input> */}
            </div>
          </div>
        </div>
      </div >

      {/* Other properties */}
      <div className="flex flex-col gap-4 mt-8">
        <div className="flex flex-row gap-4">
          <div>
            <p>DID</p>
            {/* <ion-icon name="copy" onClick={copyAppDIDToClipboard}></ion-icon> */}
          </div>
          <div>
            <Typography>{applicationDid}</Typography>
          </div>
        </div>
        {/* <div>
            <div >
              <p>Mnemonic</p>
            </div>
            <div>
              <Typography>{didSession.mnemonic}</Typography>
            </div>
          </div> */}
        <div className="flex flex-row gap-4">
          <div>App DID published?</div>
          <div>
            {!appDIDDocumentStatusWasChecked && <Typography>Checking</Typography>}
            {appDIDDocumentStatusWasChecked && publishedDIDDocument && <Typography>Yes</Typography>}
            {appDIDDocumentStatusWasChecked && !publishedDIDDocument && <Typography>No</Typography>}
          </div>
        </div>
        <div className="mt-4">
          {
            appDIDDocumentStatusWasChecked && appIdentityNeedsToBePublished && !publishingIdentity &&
            <div>
              <div>The local application info has been modified, please publish it for others to view your new app info.</div>
              <MainButton onClick={publishAppIdentity} busy={publishingIdentity}>Publish DID</MainButton>
            </div>
          }

          {!appIdentityNeedsToBePublished && <p>Up to date</p>}

        </div>
      </div>
    </div>
  )
}

export default ApplicationDetailsPage;