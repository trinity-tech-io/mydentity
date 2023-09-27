import { Activity } from "@model/activity/activity";
import { FC } from "react";

export const BindBrowserRenderer: FC<{ activity: Activity }> = ({ activity }) => {
  const browserName = activity.browserNameStr;

  return (
    <div className='flex flex-row gap-2 items-center'>
      <div>
        Bound browser {browserName}
      </div>
    </div>
  )
}
