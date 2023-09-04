import {FC, useEffect, useState} from 'react';
import {getActivities} from "@services/activity.service";
import {Activity} from "@model/activity/activity";

export const RecentActivityWidget: FC = _ => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    getActivities().then(activities => {
      setActivities(activities);
    })
  }, []);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Recent activity</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">DATE</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Activity</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                activities && activities.length > 0 && activities.map(activity => {
                  return (
                    <tr key={activity.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{activity.getCreatedAtStr()}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{activity.getDescription()}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}
