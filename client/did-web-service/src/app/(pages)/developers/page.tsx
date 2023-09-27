"use client";
import { Typography } from "@mui/material";
import { FC } from "react";
import { AccessTokens } from "./components/AccessTokens";
import { AppsList } from "./components/AppsList";

const ElastosPage: FC = () => {
  return (<div className="col-span-full">
    <Typography variant="h6">Developers zone</Typography>
    <Typography>This section is for application and service developers.</Typography>
    <Typography>Developers can configure application DIDs and get access tokens to interact with this service remotely.</Typography>

    <AccessTokens />
    <AppsList />
  </div>)
}

export default ElastosPage;