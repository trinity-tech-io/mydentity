"use client";
import { FC } from "react";
import { Grid } from "@mui/material";
import { AccessKeys } from "./components/AccessKeys";
import { AppsList } from "./components/AppsList";
import Headline from "@components/layout/Headline";

const ElastosPage: FC = () => {
  return (
    <div className="col-span-full">
      <Headline
        title="Developer Zone"
        description="This section is dedicated to application and service developers. As a Web3 identity developer, you have the capability to configure application DIDs and obtain access keys, enabling remote interaction with this service."
        showBg={true}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AccessKeys />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppsList />
        </Grid>
      </Grid>
    </div>
  );
};

export default ElastosPage;
