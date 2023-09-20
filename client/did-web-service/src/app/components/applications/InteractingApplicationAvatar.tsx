import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { InteractingApplication } from "@model/interacting-application/interacting-application";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { FC } from "react";

export const InteractingApplicationAvatar: FC<{
  application: InteractingApplication;
  size: number;
}> = ({ application, size }) => {
  const [appIcon] = useBehaviorSubject(application?.icon$);

  if (!application)
    return null;

  return (
    <Avatar sx={{ width: size, height: size, display: 'inline' }}  >
      {appIcon && <Image src={appIcon} alt="" width={size} height={size} />}
    </Avatar>
  )
}