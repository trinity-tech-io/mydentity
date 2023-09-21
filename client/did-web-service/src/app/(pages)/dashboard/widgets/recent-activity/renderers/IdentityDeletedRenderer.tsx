import { Activity } from "@model/activity/activity";
import { FC } from "react";

export const IdentityDeletedRenderer: FC<{ activity: Activity }> = ({ activity }) => {
  const { identityDidStr } = activity;

  return (
    <div className='flex flex-row gap-2 items-center'>
      <div>
        Identity {identityDidStr} deleted
      </div>
    </div>
  )
}
