import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { FC } from 'react';
import { RecentActivityRow } from "../../dashboard/widgets/recent-activity/RecentActivityRow";

export const AllRecentActivity: FC = _ => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const [activities] = useBehaviorSubject(activeUser?.get('activity').activities$);

  return (
    <div className="col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
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
                activities && activities.length > 0 && activities.map((activity, i) => <RecentActivityRow activity={activity} key={i} />)
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}
