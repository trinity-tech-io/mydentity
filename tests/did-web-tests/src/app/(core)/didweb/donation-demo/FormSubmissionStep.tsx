import { MainButton } from "@components/MainButton";
import { ImportedCredential } from "@elastosfoundation/elastos-connectivity-sdk-js/typings/did";
import { Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { CreatedManagedIdentity, createManagedIdentity } from "@trinitytech/did-web-service-sdk";
import { FC, useEffect, useRef, useState } from "react";
import { importCredentials } from "./import-credentials-helper";

export const FormSubmissionStep: FC<{
  onCreatedIdentity: (identity: CreatedManagedIdentity) => void;
  onImportedCredentials: () => void;
}> = ({ }) => {
  const nameInput = useRef(null);
  const addressInput = useRef(null);
  const [creatingIdentity, setCreatingIdentity] = useState(false);
  const [importingCredentials, setImportingCredentials] = useState(false);
  const [creatingCredentials, setCreatingCredentials] = useState(false);
  const [createdIdentity, setCreatedIdentity] = useState<CreatedManagedIdentity>(null);
  const [importedCredentials, setImportedCredentials] = useState<ImportedCredential[]>(null);

  // Register response to the import operation
  useEffect(() => {
    let unsub = null;
    // Called after page redirection
    import("@elastosfoundation/elastos-connectivity-sdk-js").then(({ didAccessV2 }) => {
      unsub = didAccessV2.onImportCredentialsResponse((context, importedCredentials) => {
        console.log("onImportCredentialsResponse", context, importedCredentials);
        setCreatingCredentials(false);
        setImportedCredentials(importedCredentials);
      });
    })

    return () => unsub;
  }, []);

  const onSubmitForm = async () => {
    console.log("Creating a managed identity");

    setCreatingIdentity(true);
    const identity = await createManagedIdentity();
    if (identity) {
      console.log("Managed identity creation ended", identity);
      setCreatingIdentity(false);
      setCreatedIdentity(identity)

      // Create credentials
      console.log("Creating and importing credentials");
      setCreatingCredentials(true);
      await importCredentials(identity.did);
    }
  }

  return (
    <div className="flex flex-col gap-4 items-start">
      <TextField
        className='w-full'
        label="Name"
        inputRef={nameInput}
        autoFocus
        defaultValue="Test user"
        variant="outlined"
        size="small"
        autoComplete="off" />

      <TextField
        className='w-full'
        label="Address"
        inputRef={addressInput}
        autoFocus
        defaultValue="15 Rover Street, London, England"
        variant="outlined"
        size="small"
        autoComplete="off" />

      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="I confirm I'm a UK resident and tax payer" />
      </FormGroup>

      <MainButton onClick={onSubmitForm} busy={creatingIdentity} disabled={!!createdIdentity}>Submit tax payer information</MainButton>

      {/* Identity status */}
      <div className="mt-4">
        {!createdIdentity && <div>No identity created yet</div>}
        {createdIdentity && <>
          <div><b>Created user identity</b>: {createdIdentity.did}</div>
          <div><b>Access token to transfer the identity</b>: {createdIdentity.accessToken}</div>
        </>}
      </div>

      {/* Credentials status */}
      <div className="mt-4">
        {!importedCredentials && <div>No credential imported yet</div>}
        {importedCredentials && <>
          <div>Produced and imported <b>{importCredentials.length}</b> into user&quot;s identity</div>
        </>}
      </div>
    </div>
  )
}