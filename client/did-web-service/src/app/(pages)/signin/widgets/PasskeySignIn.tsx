"use client";
import { FC, useState, useEffect, useRef } from "react";
import { DarkButton } from "@components/button";
import { callWithUnlock } from "@components/security/unlock-key-prompt/call-with-unlock";
import { Icon as ReactIcon } from "@iconify/react";
import { useToast } from "@services/feedback.service";
import { usePostSignInFlow } from "@services/flow.service";
import {
  authenticateWithPasskey,
  getPasskeyAllUsers,
} from "@services/user/user.service";
import UserSelectionMenu from "./UserSelectionMenu";

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
      <UserSelectionMenu
        showSelection={showUserSelection}
        buttonRef={signButtonRef}
        onCloseSelection={handleCloseUserSelection}
        handleUserSelection={handleUserSelection}
      />
    </>
  );
};

export default PasskeySignIn;
