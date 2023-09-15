import {ActivityType} from "@model/activity/activity-type";
import {UserEmailProvider} from "@model/user-email/user-email-provider";

export class CreateActivityInput {
  type: ActivityType;

  userEmailProvider?: UserEmailProvider;

  identityStr?: string;

  credentialsCount?: number;

  appDid?: string;

  browserName?: string;
}
