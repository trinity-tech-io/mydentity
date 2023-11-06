import { FC, MutableRefObject, ReactNode } from "react";
import { Icon as ReactIcon } from "@iconify/react";
import {
  ClickAwayListener,
  Grow,
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import { getPasskeyAllUsers } from "@services/user/user.service";
import ArrowPopper from "@components/popup/ArrowPopper";

interface UserSelectionMenu {
  showSelection: boolean;
  buttonRef: MutableRefObject<any>;
  onCloseSelection: () => void;
  handleUserSelection: (user: {
    credentialId: string;
    name: string;
  }) => Promise<void>;
}
const UserSelectionMenu: FC<UserSelectionMenu> = ({
  showSelection,
  buttonRef,
  onCloseSelection,
  handleUserSelection,
}) => {
  const passkeyUsers = getPasskeyAllUsers();
  return (
    <ArrowPopper
      open={showSelection}
      anchorEl={buttonRef?.current}
      transition
      placement="top-start"
    >
      {({ TransitionProps, placement }): ReactNode => (
        <ClickAwayListener onClickAway={onCloseSelection}>
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-end" ? "right top" : "right bottom",
            }}
          >
            <Paper className="paper">
              <MenuList>
                {passkeyUsers.map((user, _id) => (
                  <MenuItem
                    key={_id}
                    onClick={(): void => {
                      handleUserSelection(user);
                    }}
                  >
                    <ListItemIcon>
                      <ReactIcon icon="simple-icons:authelia" />
                    </ListItemIcon>
                    {user.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </Grow>
        </ClickAwayListener>
      )}
    </ArrowPopper>
  );
};

export default UserSelectionMenu;
