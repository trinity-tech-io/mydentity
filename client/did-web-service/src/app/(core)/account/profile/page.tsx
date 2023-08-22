"use client";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { Typography } from "@mui/material";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC } from "react";

const AccountProfile: FC = () => {
  const { mounted } = useMounted();
  const [authUser] = useBehaviorSubject(authUser$());
  const router = useRouter();

  return (<div className="col-span-full">
    <Typography variant="h4">Account profile</Typography>
    <p>
      Here is your account profile.
    </p>

  </div>)
}

export default AccountProfile;