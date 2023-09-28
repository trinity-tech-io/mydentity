import { FC } from 'react';
import { useRouter } from "next/navigation";
import { Icon as ReactIcon } from '@iconify/react';
import { DarkButton } from '@components/button';
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Box, Link } from '@mui/material';
import { useToast } from "@services/feedback.service";
import { FlowOperation, getOnGoingFlowOperation } from '@services/flow.service';
import { authUser$ } from "@services/user/user.events";

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
    <Box className="inline-flex flex-col justify-center items-center">
      <div className="w-full pb-6">
        <DarkButton
          id="bind-ms"
          className="w-full"
          startIcon={<ReactIcon icon="material-symbols:passkey" />}
          onClick={bindPasskeyConfirmation}
        >
          bind passkey
        </DarkButton>
      </div>
      <span className="text-[11px] font-extralight text-center opacity-50">
        Binding an account means you agree to the<br />
        <Link href="#" color="inherit"><span className="font-medium">Privacy Policy</span></Link> and <Link href="#" color="inherit"><span className="font-medium">Terms of Service</span></Link>.
      </span>
    </Box>
  );
}
export default PasskeyBind;
