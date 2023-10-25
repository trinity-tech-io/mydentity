"use client";
import { generateTheme } from "@/app/theming/material-ui.theme";
import ApplicationCard from "@components/applications/ApplicationCard";
import { CopyButton, DarkButton } from "@components/button";
import { EditableCredentialAvatar } from "@components/credential/EditableCredentialAvatar";
import AccountForm from "@components/form/AccountForm";
import Headline from "@components/layout/Headline";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Credential } from "@model/credential/credential";
import { Document } from "@model/document/document";
import { editAvatarOnHive } from "@model/regular-identity/features/profile/upload-avatar";
import { Input, Stack, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useToast } from "@services/feedback.service";
import { didDocumentService } from "@services/identity/diddocuments.service";
import { logger } from "@services/logger";
import { authUser$ } from "@services/user/user.events";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  SecurityState,
  SecurityStatus,
} from "../../dashboard/components/SecurityStatus";
import AppPhrase from "../components/AppPhrase";
import CardReader from "../components/CardReader";

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
  const { showErrorToast } = useToast();
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const appNameInput = useRef(null);
  const lightTheme = generateTheme("light");

  const fetchRemoteDIDDocument = useCallback((): void => {
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
  }, [appIdentity]);

  useEffect(() => {
    if (localAppCredential) {
      setAppName(localAppCredential?.getSubject().getProperty("name"));
      setAppIconUrl(localAppCredential?.getSubject().getProperty("iconUrl"));
    }
  }, [localAppCredential]);

  useEffect(() => {
    updateAppIdentityNeedsToBePublished();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appName, appIconUrl, publishedDIDDocument]);

  useEffect(() => {
    setLocalAppCredential(
      appIdentity?.credentials().getCredentialByType("ApplicationCredential")
    );
  }, [appIdentity, localAppIdentityCredentials]);

  const updateLocalAppCredential = async (): Promise<void> => {
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
    const appCredential = publishedDIDDocument?.getCredentialByType(
      "ApplicationCredential"
    );
    if (!appCredential) return false;

    return appName === appCredential.getSubject().getProperty("name");
  };

  const chainAppIconMatchesLocalAppIcon = (): boolean => {
    const appCredential = publishedDIDDocument?.getCredentialByType(
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

  const handleAppIconFileChanged = async (file: File): Promise<void> => {
    setUploadingAvatar(true);
    const uploadedAvatar = await editAvatarOnHive(appIdentity, file);
    setUploadingAvatar(false);

    await appIdentity.update(appName, uploadedAvatar.avatarHiveURL);
  };

  return (
    <div className="col-span-full">
      {/* <Breadcrumbs entries={["developers", "application-details"]} /> */}
      <Headline
        title="Application Details"
        description="Fill in the details below to register your app, which will enable seamless communication with the identity framework, enhancing services, and customizing user experiences."
        showBg={true}
      />
      <div className="sm:ml-[10vw] max-w-lg">
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
              <div className="flex flex-col h-full">
                <div className="flex">
                  <EditableCredentialAvatar
                    credential={localAppCredential}
                    onFileUpload={handleAppIconFileChanged}
                    updating={uploadingAvatar}
                    width={48}
                    height={48}
                  />
                  <div className="text-sm ml-auto">
                    {appDIDDocumentStatusWasChecked && (
                      <div
                        className={clsx(
                          "rounded-md text-[7pt] px-3 py-1 inline-block text-white whitespace-nowrap",
                          publishedDIDDocument ? "bg-[#34A853]" : "bg-[#EA4335]"
                        )}
                      >
                        {publishedDIDDocument ? "PUBLISHED" : "UNPUBLISHED"}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex flex-col flex-1">
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
                        defaultValue={appName}
                        inputProps={{
                          maxLength: 30,
                          style: { fontSize: 20 },
                          ref: appNameInput,
                        }}
                        // onChange={handleInputName}
                        onChange={onAppTitleChange}
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
                        className="break-all flex-1"
                        color="text.primary"
                        fontSize={9}
                      >
                        {appIdentity.did}
                      </Typography>
                      <div className="inline">
                        <CopyButton text={appIdentity.did} />
                      </div>
                    </Stack>
                  )}
                  <AppPhrase appIdentity={appIdentity} />
                </div>
              </div>
            </ThemeProvider>
          }
        />
        {appDIDDocumentStatusWasChecked && localAppCredential && (
          <Stack className="p-4" spacing={2}>
            <div className="px-4">
              {appIdentityNeedsToBePublished ? (
                <SecurityStatus
                  state={SecurityState.Average}
                  advice="The local application info has been modified. Please publish it for others to view your new app info."
                />
              ) : (
                <SecurityStatus
                  state={SecurityState.Good}
                  advice="The application info is up-to-date. If the local application info is modified, you need to republish the DID again."
                />
              )}
            </div>
            <DarkButton
              loading={publishingIdentity}
              onClick={publishAppIdentity}
              disabled={!appIdentityNeedsToBePublished}
            >
              PUBLISH DID
            </DarkButton>
          </Stack>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetailsPage;
