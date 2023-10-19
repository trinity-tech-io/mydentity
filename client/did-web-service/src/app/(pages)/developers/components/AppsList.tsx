import { ChangeEventHandler, FC, FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon as ReactIcon } from "@iconify/react";
import { FormHelperText, Input, Typography } from "@mui/material";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { authUser$ } from "@services/user/user.events";
import { AppRow } from "./AppRow";
import SecuritySection from "../../account/security/components/SecuritySection";
import AccountForm from "@components/form/AccountForm";
import { callWithUnlock } from "@components/security/unlock-key-prompt/call-with-unlock";
import { useToast } from "@services/feedback.service";

const CreatingSteps = [
  "Creating the application identity",
  "Publishing the application identity on the identity chain",
];
export const AppsList: FC = () => {
  const [appName, setAppName] = useState("");
  const [creatingApp, setCreatingApp] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [ready2generate, setReady2generate] = useState(false);
  const [activeUser] = useBehaviorSubject(authUser$);
  const identityFeature = activeUser?.get("identity");
  const [appIdentities] = useBehaviorSubject(
    identityFeature?.applicationIdentities$
  );
  const appNameInput = useRef();
  const mounted = useMounted();
  const router = useRouter();
  const { showSuccessToast } = useToast();

  const newApp = (): void => {
    router.push("/developers/new-application");
  };

  const handleCreateButton = (): void => {
    setReady2generate(true);
  };

  const handleInputName: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setAppName(e.target.value.trim());
  };

  const onCreateApp = async (e?: FormEvent): Promise<void> => {
    // Disable form submit
    e?.preventDefault();
    setCreatingApp(true);
    try {
      // Create identity for real in the backend - this triggers a first publishing without app info credential inside

      const applicationIdentity = await callWithUnlock(
        async () =>
          await activeUser.get("identity").createApplicationIdentity(appName)
      );
      if (applicationIdentity) {
        setProgressStep(1);
        // Wait until the app did is published on chain
        await applicationIdentity.publication().awaitIdentityPublished();

        // Create a first empty application credential in this new identity. User is going to edit it
        // and publish the app did again right after
        applicationIdentity.update(appName, "");
        showSuccessToast("The application identity was created");
        router.push("/developers/application?did=" + applicationIdentity.did);
      }
      setCreatingApp(false);
    } catch (e) {
      showSuccessToast("Failed to create new application");
      setCreatingApp(false);
    }
  };

  return (
    <SecuritySection
      className="h-full"
      icon={<ReactIcon icon="material-symbols:apps" />}
      title="Applications"
      statusTitle={`${appIdentities?.length ? "" : "NO "}APPS AVAILABLE`}
      isSet={appIdentities && appIdentities?.length > 0}
      actionTitle={
        !ready2generate ? "CREATE APPLICATION" : "GENERATE APPLICATION IDENTITY"
      }
      actionInProgress={creatingApp}
      disabledAction={ready2generate && !appName.trim().length}
      handleAction={!ready2generate ? handleCreateButton : onCreateApp}
      disabledSkel={true}
      loaded={mounted && !!appIdentities}
    >
      <Typography variant="body2">
        You can create a new application identity called a DID, which will
        identify your app in various contexts. For instance, when your app
        issues credentials, users will see your app's logo and icon as the
        'issuer'.
      </Typography>
      {ready2generate && (
        <form className="mt-8" onSubmit={onCreateApp}>
          <AccountForm fullWidth>
            <Typography
              variant="caption"
              component="label"
              htmlFor="app-name"
              fontSize={10}
              fontWeight={600}
              autoFocus
            >
              APPLICATION NAME
            </Typography>
            <Input
              id="app-name"
              autoFocus
              inputProps={{
                maxLength: 30,
                ref: appNameInput,
              }}
              onChange={handleInputName}
            />
            {creatingApp && (
              <FormHelperText className="visible">
                {CreatingSteps[progressStep]} ...
              </FormHelperText>
            )}
          </AccountForm>
        </form>
      )}
    </SecuritySection>
  );
};
