import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { FC } from 'react';
import { useRouter } from "next/navigation";

export const RecentActivityWidget: FC = _ => {
  const [activeUser] = useBehaviorSubject(authUser$);
  let [activities] = useBehaviorSubject(activeUser?.get('activity').activities$);
  const router = useRouter()
  activities = activities.slice(0, 5)
  // TODO: activities: sorted by recent active time

  const handleShowAllClick = (): void => {
    router.push("/recent-activity");
  }
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
            <tfoot>
                <tr>
                  <td colSpan={2} className="p-0 text-right">
                    <div className="flex justify-end">
                      <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs py-1 px-2 rounded relative"
                      onClick={handleShowAllClick}
                      >
                        <span>Show all</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
          </table>

        </div>

      </div>
    </div>
  );
}
