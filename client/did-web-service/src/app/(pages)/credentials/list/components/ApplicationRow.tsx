import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { IdentityInteractingApplication } from "@model/identity-interacting-application/identity-interacting-application";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { FC } from "react";

export const ApplicationRow: FC<{
  application: IdentityInteractingApplication;
}> = ({ application }) => {
  const iconSize = 40;
  const [appName] = useBehaviorSubject(application?.interactingApplication?.name$);
  const [appIcon] = useBehaviorSubject(application?.interactingApplication?.icon$);

  return (
    <div className="flex flex-row gap-4 mb-4 items-center">
      <Avatar sx={{ width: iconSize, height: iconSize }}  >
        {appIcon && <Image src={appIcon} alt="" width={iconSize} height={iconSize} />}
      </Avatar>
      <div className="flex flex-col">
        <div className="font-bold">{appName}</div>
        <div>{application.interactingApplication.did}</div>
      </div>
    </div>
  );
}