import { Activity } from "@model/activity/activity";
import { FC } from "react";

export const BindEmailRenderer: FC<{ activity: Activity }> = ({ activity }) => {

  /*
    if (this.userEmailProvider == UserEmailProvider.RAW)
        return 'Bound with raw email.';
    else if (this.userEmailProvider === UserEmailProvider.MICROSOFT)
        return 'Bound with Microsoft oauth email.';
    return `Bound with unhandled type ${this.userEmailProvider}.`; */

  return (
    <div className='flex flex-row gap-2 items-center'>

      <div>
        Bound email address {activity.userEmailAddressStr}
      </div>
    </div>
  )
}
