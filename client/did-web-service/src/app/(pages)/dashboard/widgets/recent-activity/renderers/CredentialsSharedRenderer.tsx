import { InteractingApplicationAvatar } from "@components/applications/InteractingApplicationAvatar";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Activity } from "@model/activity/activity";
import { InteractingApplication } from "@model/interacting-application/interacting-application";
import { FC, useEffect, useState } from "react";

export const CredentialsSharedRenderer: FC<{ activity: Activity }> = ({ activity }) => {
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
      Shared {activity.credentialsCount} credential(s) to {/* <Tooltip title={appName}> */}<InteractingApplicationAvatar application={app} size={20} />{/* </Tooltip> */}
    </div>
  )
}
