"use client";
import { usePasswordPrompt } from "@components/PasswordPrompt";
import { MasterPasswordInput } from "@components/security/MasterPasswordInput";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { CircularProgress, Typography } from "@mui/material";
import { authUser$ } from "@services/user/user.events";
import { FC } from "react";

const BindPassword: FC = () => {
  const { mounted } = useMounted();
  const [authUser] = useBehaviorSubject(authUser$());
  const securityFeature = authUser?.get("security");
  const [shadowKeys] = useBehaviorSubject(securityFeature?.shadowKeys$); // KEY THIS to lazily fetch the shadow keys
  const isPasswordBound = securityFeature?.isPasswordBound();
  const { showPasswordPrompt } = usePasswordPrompt();

  const bindPassword = (password: string) => {
    // Request current password
    showPasswordPrompt(password => {
      console.log("Entered password:", password);
      securityFeature.bindPassword(password);
    });
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