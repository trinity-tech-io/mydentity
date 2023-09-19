import { gql } from "@apollo/client";
import { callWithUnlock } from "@components/security/unlock-key-prompt/UnlockKeyPrompt";
import type { VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { IdentityProvider } from "@services/identity/did.provider";
import moment from "moment";
import { BehaviorSubject } from "rxjs";
import { ApplicationsFeature } from "./features/applications/applications.feature";
import { CredentialsFeature } from "./features/credentials/credentials.feature";
import { DIDFeature } from "./features/did/did.feature";
import { HiveFeature } from "./features/hive/hive.feature";
import { IdentityFeature } from "./features/identity-feature";
import { ProfileFeature } from "./features/profile/profile.feature";
import { PublicationFeature } from "./features/publication/publication.feature";
import { StorageFeature } from "./features/storage/storage.feature";
import { IdentityDTO } from "./identity.dto";

export class Identity {
  did: string;
  createdAt: Date;
  lastUsedAt$ = new BehaviorSubject<Date>(null);

  // Local bindings
  public provider: IdentityProvider;

  // Features
  private features = new Map<string, IdentityFeature>();

  constructor() {
    this.addFeature("credentials", new CredentialsFeature(this));
    this.addFeature("profile", new ProfileFeature(this));
    this.addFeature("did", new DIDFeature(this));
    this.addFeature("hive", new HiveFeature(this));
    this.addFeature("storage", new StorageFeature(this));
    this.addFeature("publication", new PublicationFeature(this));
    this.addFeature("applications", new ApplicationsFeature(this));
  }

  public static async fromJson(json: IdentityDTO, provider: IdentityProvider): Promise<Identity> {
    const identity = new Identity();
    Object.assign(identity, json);

    identity.createdAt = new Date(json.createdAt);
    identity.lastUsedAt$.next(new Date(json.lastUsedAt));

    identity.provider = provider;
    return identity;
  }

  public get(feature: "credentials"): CredentialsFeature;
  public get(feature: "profile"): ProfileFeature;
  public get(feature: "did"): DIDFeature;
  public get(feature: "hive"): HiveFeature;
  public get(feature: "storage"): StorageFeature;
  public get(feature: "publication"): PublicationFeature;
  public get(feature: "applications"): ApplicationsFeature;
  public get(feature: "credentials" | "profile" | "did" | "hive" | "storage" | "publication" | "applications"): IdentityFeature {
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

  async markIdentityInUse(identityDid: string): Promise<boolean> {
    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ markIdentityInUse: boolean }>({
        mutation: gql`
        mutation markIdentityInUse($identityDid: String!) {
          markIdentityInUse(identityDid: $identityDid)
        }
      `,
        variables: {
          identityDid
        }
      });
    });

    this.lastUsedAt$.next(moment().toDate());

    return result?.data?.markIdentityInUse;
  }
}