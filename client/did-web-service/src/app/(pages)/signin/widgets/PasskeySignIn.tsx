"use client";
import { FC, useState, useEffect, ReactNode, useRef } from "react";
import {
  ClickAwayListener,
  Grow,
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DarkButton } from "@components/button";
import { callWithUnlock } from "@components/security/unlock-key-prompt/call-with-unlock";
import { Icon as ReactIcon } from "@iconify/react";
import { useToast } from "@services/feedback.service";
import { usePostSignInFlow } from "@services/flow.service";
import {
  authenticateWithPasskey,
  getPasskeyAllUsers,
} from "@services/user/user.service";
import { UserSelectionModal } from "./UserSelectionModal";

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
const PasskeySignIn: FC = () => {
  const { showSuccessToast } = useToast();
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();
  const [showUserSelection, setShowUserSelection] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    credentialId: "",
    name: "",
  });
  const [isWebauthnAvailable, setIsWebauthnAvailable] = useState<
    boolean | null
  >(null);
  const signButtonRef = useRef(null);
  const passkeyUsers = getPasskeyAllUsers();

  useEffect(() => {
    async function isPasskeySupported(): Promise<void> {
      // Check if user verification platform authenticator is supported.
      const result =
        await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      setIsWebauthnAvailable(result);
    }
    isPasskeySupported();
  }, []);

  const signInWithPasskey = async (): Promise<void> => {
    const users = getPasskeyAllUsers();
    if (users.length > 1) {
      // If there are multiple users, display a user selection dialog.
      setShowUserSelection(true);
    } else if (users.length === 1) {
      // If there is only one user, log in directly.
      const user = users[0];
      const bound = await callWithUnlock(() =>
        authenticateWithPasskey(user.credentialId)
      );
      if (bound) {
        showSuccessToast("Successful sign in");
        navigateToPostSignInLandingPage();
      }
    } else {
      // If there are no available users, you can handle the error or display a message
    }
  };

  const handleUserSelection = async (user: {
    credentialId: string;
    name: string;
  }): Promise<void> => {
    setSelectedUser(user);
    setShowUserSelection(false);
    // Perform the login operation here using the selected user
    const bound = await callWithUnlock(() =>
      authenticateWithPasskey(user.credentialId)
    );

    if (bound) {
      showSuccessToast("Successful sign in");
      navigateToPostSignInLandingPage();
    }
  };
  const handleCloseUserSelection = (): void => {
    setShowUserSelection(false);
  };
  return (
    <>
      <DarkButton
        id="signin-pk"
        disabled={!isWebauthnAvailable}
        ref={signButtonRef}
        className="w-full"
        startIcon={<ReactIcon icon="material-symbols:passkey" />}
        onClick={signInWithPasskey}
      >
        Sign in with Passkey
      </DarkButton>
      <PopperStyled
        open={showUserSelection}
        anchorEl={signButtonRef?.current}
        transition
        placement="top-start"
      >
        {({ TransitionProps, placement }): ReactNode => (
          <ClickAwayListener onClickAway={handleCloseUserSelection}>
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

      {/* {showUserSelection && (
        <UserSelectionModal
          users={getPasskeyAllUsers()}
          onSelectUser={handleUserSelection}
          onClose={handleCloseUserSelection} // Pass the closing function.
          showCloseButton={false} // You can set it to true or false based on your requirements
        />
      )} */}
    </>
  );
};

export default PasskeySignIn;
