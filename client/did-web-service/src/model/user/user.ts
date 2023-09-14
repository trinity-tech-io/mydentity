/* eslint-disable max-classes-per-file */
import { gql } from "@apollo/client";
import { ActivityFeature } from "@model/user/features/activity/activity.feature";
import { UserEmailFeature } from "@model/user/features/email/user-email.feature";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { initialsString } from "@utils/strings";
import { BehaviorSubject } from "rxjs";
import { BrowserFeature } from "./features/browser/browser.feature";
import { IdentityFeature } from "./features/identity/identity.feature";
import { SecurityFeature } from "./features/security/security.feature";
import { UserFeature } from "./features/user-feature";
import { usersCache } from "./user.cache";
import { UserDTO } from "./user.dto";

export type FeatureExtensionRegistrationCb = (user: User) => UserFeature;

export class User {
  id: string;
  type: string;
  name$?= new BehaviorSubject<string>(null);
  nameInitials$?= new BehaviorSubject<string>(null);
  createdAt: Date;

  // Features
  private features = new Map<string, UserFeature>();

  constructor() {
    this.addFeature("email", new UserEmailFeature(this));
    this.addFeature("identity", new IdentityFeature(this));
    this.addFeature("browser", new BrowserFeature(this));
    this.addFeature("security", new SecurityFeature(this));
    this.addFeature("activity", new ActivityFeature(this));
  }

  public static async fromJson(json: UserDTO, useCache = true): Promise<User> {
    return usersCache.get(json.id, {
      async create() {
        return new User();
      },
      async fill(user: User) {
        user.fillFromJson(json);
        user.createdAt = new Date(json.createdAt);
        user.nameInitials$.next(initialsString(json.name));
        user.name$.next(json.name);
      },
    }, useCache);
  }

  public toJson(): UserDTO {
    return {
      id: this.id,
      type: this.type,
      name: this.name$.value,
      nameInitials: initialsString(this.name$.value),
      createdAt: this.createdAt.toISOString()
    }
  }

  public get(feature: "email"): UserEmailFeature;
  public get(feature: "identity"): IdentityFeature;
  public get(feature: "browser"): BrowserFeature;
  public get(feature: "security"): SecurityFeature;
  public get(feature: "activity"): ActivityFeature;
  public get(feature: "email" | "identity" | "browser" | "security" | "activity"): UserFeature {
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

  protected fillFromJson(json: UserDTO): void {
    Object.assign(this, json);
  }

  public equals(anotherUser: User): boolean {
    if (!anotherUser)
      return false;

    return this.id === anotherUser.id;
  }

  public async updateUserName(name: string): Promise<boolean> {
    logger.log("user", "Updating user name.");

    const result = await withCaughtAppException(async () => {
      return (await getApolloClient()).mutate<{ updateUserProperty: boolean }>({
        mutation: gql`
          mutation UpdateUserProperty($input: UserPropertyInput!) {
            updateUserProperty(input: $input)
          }
        `,
        variables: { input: { name } }
      });
    });

    const updated = result?.data?.updateUserProperty;
    if (updated) {
      this.name$.next(name);
      logger.log('user', 'User name updated successfully.');
    }

    return updated;
  }
}
