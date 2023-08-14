"use client";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { FC } from "react";

const Security: FC = () => {
  const [authUser] = useBehaviorSubject(authUser$);
  const [devices] = useBehaviorSubject(authUser?.get("device").devices$);

  return (<div className="col-span-full">
    Here is the page to bind more devices to this user account.
    <br /><br />
    List of bound devices:<br />
    {
      devices?.map(device => <div key={device.id}>{device.name}</div>)
    }
  </div>)
}

export default Security;