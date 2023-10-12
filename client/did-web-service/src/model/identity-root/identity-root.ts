import { Identity } from "@model/identity/identity";
import { IdentityProvider } from "@services/identity/did.provider";
import { IdentityRootDTO } from "./identity-root.dto";

export class IdentityRoot {
  id: string;
  didStoreRootIdentityId: string;
  createdAt: Date;
  Identity: Identity[];
  // Local bindings
  public provider: IdentityProvider;

  public static async fromJson(json: IdentityRootDTO, provider: IdentityProvider = null): Promise<IdentityRoot> {
    const identityRoot = new IdentityRoot();
    Object.assign(identityRoot, json);

    identityRoot.createdAt = new Date(json.createdAt);

    const { identityFromJson } = await import("@model/identity/identity-builder");
    identityRoot.Identity = await Promise.all(json.Identity.map(identity => identityFromJson(identity, provider)));

    identityRoot.provider = provider;
    return identityRoot;
  }
}