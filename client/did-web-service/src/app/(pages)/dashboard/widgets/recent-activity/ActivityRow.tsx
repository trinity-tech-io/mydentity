import { DetailTableRow } from "@components/generic/DetailTable";
import { Icon as ReactIcon } from "@iconify/react";
import { Activity } from "@model/activity/activity";
import { ActivityType } from "@model/activity/activity-type";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItemText, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { logger } from "@services/logger";
import { getDateDistance } from "@utils/date";
import { FC, ReactNode } from "react";

function getActivityRenderer(activity: Activity) {
  const renderer = {
    icon: null as ReactNode,
    action_name: "",
    action_for: "" as string | ReactNode,
  };
  switch (activity.type) {
    case ActivityType.NEW_ACCOUNT:
      renderer.icon = <ReactIcon icon="mdi:register" />;
      renderer.action_name = "Account created";
      break;
    case ActivityType.USER_SIGN_IN:
      renderer.icon = <ReactIcon icon="ic:round-log-in" />;
      renderer.action_name = "User sign-in";
      renderer.action_for = activity.browserNameStr;
      break;
    case ActivityType.IDENTITY_CREATED:
      renderer.icon = <ReactIcon icon="material-symbols:credit-card" />;
      renderer.action_name = "New identity has been created";
      renderer.action_for = activity.identityDidStr;
      break;
    case ActivityType.IDENTITY_DELETED:
      renderer.icon = <ReactIcon icon="game-icons:burning-skull" />;
      renderer.action_name = "Identity has been deleted";
      renderer.action_for = activity.identityDidStr;
      break;
    case ActivityType.BIND_EMAIL:
      renderer.icon = <ReactIcon icon="entypo:email" />;
      renderer.action_name = "Email address bound to account";
      renderer.action_for = activity.userEmailAddressStr;
      break;
    case ActivityType.BIND_BROWSER:
      renderer.icon = <ReactIcon icon="fluent-mdl2:website" />;
      renderer.action_name = "Browser bound to account";
      renderer.action_for = activity.browserNameStr;
      break;
    case ActivityType.PASSWORD_CHANGED:
      renderer.icon = <ReactIcon icon="ic:round-password" />;
      renderer.action_name = "Password has been changed";
      renderer.action_for = "**********";
      break;
    case ActivityType.CREDENTIALS_SHARED:
      renderer.icon = <ReactIcon icon="ic:round-share" />;
      renderer.action_name = (activity.credentialsCount && activity.credentialsCount > 0) ? `${activity.credentialsCount} credential(s) shared with an app` : 'Identity ID shared with an app';
      break;
    case ActivityType.CREDENTIALS_IMPORTED:
      renderer.icon = <ReactIcon icon="mdi:integrated-circuit-chip" />;
      renderer.action_name = `${activity.credentialsCount} credential(s) imported`;
      break;
    default:
      logger.error(
        "dashboard",
        `Renderer not implemented for activity type ${activity.type.toString()}`
      );
      return renderer;
  }
  return renderer;
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
  needMoreAction?: boolean;
}> = ({ activity, needMoreAction = false }) => {
  const renderer = getActivityRenderer(activity);

  return (
    <DetailTableRow
      className="h-[3.5rem]"
      avatar={<IconAvatar>{renderer.icon}</IconAvatar>}
      rowCells={
        <>
          <TableCell>
            <ListItemText
              className="flex-1"
              primary={
                <span className="font-medium">{renderer.action_name}</span>
              }
              secondary={
                <span className="text-[8pt]">{renderer.action_for}</span>
              }
              sx={{ my: 0 }}
              primaryTypographyProps={{
                sx: {
                  lineHeight: 1.3,
                },
              }}
              secondaryTypographyProps={{
                sx: {
                  lineHeight: 1.2,
                },
              }}
            />
          </TableCell>
          <TableCell align={needMoreAction ? "center" : "right"}>
            {getDateDistance(activity.createdAt)}
          </TableCell>
          {needMoreAction && (
            <TableCell>
              <IconButton
                size="small"
                color="inherit"
                // onClick={(event): void => {
                //   handleOpenMenu(event, credential);
                // }}
              >
                <MoreVertIcon />
              </IconButton>
            </TableCell>
          )}
        </>
      }
    />
  );
};
