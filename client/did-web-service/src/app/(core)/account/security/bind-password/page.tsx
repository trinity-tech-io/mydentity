"use client";
import { MainButton } from "@components/MainButton";
import { usePasswordPrompt } from "@components/PasswordPrompt";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { TextField, Typography } from "@mui/material";
import { authUser$ } from "@services/user/user.events";
import { FC, createRef } from "react";

const BindPassword: FC = () => {
  const { mounted } = useMounted();
  const [authUser] = useBehaviorSubject(authUser$());
  const securityFeature = authUser?.get("security");
  const [devices] = useBehaviorSubject(authUser?.get("device").devices$);
  const { showPasswordPrompt } = usePasswordPrompt();

  const newPasswordRef = createRef<HTMLInputElement>()

  const bindDevice = () => {
    securityFeature.bindDevice();
  }

  const bindPassword = () => {
    // Request current password
    showPasswordPrompt(password => {
      console.log("Entered password:", password);

      const newPassword = newPasswordRef.current.value;
      if (newPassword)
        securityFeature.bindPassword(newPassword);
    });
  }

  return (<div className="col-span-full">
    <Typography variant="h4">Secure with password</Typography>
    <p>
      In order to secure your account with a password, you need to first
    </p>
    <br /><br />
    {mounted && <>
      <Typography variant="h5">Bind a master password</Typography>

      <div className="flex flex-row mt-4 gap-2">
        <TextField
          label="New password"
          inputRef={newPasswordRef}
          variant="outlined"
          size="small"
        />
        <MainButton onClick={bindPassword} >Bind password</MainButton>
      </div>
    </>}
  </div>)
}

export default BindPassword;