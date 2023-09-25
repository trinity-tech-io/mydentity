import type { DID, Issuer } from "@elastosfoundation/did-js-sdk";

const storeId = "client-side-store";
const passphrase = ""; // Mnemonic passphrase
const storePass = "unsafepass";

/**
 * Simulate the issuer identity (this demo app).
 * The issuer is the entity who generates and signs credentials, for others.
 */
async function loadIssuerIdentity() {
  const { Features, DefaultDIDAdapter, DIDBackend, DIDStore, RootIdentity, Mnemonic, Issuer, VerifiableCredential, DID } = await import("@elastosfoundation/did-js-sdk");

  // For this test, always re-create a new identity for the signer of the created credential.
  // In real life, the signer should remain the same.
  Features.enableJsonLdContext(true);
  DIDBackend.initialize(new DefaultDIDAdapter("mainnet"));
  let didStore = await DIDStore.open(storeId);
  let rootIdentity = await RootIdentity.createFromMnemonic(Mnemonic.getInstance().generate(), passphrase, didStore, storePass, true);
  console.log("Created issuer identity:", rootIdentity);

  let issuerDID = await rootIdentity.newDid(storePass, 0, true); // Index 0, overwrite
  console.log("Issuer DID:", issuerDID);

  let issuer = await Issuer.create(issuerDID);
  console.log("Issuer:", issuer);

  return issuer;
}

async function createNameCredential(issuer: Issuer, targetDID: DID) {
  const { VerifiableCredential } = await import("@elastosfoundation/did-js-sdk");

  let vcb = new VerifiableCredential.Builder(issuer, targetDID);
  let credential = await vcb.id("#name" + Math.random())
    .properties({
      name: "xxxx"
    }).types().seal(storePass);
  console.log("Generated credential:", credential);

  return credential;
}

export async function importCredentials(targetDidString: string): Promise<void> {
  console.log("Creating and importing a credential");

  const { DID } = await import("@elastosfoundation/did-js-sdk");
  const { didAccessV2 } = await import("@elastosfoundation/elastos-connectivity-sdk-js");

  const issuer = await loadIssuerIdentity(); // Credential creator/signer
  const targetDID = DID.from(targetDidString); // Receiving user
  console.log("Target DID:", targetDID);

  // Create the credentials
  const nameCredential = await createNameCredential(issuer, targetDID);

  // Send the credential to the identity wallet
  await didAccessV2.importCredentials([
    nameCredential
  ]);
}