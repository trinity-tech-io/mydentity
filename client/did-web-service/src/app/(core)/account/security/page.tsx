"use client";
import { MainButton } from "@components/MainButton";
import { usePasswordPrompt } from "@components/PasswordPrompt";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { TextField, Typography } from "@mui/material";
import { authUser$ } from "@services/user/user.events";
import { FC, createRef } from "react";

const Security: FC = () => {
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
    <Typography variant="h4">Security center</Typography>
    <p>
      Your identity is a Web3 identity, <b>protected by cryptographic keys</b>. Many Web3 applications require you to
      save those keys by yourself, and you will sometimes do that in unsafe ways. On the contrary, this service
      partially stores the complex cryptographic keys
      for you so you don&apos;t have to do it. Your keys are protected by your own devices or passwords
      and <b>this app cannot do anything without your consent</b>. For this reason, you need to bind multiple devices and browsers,
      as this is your only way to recover your account later in case one of the devices is lost. <b>We cannot do that for you</b>.
    </p>
    <br /><br />
    {mounted && <>
      <Typography variant="h5">My devices</Typography>
      {devices?.length == 0 && "You haven't bound any device yet. Start binding this browser now to secure your account."}
      {
        devices && <>
          {devices.map(device => <div key={device.id}>{device.name}</div>)}
        </>
      }
      <br /><br />
      <MainButton onClick={bindDevice} >Bind device</MainButton>

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

export default Security;