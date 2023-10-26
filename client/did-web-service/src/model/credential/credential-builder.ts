import type { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { findProfileInfoByTypes } from "@services/identity-profile-info/identity-profile-info.service";
import { lazyElastosDIDSDKImport } from "@utils/import-helper";
import { AppInfoCredential } from "./app-info-credential";
import { Credential } from "./credential";
import { CredentialDTO } from "./credential.dto";
import { DefaultCredential } from "./default-credential";
import { ProfileAvatarCredential } from "./profile-avatar-credential";
import { ProfileCredential } from "./profile-credential";

function newCredentialFromVC(vc: VerifiableCredential): Credential {
  let credential: Credential;

  // Check if the VC can be considered as a profile credential. If so, we instanciate a
  // ProfileCredential object instead of a generic Credential.
  const profileInfoEntry = findProfileInfoByTypes(vc.type);
  if (profileInfoEntry) {
    if (profileInfoEntry.key === "avatar") {
      credential = new ProfileAvatarCredential(profileInfoEntry);
    }
    else {
      // Generic profile credential
      credential = new ProfileCredential(profileInfoEntry);
    }
  }
  else {
    if (vc.getType().includes("ApplicationCredential")) {
      credential = new AppInfoCredential();
    }
    else {
      // Not a special credential for us, just use a regular credential
      credential = new DefaultCredential();
    }
  }

  return credential;
}

/**
 * Creates a client side credential object from a backend Credential database entry.
 */
export async function credentialFromJson(json: CredentialDTO): Promise<Credential> {
  const { VerifiableCredential } = await lazyElastosDIDSDKImport();
  const vc = VerifiableCredential.parse(json.verifiableCredential);

  const credential = newCredentialFromVC(vc);

  Object.assign(credential, json);
  credential.createdAt = new Date(json.createdAt);
  credential.verifiableCredential = vc;

  credential.prepareForDisplay();
  console.log("TODO: REMOVE: credential-builder: >>>>>>>>>>>>>>>>>> credentialFromJson")

  return credential;
}

/**
 * Creates a client side credential object from Verifiable Credential. This is usually done
 * to better display VCs that have not been saved into the backend yet, such as during imports.
 */
export async function credentialFromVerifiableCredential(vc: VerifiableCredential): Promise<Credential> {
  const credential = newCredentialFromVC(vc);
  credential.verifiableCredential = vc;

  credential.prepareForDisplay();
  console.log("TODO: REMOVE: credential-builder: >>>>>>>>>>>>>>>>>> credentialFromVerifiableCredential;")

  return credential;
}