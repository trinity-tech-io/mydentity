import type { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { findProfileInfoByTypes } from "@services/identity-profile-info/identity-profile-info.service";
import { lazyElastosDIDSDKImport } from "@utils/import-helper";
import { Credential } from "./credential";
import { CredentialDTO } from "./credential.dto";
import { ProfileCredential } from "./profile-credential";

/**
 * Creates a client side credential object from a backend Credential database entry.
 */
export async function credentialFromJson(json: CredentialDTO): Promise<Credential> {
  let credential: Credential;

  const { VerifiableCredential } = await lazyElastosDIDSDKImport();
  const vc = VerifiableCredential.parse(json.verifiableCredential);

  // Check if the VC can be considered as a profile credential. If so, we instanciate a
  // ProfileCredential object instead of a generic Credential.
  const profileInfoEntry = findProfileInfoByTypes(vc.type);
  if (profileInfoEntry)
    credential = new ProfileCredential(profileInfoEntry);
  else
    credential = new Credential();

  Object.assign(credential, json);

  credential.createdAt = new Date(json.createdAt);
  credential.verifiableCredential = vc;

  credential.prepareForDisplay();

  return credential;
}

/**
 * Creates a client side credential object from Verifiable Credential. This is usually done
 * to better display VCs that have not been saved into the backend yet, such as during imports.
 */
export async function credentialFromVerifiableCredential(vc: VerifiableCredential): Promise<Credential> {
  let credential: Credential;

  // Check if the VC can be considered as a profile credential. If so, we instanciate a
  // ProfileCredential object instead of a generic Credential.
  const profileInfoEntry = findProfileInfoByTypes(vc.type);
  if (profileInfoEntry)
    credential = new ProfileCredential(profileInfoEntry);
  else
    credential = new Credential();

  credential.verifiableCredential = vc;

  credential.prepareForDisplay();

  return credential;
}