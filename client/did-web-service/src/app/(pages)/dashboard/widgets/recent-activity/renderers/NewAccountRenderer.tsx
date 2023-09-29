import { Activity } from "@model/activity/activity";
import { FC } from "react";

export const NewAccountRenderer: FC<{ activity: Activity }> = ({ activity }) => {
    const { identityDidStr } = activity;

    return (
        <div className='flex flex-row gap-2 items-center'>
            <div>
                Account created
            </div>
        </div>
    )
}
