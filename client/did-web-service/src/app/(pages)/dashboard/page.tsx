"use client";
import { FC, useEffect } from "react";
import { Grid } from "@mui/material";
import { VerticalStackLoadingCard } from "@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { clearOnGoingFlowOperation } from "@services/flow.service";
import { authUser$ } from "@services/user/user.events";
import { WelcomeBanner } from "./WelcomeBanner";
import { AccountAccess } from "./widgets/AccountAccess";
import { AccountUnlock } from "./widgets/AccountUnlock";
import { IdentityListWidget } from "./widgets/IdentityList";
import { RecentActivityWidget } from "./widgets/recent-activity/RecentActivity";

const Dashboard: FC = () => {
  const [authUser] = useBehaviorSubject(authUser$);
  const { mounted } = useMounted();

  useEffect(() => {
    clearOnGoingFlowOperation();
  }, []);

  return (
    <>
      {/* Top part */}
      <div className="col-span-full">
        {/* Welcome banner */}
        <WelcomeBanner />
      </div>

      {/* {!mounted && <VerticalStackLoadingCard className="col-span-full" />} */}

      {/* {mounted && ( */}
        <>
          {/* Widgets */}
          {/* {authUser && ( */}
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
              <div className="pt-6">
                <AccountAccess />
                <AccountUnlock />
              </div>
            </>
          {/* )} */}
        </>
      {/* )} */}
    </>
  );
};

export default Dashboard;
