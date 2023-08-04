import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";
import { CredentialDTO } from "./credential.dto";

export class Credential {
  id: string;
  createdAt: Date;
  verifiableCredential: VerifiableCredential;

  public static async fromJson(json: CredentialDTO): Promise<Credential> {
    const credential = new Credential();
    Object.assign(credential, json);

    credential.createdAt = new Date(json.createdAt);
    credential.verifiableCredential = VerifiableCredential.parse(json.verifiableCredential);

    return credential;
  }

  public equals(otherCredential: Credential): boolean {
    return this.id === otherCredential.id;
  }
}