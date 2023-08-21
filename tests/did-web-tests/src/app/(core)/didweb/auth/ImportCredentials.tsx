import { MainButton } from "@components/MainButton";
import { DID, DIDBackend, DIDStore, DefaultDIDAdapter, Features, Issuer, Mnemonic, RootIdentity, VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { didAccessV2 } from "@elastosfoundation/elastos-connectivity-sdk-js";
import { ImportedCredential } from "@elastosfoundation/elastos-connectivity-sdk-js/typings/did";
import { FC, useEffect, useState } from "react";

console.log("didAccessV2", didAccessV2)

async function importCredentials() {
  console.log("Creating and importing a credential");
  let storeId = "client-side-store";
  let storePass = "unsafepass";
  let passphrase = ""; // Mnemonic passphrase

  // For this test, always re-create a new identity for the signer of the created credential.
  // In real life, the signer should remain the same.
  Features.enableJsonLdContext(true);
  DIDBackend.initialize(new DefaultDIDAdapter("mainnet"));
  let didStore = await DIDStore.open(storeId);
  let rootIdentity = RootIdentity.createFromMnemonic(Mnemonic.getInstance().generate(), passphrase, didStore, storePass, true);
  console.log("Created identity:", rootIdentity);

  let issuerDID = await rootIdentity.newDid(storePass, 0, true); // Index 0, overwrite
  console.log("Issuer DID:", issuerDID);

  let issuer = new Issuer(issuerDID);
  console.log("Issuer:", issuer);

  let targetDID = DID.from("did:elastos:insTmxdDDuS9wHHfeYD1h5C2onEHh3D8Vq");
  console.log("Target DID:", targetDID);

  // Create the credential
  let vcb = new VerifiableCredential.Builder(issuer, targetDID);
  let credential = await vcb.id("#testinstance1268")
    .properties({
      //prescription1: "Take 3 pills per day during one week.",
      stub: "test",
      displayable: {
        icon: "nowhere",
        title: "Medical certificate",
        description: "${prescription1}"
      }
    }).type("did://elastos/insTmxdDDuS9wHHfeYD1h5C2onEHh3D8Vq/CredTypeWithService#CredTypeWithService").seal(storePass);
  console.log("Generated credential:", credential);

  // Send the credential to the identity wallet
  let importedCredentials = await didAccessV2.importCredentials([credential]);

  // Result of this import, depending on user
  console.log("Imported credentials:", importedCredentials);

  return importedCredentials;
}

export const ImportCredentials: FC = () => {
  const [awaitingResult, setAwaitingResult] = useState(false);
  const [importedVCs, setImportedVCs] = useState<ImportedCredential[]>(null);

  useEffect(() => {
    let unsub = null;
    // Simulated late registration to event to make sure the SDK queued the responses
    setTimeout(() => {
      // Called after page redirection
      unsub = didAccessV2.onImportCredentialsResponse((context, importedCredentials) => {
        console.log("onImportCredentialsResponse", context, importedCredentials);
        setImportedVCs(importedCredentials);
      });
    }, 500);

    return () => unsub;
  }, []);

  const testImport = async () => {
    setAwaitingResult(true);
    await importCredentials();
  }

  return (
    <>
      <MainButton onClick={testImport} busy={awaitingResult}>Import credential</MainButton>
      {
        importedVCs &&
        <div className="flex flex-col">
          <div className="mb-6">Credentials that have been imported:</div>
          {
            importedVCs.map((vc, i) =>
              <div key={i} className="text-sm max-w-xl break-words">{vc.id.toString()}</div>
            )
          }
        </div>
      }
    </>
  )
}