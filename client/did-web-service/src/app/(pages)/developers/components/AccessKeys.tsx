import { FC, useState } from "react";
import { Icon as ReactIcon } from "@iconify/react";
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
      statusTitle={`${accessKeys?.length > 0 ? "" : "NOT "}GENERATED`}
      isSet={accessKeys && accessKeys?.length > 0}
      actionTitle="GENERATE ACCESS KEYS"
      actionInProgress={creatingKey}
      handleAction={newAccessKey}
      disabledSkel={true}
      loaded={mounted && !!accessKeys}
    >
      {createdKey ? (
        <Stack spacing={2}>
          <Typography variant="body2">
            Please use the access key below in your application
          </Typography>
          <KeyTextfield
            value={createdKey.clearKey}
            outerProps={{ readOnly: true }}
            inputProps={{ className: "opacity-80", style: { fontSize: 12 } }}
          />
          <SecurityStatus
            state={SecurityState.Good}
            advice="Your access key has been generated. Kindly save it for future use."
          />
        </Stack>
      ) : (
        <Stack className="h-full" spacing={2}>
          <Typography variant="body2" className="flex-1">
            Developers can create access keys for remote interactions with this
            service, facilitating seamless integration and functionality for
            their applications.
          </Typography>
          {accessKeys?.length > 0 && (
            <Typography variant="caption" fontStyle="italic">
              {"Last generated : "}
              {accessKeys[accessKeys.length - 1].createdAt.toLocaleString()}
            </Typography>
          )}
        </Stack>
      )}
    </SecuritySection>
  );
};
