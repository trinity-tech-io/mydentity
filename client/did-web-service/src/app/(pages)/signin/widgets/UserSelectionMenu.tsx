import { FC, MutableRefObject, ReactNode } from "react";
import { styled } from "@mui/material/styles";
import { Icon as ReactIcon } from "@iconify/react";
import {
  ClickAwayListener,
  Grow,
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { getPasskeyAllUsers } from "@services/user/user.service";

const PopperStyled = styled(Popper)(({ theme }) => ({
  zIndex: 100,
  ".paper": {
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      width: 10,
      height: 10,
      backgroundColor: "inherit",
      backgroundImage: "inherit",
      transform: "rotate(45deg)",
      transformOrigin: "left bottom",
      boxShadow: "2px 2px 3px 0px rgba(0,0,0,0.1)",
    },
  },
  "&[data-popper-placement*='top'] .paper": {
    "&:before": {
      bottom: 0,
      left: 10,
    },
  },
  "&[data-popper-placement*='bottom'] .paper": {
    "&:before": {
      top: 0,
      left: 10,
      transformOrigin: "right top",
      boxShadow: "-2px -2px 3px 0px rgba(0,0,0,0.1)",
    },
  },
}));

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
    <PopperStyled
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
    </PopperStyled>
  );
};

export default UserSelectionMenu;
