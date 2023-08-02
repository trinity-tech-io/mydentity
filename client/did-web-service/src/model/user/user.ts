/* eslint-disable max-classes-per-file */
import { IdentityFeature } from "./features/identity/identity.feature";
import { ProfileFeature } from "./features/profile/profile.feature";
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
  }

  public static async fromJson(json: UserDTO, useCache = true): Promise<User> {
    const UserClass = this;
    return usersCache.get(json.id, {
      async create() {
        return new User();
      },
      async fill(user: User) {
        user.fillFromJson(json);
        user.createdAt = new Date(json.createdAt);
      },
    }, useCache);
  }

  public toJson(): UserDTO {
    return {
      id: this.id,
      createdAt: this.createdAt.toISOString()
    }
  }

  public get(feature: "profile"): ProfileFeature;
  public get(feature: "identity"): IdentityFeature;
  public get(feature: "profile" | "identity" | string): UserFeature {
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
