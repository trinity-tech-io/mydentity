"use client"
import { FC, useState } from "react";
import { CredentialListWidget } from "./widgets/CredentialList";
import { Typography } from "@mui/material";
import { CredentialDetailWidget } from "./widgets/CredentialDetail";
import { Credential } from "@model/credential/credential";

const CredentialsList: FC = () => {
  const [selectedCredential, setSelectedCredential] = useState<Credential>(null);
  const handleSelectCredential = (credential: Credential) => {
    setSelectedCredential(credential);
  }

  return (<>
    <div className="col-span-full">
      <Typography ml={2} my={3} variant="h5">All Credentials</Typography>
    </div>
    {/* Widgets */}
    <CredentialListWidget onSelected={(credential: Credential)=>{handleSelectCredential(credential)}} />
    <CredentialDetailWidget selectedCredential={selectedCredential}/>
  </>)
}

export default CredentialsList;