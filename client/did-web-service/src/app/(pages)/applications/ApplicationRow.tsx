import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { IdentityInteractingApplication } from "@model/identity-interacting-application/identity-interacting-application";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { FC } from "react";

export const ApplicationRow: FC<{
  application: IdentityInteractingApplication;
}> = ({ application }) => {
  const [appName] = useBehaviorSubject(application?.interactingApplication?.name$);
  const [appIcon] = useBehaviorSubject(application?.interactingApplication?.icon$);
  const [requestedCredentials] = useBehaviorSubject(application?.requestedCredentials$);
  const [importedCredentials] = useBehaviorSubject(application?.importedCredentials$);

  return (
    <div className="flex flex-row gap-4 mb-4 items-center">
      <Avatar sx={{ width: 60, height: 60 }}  >
        {appIcon && <Image src={appIcon} alt="" width={60} height={60} />}
      </Avatar>
      <div className="flex flex-col">
        <div className="font-bold">{appName}</div>
        <div>{application.interactingApplication.did}</div>
      </div>
      <div>{requestedCredentials?.length} credential(s) obtained</div>
      <div>{importedCredentials?.length} credential(s) imported</div>
    </div>
  );
}