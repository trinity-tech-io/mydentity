/* eslint-disable max-classes-per-file */
import { DeviceFeature } from "./features/device/device.feature";
import { IdentityFeature } from "./features/identity/identity.feature";
import { ProfileFeature } from "./features/profile/profile.feature";
import { SecurityFeature } from "./features/security/security.feature";
import { UserFeature } from "./features/user-feature";
import { usersCache } from "./user.cache";
import { UserDTO } from "./user.dto";

export type FeatureExtensionRegistrationCb = (user: User) => UserFeature;

export class User {
  id: string;
  createdAt: Date;

  // Features
  private features = new Map<string, UserFeature>();

  constructor() {
    this.addFeature("profile", new ProfileFeature(this));
    this.addFeature("identity", new IdentityFeature(this));
    this.addFeature("device", new DeviceFeature(this));
    this.addFeature("security", new SecurityFeature(this));
  }

  public static async fromJson(json: UserDTO, useCache = true): Promise<User> {
    return usersCache.get(json.id, {
      async create() {
        return new User();
      },
      async fill(user: User) {
        user.fillFromJson(json);
        user.createdAt = new Date(json.createdAt);
        // void user.get("profile").fetchProfile();
      },
    }, useCache);
  }

  public async fetchProfiles() {
    void this.get("profile").fetchProfile();
    return this;
  }

  public toJson(): UserDTO {
    return {
      id: this.id,
      createdAt: this.createdAt.toISOString()
    }
  }

  public get(feature: "profile"): ProfileFeature;
  public get(feature: "identity"): IdentityFeature;
  public get(feature: "device"): DeviceFeature;
  public get(feature: "security"): SecurityFeature;
  public get(feature: "profile" | "identity" | "device" | "security"): UserFeature {
    if (!this.features.has(feature)) {
      throw new Error(`Unhandled user feature '${feature}'`);
    }
    return this.features.get(feature);
  }

  private addFeature(name: string, feature: UserFeature): UserFeature {
    if (this.features.has(name))
      return;

    this.features.set(name, feature);

    return feature;
  }

  protected fillFromJson(json: UserDTO) {
    Object.assign(this, json);
  }

  public equals(anotherUser: User): boolean {
    if (!anotherUser)
      return false;

    return this.id === anotherUser.id;
  }
}
