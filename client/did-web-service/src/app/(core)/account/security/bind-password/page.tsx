"use client";
import { MasterPasswordInput } from "@components/security/MasterPasswordInput";
import { useUnlockKeyPrompt } from "@components/security/unlock-key-prompt/UnlockKeyPrompt";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { CircularProgress, Typography } from "@mui/material";
import { useToast } from "@services/feedback.service";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC } from "react";

const BindPassword: FC = () => {
  const { mounted } = useMounted();
  const [authUser] = useBehaviorSubject(authUser$());
  const securityFeature = authUser?.get("security");
  const [shadowKeys] = useBehaviorSubject(securityFeature?.shadowKeys$); // KEY THIS to lazily fetch the shadow keys
  const isPasswordBound = securityFeature?.isPasswordBound();
  const { unlockMasterKey } = useUnlockKeyPrompt();
  const { showSuccessToast } = useToast();
  const router = useRouter();

  const bindPassword = async (password: string) => {
    const bound = await securityFeature.bindPassword(password, () => {
      return unlockMasterKey();
    });

    if (bound) {
      showSuccessToast("Master password set successfully");
      setTimeout(() => {
        router.push("/account/security");
      }, 2000);
    }
  }

  if (!mounted || !authUser || !shadowKeys)
    return <CircularProgress />;

  return (<div className="col-span-full">
    {!isPasswordBound && <Typography variant="h4">Master password creation</Typography>}
    {isPasswordBound && <Typography variant="h4">Master password update</Typography>}
    {!isPasswordBound && <p>
      In order to encrypt all your identities information, you need to define a master password.
    </p>}
    {isPasswordBound && <p>
      Please set a new master password below. Reminder: you cannot recover this password later.
    </p>}
    <br /><br />
    {mounted && <>
      <MasterPasswordInput
        onValidConfirmation={bindPassword}
        title={isPasswordBound ? "Update master password" : "Create master password"} />
    </>}
  </div>)
}

export default BindPassword;