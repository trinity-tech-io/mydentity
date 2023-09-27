import { IdentityDTO } from "@model/identity/identity.dto";
import { Identity } from "../identity/identity";
import { ApplicationsFeature } from "./features/applications/applications.feature";
import { ProfileFeature } from "./features/profile/profile.feature";
import { IdentityProvider } from "@services/identity/did.provider";

/**
 * Identity representing a user ("standard" identity).
 */
export class RegularIdentity extends Identity {
  constructor() {
    super();
    this.addFeature("profile", new ProfileFeature(this));
    this.addFeature("applications", new ApplicationsFeature(this));
  }

  public static async fromJson(json: IdentityDTO, provider: IdentityProvider): Promise<RegularIdentity> {
    const identity = new RegularIdentity();
    await identity.fillFromJson(json, provider);
    return identity;
  }

  public profile(): ProfileFeature {
    return <ProfileFeature>this.get("profile");
  }

  public applications(): ApplicationsFeature {
    return <ApplicationsFeature>this.get("applications");
  }
}