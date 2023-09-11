import { MainButton } from '@components/generic/MainButton';
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useToast } from "@services/feedback.service";
import { FlowOperation, getOnGoingFlowOperation } from '@services/flow.service';
import { useCallWithUnlock } from "@services/security/security.service";
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
  const [authUser] = useBehaviorSubject(authUser$);
  const securityFeature = authUser?.get("security");
  const { callWithUnlock } = useCallWithUnlock<boolean>();
  const { showSuccessToast } = useToast();

  const bindPasskeyConfirmation = async (): Promise<void> => {
    // Call the bind password API with auto-retry if user unlock method is required.
    const bound = await callWithUnlock(() => securityFeature.bindPasskey());
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

  return (
    <div className='flex flex-row gap-4 mt-4 p-4 items-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <MainButton onClick={bindPasskeyConfirmation} >bind passkey</MainButton>
    </div>
  );
}
export default PasskeyBind;
