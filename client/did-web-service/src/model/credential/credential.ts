import { VerifiableCredential } from "@elastosfoundation/did-js-sdk";

export class Credential {
  public id: string;
  createdAt: Date;
  verifiableCredential: VerifiableCredential;
  title: string; // key: capitalizeFirstLetter
  key: string; // key

  public equals(otherCredential: Credential): boolean {
    return this.id === otherCredential.id;
  }
}