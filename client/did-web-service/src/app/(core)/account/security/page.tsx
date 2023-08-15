"use client";
import { MainButton } from "@components/MainButton";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { TextField } from "@mui/material";
import { authUser$ } from "@services/user/user.events";
import { FC, createRef } from "react";

const Security: FC = () => {
  const [authUser] = useBehaviorSubject(authUser$);
  const securityFeature = authUser?.get("security");
  const [devices] = useBehaviorSubject(authUser?.get("device").devices$);

  const newPasswordRef = createRef<HTMLInputElement>()

  console.log("authUser", authUser)

  const bindDevice = () => {
    securityFeature.bindDevice();
  }

  const bindPassword = () => {
    const newPassword = newPasswordRef.current.value;
    if (newPassword)
      securityFeature.bindPassword(newPassword);
  }

  return (<div className="col-span-full">
    Here is the page to bind more devices to this user account.
    <br /><br />
    List of bound devices:<br />
    {
      devices?.map(device => <div key={device.id}>{device.name}</div>)
    }
    <br /><br />
    <MainButton title="Bind device" onClick={bindDevice} />

    <div className="flex flex-row mt-4 gap-2">
      <TextField
        label="New password"
        inputRef={newPasswordRef}
        variant="outlined"
      />
      <MainButton title="Bind password" onClick={bindPassword} />
    </div>
  </div>)
}

export default Security;