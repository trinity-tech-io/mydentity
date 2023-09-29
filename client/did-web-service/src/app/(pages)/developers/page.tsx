"use client";
import { Typography } from "@mui/material";
import { FC } from "react";
import { AccessKeys } from "./components/AccessKeys";
import { AppsList } from "./components/AppsList";

const ElastosPage: FC = () => {
  return (<div className="col-span-full">
    <Typography variant="h6">Developers zone</Typography>
    <Typography>This section is for application and service developers.</Typography>
    <Typography>As a Web3 identity developer you can configure application DIDs and get access keys to interact with this service remotely.</Typography>

    <AccessKeys />
    <AppsList />
  </div>)
}

export default ElastosPage;