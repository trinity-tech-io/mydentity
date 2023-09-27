import { MainButton } from "@components/generic/MainButton";
import { VerticalStackLoadingCard } from "@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { Typography } from "@mui/material";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { AppRow } from "./AppRow";

export const AppsList: FC = () => {
  const router = useRouter();
  const [activeUser] = useBehaviorSubject(authUser$);
  const identityFeature = activeUser?.get("identity");
  const developmentFeature = activeUser?.get("development");
  const [appIdentities] = useBehaviorSubject(identityFeature?.applicationIdentities$);
  const mounted = useMounted();

  const newApp = (): void => {
    router.push("/developers/new-application");
  }

  return (
    <div className="mt-8">
      <Typography variant="h6">Applications</Typography>
      {(!mounted || !appIdentities) && <VerticalStackLoadingCard />}
      {mounted && appIdentities && <>
        {appIdentities?.length === 0 && <div>No application yet</div>}
        {appIdentities?.length > 0 && <div>
          {
            appIdentities.map((app, i) => <AppRow key={i} application={app} />)
          }
        </div>}

        <MainButton onClick={newApp} className="mt-2">New application</MainButton>
      </>}
    </div >
  )
}