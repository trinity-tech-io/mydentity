/* eslint-disable max-classes-per-file */
import { DeviceFeature } from "./features/device/device.feature";
import { IdentityFeature } from "./features/identity/identity.feature";
import { SecurityFeature } from "./features/security/security.feature";
import { UserFeature } from "./features/user-feature";
import { usersCache } from "./user.cache";
import { UserDTO } from "./user.dto";
import {UserEmailFeature} from "@model/user/features/email/email.feature";
import {logger} from "@services/logger";
import {withCaughtAppException} from "@services/error.service";
import {getApolloClient} from "@services/graphql.service";
import {gql} from "@apollo/client";
import {authUser$} from "@services/user/user.events";

export type FeatureExtensionRegistrationCb = (user: User) => UserFeature;

export class User {
  id: string;
  type: string;
  name?: string;
  createdAt: Date;

  // Features
  private features = new Map<string, UserFeature>();

  constructor() {
    this.addFeature("email", new UserEmailFeature(this));
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
      },
    }, useCache);
  }

  public toJson(): UserDTO {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      createdAt: this.createdAt.toISOString()
    }
  }

  public get(feature: "email"): UserEmailFeature;
  public get(feature: "identity"): IdentityFeature;
  public get(feature: "device"): DeviceFeature;
  public get(feature: "security"): SecurityFeature;
  public get(feature: "email" | "identity" | "device" | "security"): UserFeature {
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

  public async updateUserName(name: string): Promise<Boolean> {
    logger.log("user", "update user name.");

    const { data } = await withCaughtAppException(() => {
      return getApolloClient().mutate<{
        updateUserProperty: boolean
      }>({
        mutation: gql` 
        mutation UpdateUserProperty($input: UserPropertyInput!) {
          updateUserProperty(input: $input)
        } `,
        variables: { input: {name} }
      });
    });

    this.name = name;
    authUser$().next(this);
    console.info('user', 'update user name successfully.');
    return data?.updateUserProperty;
  }
}
