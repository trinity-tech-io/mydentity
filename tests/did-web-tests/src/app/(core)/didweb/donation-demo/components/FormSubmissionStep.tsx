import { MainButton } from "@components/MainButton";
import type { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { Checkbox, FormControlLabel, FormGroup, Link, TextField } from "@mui/material";
import type { CreatedManagedIdentity } from "@trinitytech/did-web-service-sdk";
import { FC, useEffect, useRef, useState } from "react";
import { api_createManagedIdentity, api_generateClaimUrl, api_produceUserCredentials } from "../simulated-server-api/simulated-server-api";

export const FormSubmissionStep: FC<{
  onCreatedIdentity: (identity: CreatedManagedIdentity) => void;
  onImportedCredentials: () => void;
}> = ({ }) => {
  const nameInput = useRef(null);
  const addressInput = useRef(null);
  const [creatingIdentity, setCreatingIdentity] = useState(false);
  const [importingCredentials, setImportingCredentials] = useState(false);
  const [creatingCredentials, setCreatingCredentials] = useState(false);
  const [createdIdentityDID, setCreatedIdentityDID] = useState<string>(null);
  const [producedCredentials, setProducedCredentials] = useState<string[]>(null); // Credential id
  const [claimUrl, setClaimUrl] = useState<string>(null);

  const importCredentialsFromClientSide = async (credentials: VerifiableCredential[]): Promise<void> => {
    console.log("Importing user credentials to his identity wallet, client side");

    // Send the credential to the identity wallet (essentials, or DID Web service (claimed identities))
    const { didAccessV2 } = await import("@elastosfoundation/elastos-connectivity-sdk-js");
    await didAccessV2.importCredentials(credentials);
  }

  // Register response to the client side import operation
  useEffect(() => {
    let unsub = null;
    // Called after page redirection
    import("@elastosfoundation/elastos-connectivity-sdk-js").then(({ didAccessV2 }) => {
      unsub = didAccessV2.onImportCredentialsResponse((context, importedCredentials) => {
        console.log("onImportCredentialsResponse", context, importedCredentials);
        setCreatingCredentials(false);
        setProducedCredentials(importedCredentials.map(i => i.id.toString()));
      });
    })

    return () => unsub;
  }, []);

  const onSubmitForm = async () => {
    console.log("Creating a managed identity");

    setCreatingIdentity(true);
    const identityDID = await api_createManagedIdentity();
    if (identityDID) {
      console.log("Managed identity creation ended", identityDID);
      setCreatingIdentity(false);
      setCreatedIdentityDID(identityDID);

      // Without blocking, get the claim url
      api_generateClaimUrl(identityDID).then(claimRequest => {
        setClaimUrl(claimRequest.claimUrl);
      });

      // Create credentials
      console.log("Creating and importing credentials");
      setCreatingCredentials(true);
      const credentialProductionResult = await api_produceUserCredentials(identityDID, true);
      console.log("credentialProductionResult", credentialProductionResult)
      setCreatingCredentials(false);

      if (credentialProductionResult) {
        const { VerifiableCredential } = await import("@elastosfoundation/did-js-sdk");
        if (credentialProductionResult.imported) {
          // Credentials have already been imported on the server side as we used a managed identity.
          // Nothing else to do.
          const credentials = credentialProductionResult.credentials.map(vc => VerifiableCredential.parse(vc).getId().toString());
          setProducedCredentials(credentials);
        }
        else {
          // Credentials have not / could not be imported from the server side. We use the connectivity SDK
          // to request user's identity wallet to manually approve the credentials import.
          const credentials = credentialProductionResult.credentials.map(c => VerifiableCredential.parse(c));
          await importCredentialsFromClientSide(credentials);
        }
      }
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

      <MainButton onClick={onSubmitForm} busy={creatingIdentity} disabled={!!createdIdentityDID}>Submit tax payer information</MainButton>

      {/* Identity status */}
      <div className="mt-4">
        {!createdIdentityDID && <div>No identity created yet</div>}
        {createdIdentityDID && <>
          <div><b>Created user identity</b>: {createdIdentityDID}</div>
        </>}
        {claimUrl && <>
          <div><b>Claim your identity</b>: <Link href={claimUrl} target="_blank">Click to claim</Link></div>
        </>}
        {!producedCredentials && <div>No credential produced yet</div>}
        {producedCredentials && <>
          <div><b>Produced</b> {importCredentialsFromClientSide.length} credential</div>
        </>}
      </div>
    </div>
  )
}