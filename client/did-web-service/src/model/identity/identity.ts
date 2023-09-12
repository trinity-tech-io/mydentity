import { callWithUnlock } from "@components/security/unlock-key-prompt/UnlockKeyPrompt";
import { VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { IdentityProvider } from "@services/identity/did.provider";
import { CredentialsFeature } from "./features/credentials/credentials.feature";
import { HiveFeature } from "./features/hive/hive.feature";
import { IdentityFeature } from "./features/identity-feature";
import { ProfileFeature } from "./features/profile/profile.feature";
import { PublicationFeature } from "./features/publication/publication.feature";
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
    this.addFeature("profile", new ProfileFeature(this));
    this.addFeature("hive", new HiveFeature(this));
    this.addFeature("publication", new PublicationFeature(this));
  }

  public static async fromJson(json: IdentityDTO, provider: IdentityProvider): Promise<Identity> {
    const identity = new Identity();
    Object.assign(identity, json);

    identity.createdAt = new Date(json.createdAt);

    identity.provider = provider;
    return identity;
  }

  public get(feature: "credentials"): CredentialsFeature;
  public get(feature: "profile"): ProfileFeature;
  public get(feature: "hive"): HiveFeature;
  public get(feature: "publication"): PublicationFeature;
  public get(feature: "credentials" | "profile" | "hive" | "publication"): IdentityFeature {
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
   * Creates a VP that contains the given VCs, signed by the identity
   */
  public createVerifiablePresentation(credentials: VerifiableCredential[], realm: string, nonce: string): Promise<VerifiablePresentation> {
    return callWithUnlock(() => {
      return this.provider.createVerifiablePresentation(this.did, credentials, realm, nonce);
    }, true);
  }

  public equals(otherIdentity: Identity): boolean {
    return this.did === otherIdentity.did;
  }
}