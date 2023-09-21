import { Activity } from "@model/activity/activity";
import { logger } from "@services/logger";
import { FC } from 'react';
import { BindBrowserRenderer } from "./renderers/BindBrowserRenderer";
import { BindEmailRenderer } from "./renderers/BindEmailRenderer";
import { CredentialsImportedRenderer } from "./renderers/CredentialsImportedRenderer";
import { CredentialsSharedRenderer } from "./renderers/CredentialsSharedRenderer";
import { IdentityCreatedRenderer } from "./renderers/IdentityCreatedRenderer";
import { IdentityDeletedRenderer } from "./renderers/IdentityDeletedRenderer";
import { PasswordChangedRenderer } from "./renderers/PasswordChangedRenderer";
import { SignInRenderer } from "./renderers/SignInRenderer";

function getActivityRenderer(activity: Activity): JSX.Element {
  switch (activity.type) {
    case ActivityType.USER_SIGN_IN: return <SignInRenderer activity={activity} />
    case ActivityType.IDENTITY_CREATED: return <IdentityCreatedRenderer activity={activity} />
    case ActivityType.IDENTITY_DELETED: return <IdentityDeletedRenderer activity={activity} />
    case ActivityType.BIND_EMAIL: return <BindEmailRenderer activity={activity} />
    case ActivityType.BIND_BROWSER: return <BindBrowserRenderer activity={activity} />
    case ActivityType.PASSWORD_CHANGED: return <PasswordChangedRenderer activity={activity} />
    case ActivityType.CREDENTIALS_SHARED: return <CredentialsSharedRenderer activity={activity} />
    case ActivityType.CREDENTIALS_IMPORTED: return <CredentialsImportedRenderer activity={activity} />
    default:
      logger.error("dashboard", `Renderer not implemented for activity type ${activity.type.toString()}`);
      return null;
  }
}

export enum ActivityType {
  USER_SIGN_IN = 'USER_SIGN_IN',
  IDENTITY_CREATED = 'IDENTITY_CREATED',
  IDENTITY_DELETED = 'IDENTITY_DELETED',
  CREDENTIALS_IMPORTED = 'CREDENTIALS_IMPORTED',
  CREDENTIALS_SHARED = 'CREDENTIALS_SHARED',
  BIND_EMAIL = 'BIND_EMAIL',
  BIND_BROWSER = 'BIND_BROWSER',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
}

export const RecentActivityRow: FC<{
  activity: Activity;
}> = ({ activity }) => {
  const renderer = getActivityRenderer(activity);

  return (
    <tr key={activity.id}>
      <td className="p-2 whitespace-nowrap flex flex-row gap-2 items-center">
        <div>{renderer}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{activity.createdAtStr}</div>
      </td>
    </tr>
  )
}
