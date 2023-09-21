import { MainButton } from "@components/MainButton";
import type { ImportedCredential } from "@elastosfoundation/elastos-connectivity-sdk-js/typings/did";
import { FC, useEffect, useState } from "react";

async function importCredentials(withDisplayableCredential: boolean) {
  console.log("Creating and importing a credential");

  let storeId = "client-side-store";
  let storePass = "unsafepass";
  let passphrase = ""; // Mnemonic passphrase

  const { Features, DefaultDIDAdapter, DIDBackend, DIDStore, RootIdentity, Mnemonic, Issuer, VerifiableCredential, DID } = await import("@elastosfoundation/did-js-sdk");
  const { didAccessV2 } = await import("@elastosfoundation/elastos-connectivity-sdk-js");

  // For this test, always re-create a new identity for the signer of the created credential.
  // In real life, the signer should remain the same.
  Features.enableJsonLdContext(true);
  DIDBackend.initialize(new DefaultDIDAdapter("mainnet"));
  let didStore = await DIDStore.open(storeId);
  let rootIdentity = await RootIdentity.createFromMnemonic(Mnemonic.getInstance().generate(), passphrase, didStore, storePass, true);
  console.log("Created identity:", rootIdentity);

  let issuerDID = await rootIdentity.newDid(storePass, 0, true); // Index 0, overwrite
  console.log("Issuer DID:", issuerDID);

  let issuer = await Issuer.create(issuerDID);
  console.log("Issuer:", issuer);

  let targetDID = DID.from("did:elastos:insTmxdDDuS9wHHfeYD1h5C2onEHh3D8Vq");
  console.log("Target DID:", targetDID);

  const credentialTypes = [
    withDisplayableCredential && "https://ns.elastos.org/credentials/displayable/v1#DisplayableCredential"
  ].filter(t => !!t);

  // Create the credential
  let vcb = new VerifiableCredential.Builder(issuer, targetDID);
  let credential = await vcb.id("#testinstance" + Math.random())
    .properties({
      //prescription1: "Take 3 pills per day during one week.",
      prescription1: "Drink more",
      prescription2: "Eat less",
      subField: {
        firstSubValue: "Yes",
        secondSubValue: "Tomorrow"
      },
      ...(withDisplayableCredential && {
        displayable: {
          icon: "nowhere",
          title: "Medical certificate",
          description: "${prescription1}, ${prescription2}"
        }
      })
    }).types(...credentialTypes).seal(storePass);
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
    setTimeout(async () => {
      // Called after page redirection
      const { didAccessV2 } = await import("@elastosfoundation/elastos-connectivity-sdk-js");

      unsub = didAccessV2.onImportCredentialsResponse((context, importedCredentials) => {
        console.log("onImportCredentialsResponse", context, importedCredentials);
        setImportedVCs(importedCredentials);
      });
    }, 500);

    return () => unsub;
  }, []);

  const testImport = async (withDisplayableCredential: boolean) => {
    setAwaitingResult(true);
    await importCredentials(withDisplayableCredential);
  }

  return (
    <>
      <MainButton onClick={() => testImport(true)} busy={awaitingResult}>Import displayable credential</MainButton>
      <MainButton onClick={() => testImport(false)} busy={awaitingResult}>Import non displayable credential</MainButton>
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