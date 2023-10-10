import { gql } from "@apollo/client";
import { callWithUnlock } from "@components/security/unlock-key-prompt/call-with-unlock";
import type { VerifiableCredential, VerifiablePresentation } from "@elastosfoundation/did-js-sdk";
import { Document } from "@model/document/document";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { IdentityProvider } from "@services/identity/did.provider";
import moment from "moment";
import { BehaviorSubject } from "rxjs";
import { CredentialsFeature } from "./features/credentials/credentials.feature";
import { DIDFeature } from "./features/did/did.feature";
import { DocumentFeature } from "./features/document/credentials.feature";
import { HiveFeature } from "./features/hive/hive.feature";
import { IdentityFeature } from "./features/identity-feature";
import { PublicationFeature } from "./features/publication/publication.feature";
import { StorageFeature } from "./features/storage/storage.feature";
import { IdentityType } from "./identity-type";
import { IdentityDTO } from "./identity.dto";

export abstract class Identity {
  did: string;
  createdAt: Date;
  lastUsedAt$ = new BehaviorSubject<Date>(null);
  type: IdentityType;
  identityRootId: string;

  // Local bindings
  public provider: IdentityProvider;

  // Features
  private features = new Map<string, IdentityFeature>();

  constructor() {
    this.addFeature("credentials", new CredentialsFeature(this));
    this.addFeature("document", new DocumentFeature(this));
    this.addFeature("DID", new DIDFeature(this));
    this.addFeature("hive", new HiveFeature(this));
    this.addFeature("storage", new StorageFeature(this));
    this.addFeature("publication", new PublicationFeature(this));
  }

  public async fillFromJson(json: IdentityDTO, provider: IdentityProvider): Promise<Identity> {
    Object.assign(this, json);

    this.createdAt = new Date(json.createdAt);
    this.lastUsedAt$.next(new Date(json.lastUsedAt));

    this.provider = provider;
    return this;
  }

  public credentials(): CredentialsFeature {
    return <CredentialsFeature>this.features.get("credentials");
  }

  public document(): DocumentFeature {
    return <DocumentFeature>this.features.get("document");
  }

  public DID(): DIDFeature {
    return <DIDFeature>this.features.get("DID");
  }

  public hive(): HiveFeature {
    return <HiveFeature>this.features.get("hive");
  }

  public storage(): StorageFeature {
    return <StorageFeature>this.features.get("storage");
  }

  public publication(): PublicationFeature {
    return <PublicationFeature>this.features.get("publication");
  }

  public get(feature: string): IdentityFeature {
    if (!this.features.has(feature)) {
      throw new Error(`Unhandled user feature '${feature}'`);
    }
    return this.features.get(feature);
  }

  protected addFeature(name: string, feature: IdentityFeature): IdentityFeature {
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
      return this.provider.presentation.createVerifiablePresentation(this.did, credentials, realm, nonce);
    }, true);
  }

  public equals(otherIdentity: Identity): boolean {
    return this.did === otherIdentity.did;
  }

  /**
   * Saves the fact that we just used this identity. Used to display the most
   * recently used activities on the user dashboard.
   */
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

  /**
   * Gets the latest DID document from chain
   *
   * TODO: probably move to a "document" feature and implement
   */
  public synchronizeDIDDocument(): Promise<Document> {
    return null;
    /* return new Promise((resolve, reject) => {
        // Get the latest DID document from chain, if any.
        Logger.log("developertools", "Synchronizing the DID store");
        this.didStore.synchronize(this.storePassword, () => {
            // Now that we are synced, load the existing DID document (could be empty)
            Logger.log("developertools", "Loading local DID document");
            this.didStore.loadDidDocument(this.didString, didDocument => {
                this.didDocument = didDocument;
                resolve(didDocument);
            }, err => {
                reject(err);
            });
        }, err => {
            reject(err);
        });
    }); */
  }

}