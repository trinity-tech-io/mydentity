import { CredentialsFeature } from "./features/credentials/credentials.feature";
import { IdentityFeature } from "./features/identity-feature";
import { IdentityDTO } from "./identity.dto";

export class Identity {
  did: string;
  createdAt: Date;

  // Features
  private features = new Map<string, IdentityFeature>();

  constructor() {
    this.addFeature("credentials", new CredentialsFeature(this));
  }

  public static async fromJson(json: IdentityDTO): Promise<Identity> {
    const identity = new Identity();
    Object.assign(identity, json);

    identity.createdAt = new Date(json.createdAt);

    return identity;
  }

  public get(feature: "credentials"): CredentialsFeature;
  public get(feature: "credentials"): IdentityFeature {
    if (!this.features.has(feature)) {
      throw new Error(`Unhandled user feature '${feature}'`);
    }
    return this.features.get(feature);
  }

  private addFeature(name: string, feature: IdentityFeature): IdentityFeature {
    if (this.features.has(name))
      return;

    this.features.set(name, feature);

    return feature;
  }

  public equals(otherIdentity: Identity): boolean {
    return this.did === otherIdentity.did;
  }
}