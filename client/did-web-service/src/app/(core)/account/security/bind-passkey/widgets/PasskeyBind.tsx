import { FC } from 'react';
import { MainButton } from '@components/MainButton';
import { authUser$ } from "@services/user/user.events";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useToast } from "@services/feedback.service";
import { useCallWithUnlock } from "@services/security/security.service";
import { useRouter } from "next/navigation";

export const PasskeyBind: FC = () => {
//   onConfirm: (password: string) => void;
// }> = ({ onConfirm }) => {
//   const onSubmit = () => {
//     onConfirm("");
//   }
  const router = useRouter();
  const [authUser] = useBehaviorSubject(authUser$());
  const securityFeature = authUser?.get("security");
  const { callWithUnlock } = useCallWithUnlock<boolean>();
  const { showSuccessToast } = useToast();

  const bindPasskeyConfirmation = async () => {
    // Call the bind password API with auto-retry if user unlock method is required.
    const bound = await callWithUnlock(() => securityFeature.bindPasskey(authUser.name));
    if (bound) {
      showSuccessToast("Bind passkey successfully");
      setTimeout(() => {
        router.push("/account/security");
      }, 2000);
    }
  }

  return (
    <div className='flex flex-row gap-4 mt-4 p-4 items-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <MainButton onClick={bindPasskeyConfirmation} >bind passkey</MainButton>
    </div>
  );
}
export default PasskeyBind;
