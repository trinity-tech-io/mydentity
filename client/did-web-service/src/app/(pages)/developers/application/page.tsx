"use client";
import { CopyButton } from "@components/button";
import { EditableCredentialAvatar } from "@components/credential/EditableCredentialAvatar";
import { MainButton } from "@components/generic/MainButton";
import Headline from "@components/layout/Headline";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Credential } from "@model/credential/credential";
import { Document } from "@model/document/document";
import { editAvatarOnHive } from "@model/regular-identity/features/profile/upload-avatar";
import { Input, Stack, TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useToast } from "@services/feedback.service";
import { didDocumentService } from "@services/identity/diddocuments.service";
import { logger } from "@services/logger";
import { authUser$ } from "@services/user/user.events";
import { useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import CardReader from "../components/CardReader";
import ApplicationCard from "@components/applications/ApplicationCard";
import AccountForm from "@components/form/AccountForm";
import { generateTheme } from "@/app/theming/material-ui.theme";

const ApplicationDetailsPage: FC<{
  params: {
    applicationdid: string;
  };
}> = ({ params }) => {
  const searchParams = useSearchParams();
  const appDidParam = searchParams?.get("did");
  const applicationDid = appDidParam && decodeURIComponent(appDidParam); // From the url, app we are trying to manage
  const [activeUser] = useBehaviorSubject(authUser$);
  const identityFeature = activeUser?.get("identity");
  const [appIdentities] = useBehaviorSubject(
    identityFeature?.applicationIdentities$
  );
  const appIdentity = appIdentities?.find((a) => a.did === applicationDid); // Real app identity object from the user, if found
  const [localAppIdentityCredentials] = useBehaviorSubject(
    appIdentity?.credentials().credentials$
  ); // Credentials of the app identity, local (maybe not published) - KEEP it unused to load the credentials
  const [localAppCredential, setLocalAppCredential] =
    useState<Credential>(null);
  const [appName, setAppName] = useState<string>(null); // UI model, possibly not yet saved to local VC/published VC
  const [appIconUrl, setAppIconUrl] = useState<string>(null); // UI model, possibly not yet saved to local VC/published VC
  const [appDIDDocumentStatusWasChecked, setAppDIDDocumentStatusWasChecked] =
    useState(false); // Whether the App DID document has been checked on chain or not yet
  const [publishedDIDDocument, setPublishedDIDDocument] =
    useState<Document>(null);
  const [appIdentityNeedsToBePublished, setAppIdentityNeedsToBePublished] =
    useState(false);
  //const developerDIDDocument: DIDPlugin.DIDDocument = null;
  const [publishingIdentity, setPublishingIdentity] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();
  const [showMnemonic, setShowMnemonic] = useState<string>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const appNameInput = useRef(null);

  const fetchRemoteDIDDocument = useCallback((): void => {
    console.log("applicationDid", applicationDid);
    setAppDIDDocumentStatusWasChecked(false);
    didDocumentService
      .resolveDIDDocument(applicationDid, true)
      .then(async (doc) => {
        setPublishedDIDDocument(doc);
        setAppDIDDocumentStatusWasChecked(true);

        if (doc) {
          logger.log("developers", "App DID is on chain");
        } else {
          logger.log("developers", "App DID is NOT on chain");
        }
      });
  }, [applicationDid]);

  // Component initialization
  useEffect(() => {
    // Get the did document on chain, without any local cache
    logger.log(
      "developers",
      "Checking if the application DID is on chain or not"
    );
    fetchRemoteDIDDocument();
  }, [fetchRemoteDIDDocument]);

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
    setLocalAppCredential(
      appIdentity?.credentials().getCredentialByType("ApplicationCredential")
    );
  }, [appIdentity, localAppIdentityCredentials]);

  const updateLocalAppCredential = async () => {
    await appIdentity.update(appName, appIconUrl);
  };

  const publishAppIdentity = async (): Promise<void> => {
    if (publishingIdentity) return;

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
    // Get a fresh version of the published document so the UI can normally update and tell "up to date"
    fetchRemoteDIDDocument();
    setPublishingIdentity(false);
  };

  const isAppIdentityPublished = (): boolean => {
    return appDIDDocumentStatusWasChecked && publishedDIDDocument != null;
  };

  const getOnChainEndpoint = (endPointName: string): string => {
    if (!publishedDIDDocument) return "";

    const credential = publishedDIDDocument
      .getDIDDocument()
      .getCredential("#appinfo");
    if (!credential) return "";

    const subject = credential.getSubject();
    if (!("endpoints" in subject)) return "";
    else return subject.getProperty("endpoints")[endPointName] || "";
  };

  const getOnChainAppDeveloperDID = (): string => {
    if (!publishedDIDDocument) return null;

    const credential = publishedDIDDocument
      .getDIDDocument()
      .getCredential("#appinfo");
    if (!credential) return null;

    const subject = credential.getSubject();
    if (!("developer" in subject)) return "";
    else return subject.getProperty("developer")["did"] || "";
  };

  const chainAppNameMatchesLocalAppName = (): boolean => {
    const appCredential = publishedDIDDocument.getCredentialByType(
      "ApplicationCredential"
    );
    if (!appCredential) return false;

    return appName === appCredential.getSubject().getProperty("name");
  };

  const chainAppIconMatchesLocalAppIcon = (): boolean => {
    const appCredential = publishedDIDDocument.getCredentialByType(
      "ApplicationCredential"
    );
    if (!appCredential) return false;

    return appIconUrl === appCredential.getSubject().getProperty("iconUrl");
  };

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
  };

  const onAppTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setAppName(event.currentTarget?.value);
    updateAppIdentityNeedsToBePublished();
  };

  const copyAppDIDToClipboard = async (): Promise<void> => {
    /* await native.copyClipboard(app.didString);
    native.genericToast('developers.app-did-copied', 2000); */
  };

  const handleAppIconFileChanged = async (file: File): Promise<void> => {
    setUploadingAvatar(true);
    const uploadedAvatar = await editAvatarOnHive(appIdentity, file);
    console.log("uploadedAvatar", uploadedAvatar);
    setUploadingAvatar(false);

    await appIdentity.update(appName, uploadedAvatar.avatarHiveURL);
  };

  const handleExportMnemonic = async (): Promise<void> => {
    const mnemonic = await activeUser
      .get("identity")
      .exportMnemonic(appIdentity.identityRootId);
    if (mnemonic) {
      setShowMnemonic(mnemonic);
    }
  };

  const lightTheme = generateTheme("light");
  return (
    <div className="col-span-full">
      {/* <Breadcrumbs entries={["developers", "application-details"]} /> */}
      <Headline
        title="Application Details"
        description="Fill in the details below to register your app, which will enable seamless communication with the identity framework, enhancing services, and customizing user experiences."
        showBg={true}
      />
      <div className="sm:ml-[10vw]">
        <CardReader
          identityCard={
            appIdentity && (
              <ApplicationCard
                identity={appIdentity}
                wrapperClassName="w-full h-full"
              />
            )
          }
          detailPaper={
            <ThemeProvider theme={lightTheme}>
              <div className="flex flex-col">
                <EditableCredentialAvatar
                  credential={localAppCredential}
                  onFileUpload={handleAppIconFileChanged}
                  updating={uploadingAvatar}
                  width={48}
                  height={48}
                />
                <div className="mt-2 flex flex-col">
                  <AccountForm fullWidth>
                    <Typography
                      variant="caption"
                      component="label"
                      htmlFor="app-name"
                      fontSize={10}
                      fontWeight={600}
                      autoFocus
                      color="text.primary"
                    >
                      APPLICATION NAME
                    </Typography>
                    {localAppCredential && (
                      <Input
                        id="app-name"
                        autoFocus
                        defaultValue={localAppCredential
                          ?.getSubject()
                          .getProperty("name")}
                        inputProps={{
                          maxLength: 30,
                          style: { fontSize: 20 },
                          ref: appNameInput,
                        }}
                        // onChange={handleInputName}
                      />
                    )}
                  </AccountForm>
                  {appIdentity && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      className="mt-2"
                      spacing={1}
                    >
                      <Typography
                        variant="caption"
                        className="break-all"
                        color="text.primary"
                        fontSize={10}
                      >
                        {appIdentity.did}
                      </Typography>
                      <div className="inline">
                        <CopyButton text={appIdentity.did} />
                      </div>
                    </Stack>
                  )}
                </div>
              </div>
            </ThemeProvider>
          }
        />
      </div>
      <div>
        <Typography variant="h6">Application details</Typography>

        {/*  Header */}
        <div className="flex flex-col">
          {/* App icon */}
          <div className="flex">
            <EditableCredentialAvatar
              credential={localAppCredential}
              onFileUpload={handleAppIconFileChanged}
              updating={uploadingAvatar}
            />
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
                className="w-full"
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
      </div>

      {/* Other properties */}
      <div className="flex flex-col gap-4 mt-8">
        <div className="flex flex-row gap-4">
          <div>
            <p>DID</p>
            {/* <ion-icon name="copy" onClick={copyAppDIDToClipboard}></ion-icon> */}
          </div>
          <div className="inline-flex items-center">
            <Typography variant="body2">{applicationDid}</Typography>
            <CopyButton text={applicationDid} />
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
            {!appDIDDocumentStatusWasChecked && (
              <Typography>Checking</Typography>
            )}
            {appDIDDocumentStatusWasChecked && publishedDIDDocument && (
              <Typography>Yes</Typography>
            )}
            {appDIDDocumentStatusWasChecked && !publishedDIDDocument && (
              <Typography>No</Typography>
            )}
          </div>
        </div>

        {/** Show application DID mnemonic*/}
        {showMnemonic ? (
          <div className="inline-flex items-center">
            <div>{"Application DID mnemonic：" + showMnemonic}</div>
            <CopyButton text={showMnemonic} />
          </div>
        ) : (
          <MainButton onClick={handleExportMnemonic}>
            Application DID mnemonic
          </MainButton>
        )}

        <div className="mt-4">
          {appDIDDocumentStatusWasChecked &&
            localAppCredential &&
            appIdentityNeedsToBePublished && (
              <div>
                <div>Please update your application on chain.</div>
                <MainButton
                  onClick={publishAppIdentity}
                  busy={publishingIdentity}
                >
                  Publish DID
                </MainButton>
              </div>
            )}

          {appDIDDocumentStatusWasChecked &&
            localAppCredential &&
            !appIdentityNeedsToBePublished && <p>Up to date</p>}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsPage;
