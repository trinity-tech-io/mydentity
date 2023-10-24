'use client';
import { DarkButton } from '@components/button';
import { callWithUnlock } from '@components/security/unlock-key-prompt/call-with-unlock';
import { Icon as ReactIcon } from '@iconify/react';
import { useToast } from "@services/feedback.service";
import { usePostSignInFlow } from '@services/flow.service';
import { authenticateWithPasskey, getPasskeyAllUsers } from "@services/user/user.service";
import { FC, useState, useEffect } from 'react';
import { UserSelectionModal } from './UserSelectionModal'

const PasskeySignIn: FC = () => {
  const { showSuccessToast } = useToast();
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();
  const [showUserSelection, setShowUserSelection] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ credentialId: '', name: '' });
  const [isWebauthnAvailable, setIsWebauthnAvailable] = useState<boolean | null>(null);
  
  useEffect(() => {
    async function isPasskeySupported(): Promise<void> {
      // Check if user verification platform authenticator is supported.
      const result = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      console.log('TODO: REMOVE >>>>>>>>>>>>>>>>>>>>> isPasskeySupported result= ', result);
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
      const bound = await callWithUnlock(() => authenticateWithPasskey(user.credentialId));
      if (bound) {
        showSuccessToast("Successful sign in");
        navigateToPostSignInLandingPage();
      }
    } else {
      // If there are no available users, you can handle the error or display a message
    }
  }

  const handleUserSelection = async (user: { credentialId: string; name: string }): Promise<void> => {
    setSelectedUser(user);
    setShowUserSelection(false);
    // Perform the login operation here using the selected user
    const bound = await callWithUnlock(() => authenticateWithPasskey(user.credentialId));
    
    if (bound) {
      showSuccessToast("Successful sign in");
      navigateToPostSignInLandingPage();
    }
  }
  const handleCloseUserSelection = (): void => {
    setShowUserSelection(false);
  }
  return (
    <>
      <DarkButton
        id="signin-pk"
        disabled={!isWebauthnAvailable}
        className="w-full"
        startIcon={<ReactIcon icon="material-symbols:passkey" />}
        onClick={signInWithPasskey}
      >
        Sign in with Passkey
      </DarkButton>

      {showUserSelection && (
        <UserSelectionModal
          users={getPasskeyAllUsers()}
          onSelectUser={handleUserSelection}
          onClose={handleCloseUserSelection} // Pass the closing function.
          showCloseButton={false} // You can set it to true or false based on your requirements
        />
      )}
    </>
  )
}

export default PasskeySignIn
