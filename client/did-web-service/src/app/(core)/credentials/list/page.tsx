"use client"
import { FC } from "react";
import { CredentialListWidget } from "./widgets/CredentialList";
import { Typography } from "@mui/material";
import { CredentialDetailWidget } from "./widgets/CredentialDetail";

const CredentialsList: FC = () => {
  return (<>
    <div className="col-span-full">
      <Typography ml={2} my={3} variant="h5">All Credentials</Typography>
    </div>
    {/* Widgets */}
    <CredentialListWidget />
    <CredentialDetailWidget />
  </>)
}

export default CredentialsList;