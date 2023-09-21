import { Activity } from "@model/activity/activity";
import { FC } from "react";

export const IdentityCreatedRenderer: FC<{ activity: Activity }> = ({ activity }) => {
  const { identityDid } = activity;

  return (
    <div className='flex flex-row gap-2 items-center'>
      {/* TODO when we have identity in activity <IdentityAvatar/> */}
      <div>
        Identity created
      </div>
    </div>
  )
}
