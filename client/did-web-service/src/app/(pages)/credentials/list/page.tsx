"use client"
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { Credential } from "@model/credential/credential";
import { Typography } from "@mui/material";
import { FC, useState } from "react";
import { CredentialDetailWidget } from "./components/CredentialDetail";
import { CredentialListWidget } from "./components/CredentialList";

const CredentialsList: FC = () => {
  const [selectedCredential, setSelectedCredential] = useState<Credential>(null);
  const handleSelectCredential = (credential: Credential): void => {
    setSelectedCredential(credential);
  }

  return (<>
    <div className="col-span-full">
      <Breadcrumbs entries={["credentials-list"]} />

      <Typography ml={2} my={3} variant="h4">All Credentials</Typography>
      <Typography ml={2} my={3}>Below is the list of all your <b>credentials</b>. Credentials are pieces of information about you. This information has been created either by you, or by other applications on your behalf. This full list of credentials contains credentials from your base identity profile, plus everything else.</Typography>
    </div>
    <CredentialListWidget onSelected={handleSelectCredential} />
    <CredentialDetailWidget selectedCredential={selectedCredential} />
  </>)
}

export default CredentialsList;