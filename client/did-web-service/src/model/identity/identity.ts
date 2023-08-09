import { VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { Credential } from "@model/credential/credential";
import { IdentityProvider } from "@services/identity/did.provider";
import { CredentialsFeature } from "./features/credentials/credentials.feature";
import { IdentityFeature } from "./features/identity-feature";
import { IdentityDTO } from "./identity.dto";

export class Identity {
  did: string;
  createdAt: Date;

  // Local bindings
  public provider: IdentityProvider;

  // Features
  private features = new Map<string, IdentityFeature>();

  constructor() {
    this.addFeature("credentials", new CredentialsFeature(this));
  }

  public static async fromJson(json: IdentityDTO, provider: IdentityProvider): Promise<Identity> {
    const identity = new Identity();
    Object.assign(identity, json);

    identity.createdAt = new Date(json.createdAt);

    identity.provider = provider;

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

  /**
   * Returns the list of identities (DIDs) for the signed in user
   */
  public listCredentials(): Promise<Credential[]> {
    return this.provider.listCredentials(this.did);
  }

  /**
   * Creates a VP that contains the given VCs, signed by the identity
   */
  public createVerifiablePresentation(credentials: VerifiableCredential[], realm: string, nonce: string): Promise<VerifiablePresentation> {
    return this.provider.createVerifiablePresentation(this.did, credentials, realm, nonce);
  }

  public equals(otherIdentity: Identity): boolean {
    return this.did === otherIdentity.did;
  }
}