import { Identity } from "@model/identity/identity";
import { IdentityProvider } from "@services/identity/did.provider";
import { RootIdentityDTO } from "./root-identity.dto";

export class RootIdentity extends Identity {
  id: string;
  didStoreRootIdentityId: string;
  Identity: Identity[];

  public static async fromJson(json: RootIdentityDTO, provider: IdentityProvider=null): Promise<RootIdentity> {
    const rootIdentity = new RootIdentity();
    Object.assign(rootIdentity, json);

    rootIdentity.createdAt = new Date(json.createdAt);

    const { identityFromJson } = await import("@model/identity/identity-builder");
    rootIdentity.Identity = await Promise.all(json.Identity.map(identity => identityFromJson(identity, provider)));

    rootIdentity.provider = provider;
    return rootIdentity;
  }
}