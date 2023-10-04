import { Activity } from "@model/activity/activity";
import { logger } from "@services/logger";
import { FC, ReactNode } from 'react';
import { Icon as ReactIcon } from "@iconify/react";
import { CredentialsImportedRenderer } from "./renderers/CredentialsImportedRenderer";
import { CredentialsSharedRenderer } from "./renderers/CredentialsSharedRenderer";
import { DetailTableRow } from "@components/generic/DetailTable";
import { Avatar, ListItemText, TableCell, styled } from "@mui/material";

function getActivityRenderer(activity: Activity) {
  const renderer = {icon: null as ReactNode, action_name: "", action_for: "" as string | ReactNode}
  switch (activity.type) {
    case ActivityType.NEW_ACCOUNT:
      renderer.icon = <ReactIcon icon="mdi:register" />
      renderer.action_name = "Account created"
      break;
    case ActivityType.USER_SIGN_IN:
      renderer.icon = <ReactIcon icon="ic:round-log-in" />
      renderer.action_name = "User sign-in"
      renderer.action_for = activity.browserNameStr
      break;
    case ActivityType.IDENTITY_CREATED:
      renderer.icon = <ReactIcon icon="material-symbols:credit-card" />
      renderer.action_name = "New identity has been created"
      renderer.action_for = activity.identityDidStr
      break;
    case ActivityType.IDENTITY_DELETED:
      renderer.icon = <ReactIcon icon="game-icons:burning-skull" />
      renderer.action_name = "Identity has been deleted"
      renderer.action_for = activity.identityDidStr
      break;
    case ActivityType.BIND_EMAIL:
      renderer.icon = <ReactIcon icon="entypo:email" />
      renderer.action_name = "Email address bound to account"
      renderer.action_for = activity.userEmailAddressStr
      break;
    case ActivityType.BIND_BROWSER:
      renderer.icon = <ReactIcon icon="fluent-mdl2:website" />
      renderer.action_name = "Browser bound to account"
      renderer.action_for = activity.browserNameStr
      break;
    case ActivityType.PASSWORD_CHANGED:
      renderer.icon = <ReactIcon icon="ic:round-password" />
      renderer.action_name = "Password has been changed"
      renderer.action_for = "**********"
      break;
    case ActivityType.CREDENTIALS_SHARED:
      renderer.icon = <ReactIcon icon="ic:round-share" />
      renderer.action_name = `${activity.credentialsCount} verified credential(s) shared`
      break;
    case ActivityType.CREDENTIALS_IMPORTED:
      renderer.icon = <ReactIcon icon="mdi:integrated-circuit-chip" />
      renderer.action_name = `${activity.credentialsCount} verified credential(s) imported`
      break;
    default:
      logger.error("dashboard", `Renderer not implemented for activity type ${activity.type.toString()}`);
      return renderer;
  }
  return renderer
}

export enum ActivityType {
  NEW_ACCOUNT = 'NEW_ACCOUNT',
  USER_SIGN_IN = 'USER_SIGN_IN',
  IDENTITY_CREATED = 'IDENTITY_CREATED',
  IDENTITY_DELETED = 'IDENTITY_DELETED',
  CREDENTIALS_IMPORTED = 'CREDENTIALS_IMPORTED',
  CREDENTIALS_SHARED = 'CREDENTIALS_SHARED',
  BIND_EMAIL = 'BIND_EMAIL',
  BIND_BROWSER = 'BIND_BROWSER',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
}

const IconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: "#3A3A3A",
  color: "#DDD",
  width: 36,
  height: 36,
  padding: 8,
}));

export const ActivityRow: FC<{
  activity: Activity;
}> = ({ activity }) => {
  const renderer = getActivityRenderer(activity);

  return (
    <DetailTableRow
      avatar={
        <IconAvatar>
          {renderer.icon}
        </IconAvatar>
      }
      rowCells={
        <>
          <TableCell>
            <ListItemText
              className="flex-1"
              primary={
                <span className="font-medium">{renderer.action_name}</span>
              }
              secondary={
                <span className="text-[12px]">{renderer.action_for}</span>
              }
            />
          </TableCell>
          <TableCell>{activity.createdAtStr}</TableCell>
        </>
      }
    />
  )
}
