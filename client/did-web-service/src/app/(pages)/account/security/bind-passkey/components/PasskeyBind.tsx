import { MainButton } from '@components/generic/MainButton';
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useToast } from "@services/feedback.service";
import { FlowOperation, getOnGoingFlowOperation } from '@services/flow.service';
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC } from 'react';

export const PasskeyBind: FC = () => {
  //   onConfirm: (password: string) => void;
  // }> = ({ onConfirm }) => {
  //   const onSubmit = () => {
  //     onConfirm("");
  //   }
  const router = useRouter();
  const [activeUser] = useBehaviorSubject(authUser$);
  const securityFeature = activeUser?.get("security");
  const { showSuccessToast } = useToast();

  const bindPasskeyConfirmation = async (): Promise<void> => {
    // Unlock the master key first, and bind only if unlock is successful.
    if (await securityFeature.ensureMasterKeyUnlocked()) {
      // Call the bind passkey api, fail if master key got unlocked for some reason since we just unlocked it.
      // Do NOT repeatingly retry
      const bound = await securityFeature.bindPasskey();
      if (bound) {
        showSuccessToast("Browser bound successfully");

        setTimeout(() => {
          const onGoingFlowOp = getOnGoingFlowOperation();
          switch (onGoingFlowOp) {
            // If we were in the on boarding phase, go back there
            case FlowOperation.OnBoardingBrowserBinding:
              router.push("/onboarding");
              break;
            // Otherwise, go back to security center
            default:
              router.push("/account/security");
          }
        }, 200);
      }
    }
  }

  return (
    <div className='flex flex-row gap-4 mt-4 p-4 items-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <MainButton onClick={bindPasskeyConfirmation} >bind passkey</MainButton>
    </div>
  );
}
export default PasskeyBind;
