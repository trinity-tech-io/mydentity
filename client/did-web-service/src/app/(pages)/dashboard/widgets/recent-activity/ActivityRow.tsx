import { FC, ReactNode, useRef, useState } from "react";
import ConfirmDialog from "@components/generic/ConfirmDialog";
import { DetailTableRow } from "@components/generic/DetailTable";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Icon as ReactIcon } from "@iconify/react";
import { Activity } from "@model/activity/activity";
import { ActivityType } from "@model/activity/activity-type";
import {
  Avatar,
  ClickAwayListener,
  Grow,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TableCell,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  DeleteOutline as DeleteOutlineIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { logger } from "@services/logger";
import { authUser$ } from "@services/user/user.events";
import { getDateDistance } from "@utils/date";

interface ActivityRenderType {
  icon: ReactNode;
  action_name: string;
  action_for: string | ReactNode;
}
function getActivityRenderer(activity: Activity): ActivityRenderType {
  const renderer: ActivityRenderType = {
    icon: null,
    action_name: "",
    action_for: "",
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
      renderer.action_name =
        activity.credentialsCount && activity.credentialsCount > 0
          ? `${activity.credentialsCount} credential(s) shared with an app`
          : "Identity ID shared with an app";
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
  deleteActivity?: (activity: Activity) => Promise<boolean>;
}> = ({
  activity,
  needMoreAction = false,
  deleteActivity = async (_: Activity): Promise<boolean> => {
    return false;
  },
}) => {
  const [authUser] = useBehaviorSubject(authUser$);
  const [openMenu, setOpenMenu] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const moreButtonRef = useRef(null);
  const renderer = getActivityRenderer(activity);

  const handleCloseMenu = (): void => {
    setOpenMenu(false);
  };

  // Click -> Delete activity
  const handleDelete = (): void => {
    handleCloseMenu();
    setOpenConfirmDialog(true);
  };

  // Click -> Agree/Disagree Delete activity
  const handleCloseDialog = async (isAgree: boolean): Promise<void> => {
    if (!isAgree) {
      setOpenConfirmDialog(false);
      return;
    }

    let isSuccess = false;
    try {
      // Deletion
      isSuccess = await deleteActivity(activity);
      if (isSuccess) setOpenConfirmDialog(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
                  ref={moreButtonRef}
                  size="small"
                  color="inherit"
                  onClick={(event): void => {
                    setOpenMenu(!openMenu);
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            )}
          </>
        }
      />
      <Popper
        open={openMenu}
        anchorEl={moreButtonRef?.current}
        placement="bottom-end"
        transition
        sx={{ zIndex: 10 }}
      >
        {({ TransitionProps, placement }): ReactNode => (
          <ClickAwayListener onClickAway={handleCloseMenu}>
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-end" ? "right top" : "right bottom",
              }}
            >
              <Paper>
                <MenuList>
                  <MenuItem sx={{ color: "error.main" }} onClick={handleDelete}>
                    <ListItemIcon sx={{ color: "error.main" }}>
                      <DeleteOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    Delete
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
      <ConfirmDialog
        title="Delete this activity?"
        content="Do you want to delete this activity?"
        open={openConfirmDialog}
        onClose={handleCloseDialog}
      />
    </>
  );
};
