import {ActivityType} from "@model/activity/activity-type";
import {UserEmailProvider} from "@model/user-email/user-email-provider";

export class CreateActivityInput {
  type: ActivityType;

  userEmailId?: string;

  userEmailProvider?: UserEmailProvider;

  userEmailAddress?: string;

  identityId?: string;

  identityDid?: string;

  credentialsCount?: number;

  appDid?: string;

  browserId?: string;

  browserName?: string;
}
