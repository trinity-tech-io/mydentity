import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon as ReactIcon } from "@iconify/react";
import { MainButton } from "@components/generic/MainButton";
import { VerticalStackLoadingCard } from "@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { DeveloperAccessKey } from "@model/developer-access-key/developer-access-key";
import { Stack, Typography } from "@mui/material";
import { useToast } from "@services/feedback.service";
import { authUser$ } from "@services/user/user.events";
import { AccessKeyRow } from "./AccessKeyRow";
import SecuritySection from "../../account/security/components/SecuritySection";
import {
  SecurityState,
  SecurityStatus,
} from "../../dashboard/components/SecurityStatus";
import KeyTextfield from "./KeyTextfield";

export const AccessKeys: FC = () => {
  const router = useRouter();
  const [activeUser] = useBehaviorSubject(authUser$);
  const developmentFeature = activeUser?.get("development");
  const [accessKeys] = useBehaviorSubject(developmentFeature?.accessKeys$);
  const mounted = useMounted();
  const [creatingKey, setCreatingKey] = useState(false);
  const [createdKey, setCreatedKey] = useState<{
    storedKey: DeveloperAccessKey;
    clearKey: string;
  }>(null);
  const { showSuccessToast } = useToast();

  const newAccessKey = async (): Promise<void> => {
    setCreatingKey(true);
    const newKey = await developmentFeature.createAccessKey();
    setCreatedKey(newKey);
    setCreatingKey(false);

    if (newKey) showSuccessToast("Access key successfully created");
  };

  return (
    <SecuritySection
      className="h-full"
      icon={<ReactIcon icon="ic:baseline-key" />}
      title="Access Keys"
      statusTitle={`${!!accessKeys?.length ? "" : "NOT "}GENERATED`}
      isSet={!!accessKeys?.length}
      actionTitle="GENERATE ACCESS KEYS"
      actionInProgress={creatingKey}
      handleAction={newAccessKey}
    >
      {createdKey ? (
        <Stack spacing={2}>
          <Typography variant="body2">
            Please use the access key below in your application
          </Typography>
          <KeyTextfield
            value={createdKey.clearKey}
            outerProps={{ readOnly: true }}
            inputProps={{ className: "opacity-80" }}
          />
          <SecurityStatus
            state={SecurityState.Good}
            advice="Your access key has been generated. Kindly save it for future use."
          />
        </Stack>
      ) : (
        <Typography variant="body2">
          Developers can create access keys for remote interactions with this
          service, facilitating seamless integration and functionality for their
          applications.
        </Typography>
      )}
    </SecuritySection>
    // <div className="mt-8">
    //   <Typography variant="h6">Access keys</Typography>
    //   {(!mounted || !accessKeys) && <VerticalStackLoadingCard />}
    //   {mounted && accessKeys && <>
    //     {accessKeys?.length === 0 && <div>No existing access key. Create one to get access to SDK features.</div>}
    //     {accessKeys?.length > 0 && <div>
    //       {
    //         accessKeys.map((accessKey, i) => <AccessKeyRow key={i} accessKey={accessKey} />)
    //       }
    //     </div>}

    //     <MainButton onClick={newAccessKey} busy={creatingKey} className="mt-2">New access key</MainButton>

    //     {createdKey &&
    //       <div className="mt-4">
    //         <Typography><b>Your access key was created, please save it:</b> {createdKey.clearKey}</Typography>
    //       </div>
    //     }
    //   </>}
    // </div >
  );
};
