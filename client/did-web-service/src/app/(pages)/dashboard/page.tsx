'use client'
import { MainButton } from "@components/generic/MainButton";
import { VerticalStackLoadingCard } from "@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { clearOnGoingFlowOperation } from "@services/flow.service";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { WelcomeBanner } from "./WelcomeBanner";
import { AccountAccess } from "./widgets/AccountAccess";
import { AccountUnlock } from "./widgets/AccountUnlock";
import { IdentityListWidget } from "./widgets/IdentityList";
import { RecentActivityWidget } from "./widgets/recent-activity/RecentActivity";
import { Grid } from "@mui/material";

const Dashboard: FC = () => {
  const [authUser] = useBehaviorSubject(authUser$);
  const router = useRouter();
  const { mounted } = useMounted();

  useEffect(() => {
    clearOnGoingFlowOperation();
  }, []);

  const signUp = (): void => {
    router.push("/signup")
  }

  const signIn = (): void => {
    router.push("/signin")
  }

  return (<>
    {/* Top part */}
    <div className="col-span-full">
      {/* Welcome banner */}
      <WelcomeBanner />
    </div>

    {!mounted && <VerticalStackLoadingCard className="col-span-full" />}

    {mounted && <>
      {/* Widgets */}
      {authUser &&
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <RecentActivityWidget />
            </Grid>
            <Grid item xs={12} md={6}>
              <IdentityListWidget />
            </Grid>
          </Grid>
          {/* Duplicate with recent activity <RecentApplicationsWidget /> */}
          <AccountAccess />
          <AccountUnlock />
        </>
      }

      {/* Not signed in */}
      {!authUser &&
        <div className="col-span-full flex flex-col">
          You want a real web3 identity? You've landed at the right place!<br />
          Continue with one of the following actions:
          <div className="flex flex-row gap-6 mt-4">
            <MainButton onClick={signUp} >Sign up</MainButton>
            <MainButton onClick={signIn} >Sign in</MainButton>
          </div>
        </div>
      }
    </>}
  </>)
}

export default Dashboard;