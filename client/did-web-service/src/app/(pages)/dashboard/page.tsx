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

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RecentActivityWidget />
        </Grid>
        <Grid item xs={12} md={6}>
          <IdentityListWidget />
        </Grid>
        <Grid item xs={12} md={6}>
          <AccountAccess />
        </Grid>
        <Grid item xs={12} md={6}>
          <AccountUnlock />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
