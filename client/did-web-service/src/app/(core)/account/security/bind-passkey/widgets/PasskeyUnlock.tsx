import { MainButton } from '@components/generic/MainButton';
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useToast } from "@services/feedback.service";
import { useCallWithUnlock } from "@services/security/security.service";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC } from 'react';

export const PasskeyAuth: FC = () => {
  const router = useRouter();
  const [authUser] = useBehaviorSubject(authUser$());
  const securityFeature = authUser?.get("security");
  const { callWithUnlock } = useCallWithUnlock<boolean>();
  const { showSuccessToast } = useToast();

  const unlockPasskeyConfirmation = async () => {
    // Call the bind password API with auto-retry if user unlock method is required.
    const bound = await callWithUnlock(() => securityFeature.unlockPasskey());
    if (bound) {
      showSuccessToast("Unlock passkey successfully");
      setTimeout(() => {
        router.push("/account/security");
      }, 2000);
    }
  }

  return (
    <div className='flex flex-row gap-4 mt-4 p-4 items-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <MainButton onClick={unlockPasskeyConfirmation} >Unlock passkey</MainButton>
    </div>
  );
}
export default PasskeyAuth;
