import { MainButton } from "@components/generic/MainButton";
import { VerticalStackLoadingCard } from "@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { DeveloperAccessToken } from "@model/developer-access-token/developer-access-token";
import { Typography } from "@mui/material";
import { useToast } from "@services/feedback.service";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { AccessTokenRow } from "./AccessTokenRow";

export const AccessTokens: FC = () => {
  const router = useRouter();
  const [activeUser] = useBehaviorSubject(authUser$);
  const developmentFeature = activeUser?.get("development");
  const [accessTokens] = useBehaviorSubject(developmentFeature?.accessTokens$);
  const mounted = useMounted();
  const [creatingToken, setCreatingToken] = useState(false);
  const [createdToken, setCreatedToken] = useState<{ storedToken: DeveloperAccessToken, clearToken: string }>(null);
  const { showSuccessToast } = useToast();

  const newAccessToken = async (): Promise<void> => {
    setCreatingToken(true);
    const newToken = await developmentFeature.createAccessToken();
    setCreatedToken(newToken);
    setCreatingToken(false);

    if (newToken)
      showSuccessToast("Access key successfully created");
  }

  return (
    <div className="mt-8">
      <Typography variant="h6">Access keys</Typography>
      {(!mounted || !accessTokens) && <VerticalStackLoadingCard />}
      {mounted && accessTokens && <>
        {accessTokens?.length === 0 && <div>No existing access key. Create one to get access to SDK features.</div>}
        {accessTokens?.length > 0 && <div>
          {
            accessTokens.map((accessToken, i) => <AccessTokenRow key={i} accessToken={accessToken} />)
          }
        </div>}

        <MainButton onClick={newAccessToken} busy={creatingToken} className="mt-2">New access key</MainButton>

        {createdToken &&
          <div className="mt-4">
            <Typography><b>Your access key was created, please save it:</b> {createdToken.clearToken}</Typography>
          </div>
        }
      </>}
    </div >
  )
}