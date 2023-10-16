import type { DID, Issuer, VerifiableCredential } from "@elastosfoundation/did-js-sdk";

const storeId = "server-side-store";
const passphrase = ""; // Mnemonic passphrase
const storePass = "store-password";

/**
 * Simulate the issuer identity (this demo app).
 * The issuer is the entity who generates and signs credentials, for others.
 *
 * TODO: USE APP DID CREATED ON THE DID WEB SERVICE, NOT A FAKE ISSUER
 *
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

async function createNameCredential(issuer: Issuer, targetDID: DID, name: string) {
  const { VerifiableCredential } = await import("@elastosfoundation/did-js-sdk");

  let vcb = new VerifiableCredential.Builder(issuer, targetDID);
  let credential = await vcb.id("#name" + Math.random())
    .properties({
      name
    }).types(
      "https://ns.elastos.org/credentials/profile/name/v1#NameCredential",
      "https://ns.elastos.org/credentials/displayable/v1#DisplayableCredential"
    ).seal(storePass);
  console.log("Generated credential:", credential);

  return credential;
}

/**
 * Produces a name and address credentials for the user, signed by this demo app's
 * DID
 */
export async function produceUserCredentials(userDidString: string, name: string): Promise<VerifiableCredential[]> {
  console.log("Producing user credentials");

  const { DID } = await import("@elastosfoundation/did-js-sdk");

  const issuer = await loadIssuerIdentity(); // Credential creator/signer
  const targetDID = DID.from(userDidString); // Receiving user
  console.log("Target DID:", targetDID);

  // Create the credentials
  const nameCredential = await createNameCredential(issuer, targetDID, name);
  // TODO: other VCs

  return [nameCredential];
}