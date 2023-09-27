"use client";
import { MainButton } from "@components/generic/MainButton";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Document } from "@model/document/document";
import { Typography } from "@mui/material";
import { useToast } from "@services/feedback.service";
import { didDocumentService } from "@services/identity/diddocuments.service";
import { logger } from "@services/logger";
import { authUser$ } from "@services/user/user.events";
import { FC, useEffect, useState } from "react";

const ApplicationDetailsPage: FC<{
  params: {
    applicationdid: string;
  }
}> = ({ params }) => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const identityFeature = activeUser?.get("identity");
  const [appIdentities] = useBehaviorSubject(identityFeature?.applicationIdentities$);
  const applicationDid = params?.applicationdid; // From the url, app we are trying to manage
  const app = appIdentities?.find(a => a.did === applicationDid); // Real app identity object from the user, if found

  const [appDIDDocumentStatusWasChecked, setAppDIDDocumentStatusWasChecked] = useState(false); // Whether the App DID document has been checked on chain or not yet
  const [publishedDIDDocument, setPublishedDIDDocument] = useState<Document>(null);
  //const developerDIDDocument: DIDPlugin.DIDDocument = null;
  const [publishingDid, setPublishingDid] = useState(false);
  const fetchingIcon = false;
  const uploadingIcon = false;
  const base64iconPath: string = null;

  const [appName, setAppName] = useState<string>(null);
  const [appIconUrl, setAppIconUrl] = useState<string>(null);
  const nativeRedirectUrl = "";
  const nativeCustomScheme = "";
  const nativeCallbackUrl = "";

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
        //developerDIDDocument = await identityService.getDeveloperIdentityOnChain(getOnChainAppDeveloperDID());

        setAppName(await doc.getRepresentativeOwnerName());
        setAppIconUrl(await doc.getRepresentativeIcon());

        /* nativeRedirectUrl = getOnChainRedirectUrlEndpoint();
        nativeCallbackUrl = getOnChainCallbackUrlEndpoint();
        nativeCustomScheme = getOnChainCustomSchemeEndpoint(); */
      }
      else {
        logger.log("developers", "App DID is NOT on chain");

        //appName = app.name;
      }
    })
  });

  // App identity initialization
  useEffect(() => {
    if (app) {
      app.synchronizeDIDDocument();
    }
  }, [app]);

  const publishAppIdentity = async () => {
    if (publishingDid)
      return;

    // Must set the app icon
    if (!base64iconPath) {
      showErrorToast("Set app icon");
      return;
    }

    setPublishingDid(true);
    const developerDID = ""; // TODO
    await app.updateDIDDocument(developerDID, appName, appIconUrl, nativeRedirectUrl, nativeCallbackUrl, nativeCustomScheme);
    const publishedSuccessfully = await app.publication().publish();
    // TODO: check pub status?
    setPublishingDid(false);

    if (publishedSuccessfully) {
      /* await dAppService.updateDapp(app);

      // Refresh all data
      await refreshAppIdentityStatus(); */
    }
  }

  const isAppIdentityPublished = (): boolean => {
    return appDIDDocumentStatusWasChecked && publishedDIDDocument != null
  }

  const getOnChainRedirectUrlEndpoint = (): string => {
    return getOnChainEndpoint("redirectUrl");
  }

  const getOnChainCustomSchemeEndpoint = (): string => {
    return getOnChainEndpoint("customScheme");
  }

  const getOnChainCallbackUrlEndpoint = (): string => {
    return getOnChainEndpoint("callbackUrl");
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

  /* const chainDeveloperDIDMatchesLocalDID = (): boolean => {
    return signedInUserDID == getOnChainAppDeveloperDID();
  }

    public chainRedirectURLMatchesLocalRedirectURL(): boolean {
    return nativeRedirectUrl == getOnChainRedirectUrlEndpoint();
  }

    public chainCustomSchemeMatchesLocalCustomScheme(): boolean {
    return nativeCustomScheme == getOnChainCustomSchemeEndpoint();
  }

    public chainCallbackURLMatchesLocalCallbackURL(): boolean {
    return nativeCallbackUrl == getOnChainCallbackUrlEndpoint();
  }

    public chainAppNameMatchesLocalAppName(): boolean {
    return appName == publishedAppInfo.name;
  }

    public chainAppIconMatchesLocalAppIcon(): boolean {
    return appIconUrl === publishedAppInfo.iconUrl; // TODO CHECK THIS
  }*/

  const appIdentityNeedsToBePublished = (): boolean => {
    return true; // TODO
    /* return !isAppIdentityPublished() ||
      !chainAppNameMatchesLocalAppName() ||
      !chainAppIconMatchesLocalAppIcon() ||
      !chainDeveloperDIDMatchesLocalDID() ||
      !chainCallbackURLMatchesLocalCallbackURL() ||
      !chainRedirectURLMatchesLocalRedirectURL() ||
      !chainCustomSchemeMatchesLocalCustomScheme(); */
  }

  const copyAppDIDToClipboard = async () => {
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

  return (
    <div>
      <div>
        <div className="flex flex-col">
          <div>
            {/* <ion-img *ngIf="!fetchingIcon && !uploadingIcon" [src]="getAppIcon()"
              onClick="selectAndUploadAppIconFromLibrary()"></ion-img> */}
            {/* <p *ngIf="!fetchingIcon && !uploadingIcon && !base64iconPath">{{ 'developers.set-app-icon' | translate
              }}</p>
            <p *ngIf="!fetchingIcon && !uploadingIcon && base64iconPath">{{ 'developers.touch-to-change' | translate
              }}</p> */}
            {/* <ion-spinner * ngIf="fetchingIcon || uploadingIcon" ></ion - spinner > */}
          </div>
          <div>
            <p>Title</p>
          </div>
          <div>
            {/* <ion-input [(ngModel)]="appName" placeholder="{{ 'developers.appName-placeholder' | translate }}">
            </ion-input> */}
          </div>
        </div>
      </div >

      <div>
        <div className="flex flex-row">
          <div >
            <h1>Identity status</h1>
            {/* <ion-icon name="help-circle" onClick={dAppService.showHelp($event, appIdentityHelpMessage)}></ion-icon> */}
          </div>
        </div>
        <div>
          <div>
            <div >
              <p>DID</p>
              {/* <ion-icon name="copy" onClick={copyAppDIDToClipboard}></ion-icon> */}
            </div>
            <div >
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
          <div>
            <div >
              <p>App DID published?</p>
            </div>
            <div >
              {!appDIDDocumentStatusWasChecked && <Typography>Checking</Typography>}
              {appDIDDocumentStatusWasChecked && publishedDIDDocument && <Typography>App DID published</Typography>}

              {/*  <ion-icon *ngIf="appDIDDocumentStatusWasChecked && !publishedAppInfo.didDocument"
name = "alert-circle-outline" ></ion-icon > */}
              {appDIDDocumentStatusWasChecked && !publishedDIDDocument && <Typography>Not published</Typography>}
            </div>
          </div >
          {/* <div  >
            <div >
              <p>Developer DID  published?</p>
            </div>
            <div className="status-icon">
              {developerDIDDocument && <Typography >Yes published</Typography>}

              {!developerDIDDocument && <ion-icon name="alert-circle-outline" ></ion-icon>}
              {!developerDIDDocument && <Typography >No published</Typography>}
            </div>
          </div> */}
          {appDIDDocumentStatusWasChecked && <div >
            {/* <div >
              <p>App attached to dev</p>
            </div>
            <div className="status-icon">
              {getOnChainAppDeveloperDID() && <Typography>Yes published</Typography>}

              {!getOnChainAppDeveloperDID() && <ion-icon name="alert-circle-outline" ></ion-icon>}
              {!getOnChainAppDeveloperDID() && <Typography  >No published</Typography>}
            </div> */}
          </div>}
          <div >
            <div >
              <p>Native redirect url</p>
              {/* <ion-icon name="help-circle" onClick={() => dAppService.showHelp($event, nativeRedirectUrlHelpMessage)}>
        </ion-icon> */}
            </div>
            {/* <div >
      <ion-input [(ngModel)]="nativeRedirectUrl"
      placeholder="Redirect url"></ion-input>
            </div>
          </div>
    <div * ngIf="appDIDDocumentStatusWasChecked" class="input-row" >
      <div >
        <p>Native scheme</p>
        <ion-icon name="help-circle" onClick='dAppService.showHelp($event, nativeCustomSchemeHelpMessage)'>
      </ion-icon>
            </div>
    <div >
      <ion-input [(ngModel)]="nativeCustomScheme"
      placeholder="Native custom scheme"></ion-input>
            </div>
          </div>
    <div * ngIf="appDIDDocumentStatusWasChecked" class="input-row" >
      <div >
        <p>{{ 'developers.native-callback-url' | translate }}</p>
        <ion-icon name="help-circle" onClick='dAppService.showHelp($event, nativeCallbackUrlHelpMessage)'>
      </ion-icon>
            </div>
    <div >
      <ion-input [(ngModel)]="nativeCallbackUrl"
      placeholder="Native callback url"></ion-input>
            </div>
          </div>
        </div >
    </div > */}

            {appDIDDocumentStatusWasChecked && appIdentityNeedsToBePublished() && !publishingDid &&
              <MainButton
                onClick={() => publishAppIdentity()}>Publish DID</MainButton>
/* {/* <ion-spinner * ngIf="appDIDDocumentStatusWasChecked && appIdentityNeedsToBePublished() && publishingDid" >
    </ion - spinner > */} */

            {!appIdentityNeedsToBePublished() && <p>Up to date</p>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationDetailsPage;