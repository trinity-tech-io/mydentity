import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { CredentialDTO } from "./credential.dto";
import { capitalizeFirstLetter } from "@utils/strings";

export class Credential {
  id: string;
  createdAt: Date;
  verifiableCredential: VerifiableCredential;
  tittle: string; // key: capitalizeFirstLetter
  key: string; // key

  public static async fromJson(json: CredentialDTO): Promise<Credential> {
    const credential = new Credential();
    Object.assign(credential, json);

    credential.createdAt = new Date(json.createdAt);
    credential.verifiableCredential = VerifiableCredential.parse(json.verifiableCredential);
    credential.key = credential.verifiableCredential.getId().getFragment()
    credential.tittle = capitalizeFirstLetter(credential.key)
    return credential;
  }

  public equals(otherCredential: Credential): boolean {
    return this.id === otherCredential.id;
  }
}