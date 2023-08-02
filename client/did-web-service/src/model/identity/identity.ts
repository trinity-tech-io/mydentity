import { IdentityDTO } from "./identity.dto";

export class Identity {
  did: string;
  createdAt: Date;

  public static async fromJson(json: IdentityDTO): Promise<Identity> {
    const identity = new Identity();
    Object.assign(identity, json);

    identity.createdAt = new Date(json.createdAt);

    return identity;
  }

  public equals(otherIdentity: Identity): boolean {
    return this.did === otherIdentity.did;
  }
}