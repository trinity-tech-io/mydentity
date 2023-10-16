"use client";
import { FC, useEffect } from "react";
import { Grid } from "@mui/material";
import { clearOnGoingFlowOperation } from "@services/flow.service";
import { WelcomeBanner } from "./WelcomeBanner";
import { AccountAccess } from "./widgets/AccountAccess";
import { AccountUnlock } from "./widgets/AccountUnlock";
import { IdentityListWidget } from "./widgets/IdentityList";
import { RecentActivityWidget } from "./widgets/recent-activity/RecentActivity";

const Dashboard: FC = () => {
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
