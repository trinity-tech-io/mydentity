import { Activity } from "@model/activity/activity";
import { FC } from "react";

export const PasswordChangedRenderer: FC<{ activity: Activity }> = ({ activity }) => {
  const { identityStr } = activity;

  return (
    <div className='flex flex-row gap-2 items-center'>
      <div>
        Password changed
      </div>
    </div>
  )
}
