import { InteractingApplicationAvatar } from "@components/applications/InteractingApplicationAvatar";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Activity } from "@model/activity/activity";
import { InteractingApplication } from "@model/interacting-application/interacting-application";
import { Tooltip } from "@mui/material";
import { FC, useEffect, useState } from "react";

export const CredentialsImportedRenderer: FC<{ activity: Activity }> = ({ activity }) => {
  const [app, setApp] = useState<InteractingApplication>(null);
  const [appName] = useBehaviorSubject(app?.name$);

  useEffect(() => {
    if (activity && activity.appDid) {
      InteractingApplication.fromLocalDid(activity.appDid).then(app => {
        setApp(app);
      })
    }
  }, [activity]);

  return (
    <div className='flex flex-row gap-2 items-center'>
      Imported {activity.credentialsCount} credential(s) from <Tooltip title={appName}><InteractingApplicationAvatar application={app} size={20} /></Tooltip>
    </div>
  )
}
