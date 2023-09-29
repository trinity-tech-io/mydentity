import { MainButton } from "@components/generic/MainButton";
import { VerticalStackLoadingCard } from "@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { DeveloperAccessKey } from "@model/developer-access-key/developer-access-key";
import { Typography } from "@mui/material";
import { useToast } from "@services/feedback.service";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { AccessKeyRow } from "./AccessKeyRow";

export const AccessKeys: FC = () => {
  const router = useRouter();
  const [activeUser] = useBehaviorSubject(authUser$);
  const developmentFeature = activeUser?.get("development");
  const [accessKeys] = useBehaviorSubject(developmentFeature?.accessKeys$);
  const mounted = useMounted();
  const [creatingKey, setCreatingKey] = useState(false);
  const [createdKey, setCreatedKey] = useState<{ storedKey: DeveloperAccessKey, clearKey: string }>(null);
  const { showSuccessToast } = useToast();

  const newAccessKey = async (): Promise<void> => {
    setCreatingKey(true);
    const newKey = await developmentFeature.createAccessKey();
    setCreatedKey(newKey);
    setCreatingKey(false);

    if (newKey)
      showSuccessToast("Access key successfully created");
  }

  return (
    <div className="mt-8">
      <Typography variant="h6">Access keys</Typography>
      {(!mounted || !accessKeys) && <VerticalStackLoadingCard />}
      {mounted && accessKeys && <>
        {accessKeys?.length === 0 && <div>No existing access key. Create one to get access to SDK features.</div>}
        {accessKeys?.length > 0 && <div>
          {
            accessKeys.map((accessKey, i) => <AccessKeyRow key={i} accessKey={accessKey} />)
          }
        </div>}

        <MainButton onClick={newAccessKey} busy={creatingKey} className="mt-2">New access key</MainButton>

        {createdKey &&
          <div className="mt-4">
            <Typography><b>Your access key was created, please save it:</b> {createdKey.clearKey}</Typography>
          </div>
        }
      </>}
    </div >
  )
}