import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { findProfileInfoByTypes } from "@services/identity-profile-info/identity-profile-info.service";
import { capitalizeFirstLetter } from "@utils/strings";
import { Credential } from "./credential";
import { CredentialDTO } from "./credential.dto";
import { ProfileCredential } from "./profile-credential";

export async function credentialFromJson(json: CredentialDTO): Promise<Credential> {
  let credential: Credential;

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
  credential.key = credential.verifiableCredential.getId().getFragment()
  credential.title = capitalizeFirstLetter(credential.key)

  return credential;
}