"use client";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { MasterPasswordInput } from "@components/security/MasterPasswordInput";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { CircularProgress, Typography } from "@mui/material";
import { useToast } from "@services/feedback.service";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { ActivityType } from "@model/activity/activity-type";
import { ActivityFeature } from "@model/user/features/activity/activity.feature";

const BindPassword: FC = () => {
  const { mounted } = useMounted();
  const [authUser] = useBehaviorSubject(authUser$);
  const securityFeature = authUser?.get("security");
  const [shadowKeys] = useBehaviorSubject(securityFeature?.shadowKeys$); // KEY THIS to lazily fetch the shadow keys
  const isPasswordBound = securityFeature?.isPasswordBound();
  const { showSuccessToast } = useToast();
  const router = useRouter();

  const bindPassword = async (password: string): Promise<void> => {
    // Unlock the master key first, and bind only if unlock is successful.
    if (await securityFeature.ensureMasterKeyUnlocked()) {
      // Call the bind password API, fail if master key got unlocked for some reason since we just unlocked it.
      // Do NOT repeatingly retry
      const bound = await securityFeature.bindPassword(password);
      if (bound) {
        if (isPasswordBound)
          await ActivityFeature.createActivity({type: ActivityType.PASSWORD_CHANGED});

        showSuccessToast("Master password set successfully");
        setTimeout(() => {
          router.push("/account/security");
        }, 500);
      }
    }
  }

  if (!mounted || !authUser || !shadowKeys)
    return <CircularProgress />;

  return (<div className="col-span-full">
    <Breadcrumbs entries={["security-center", "bind-password"]} />

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