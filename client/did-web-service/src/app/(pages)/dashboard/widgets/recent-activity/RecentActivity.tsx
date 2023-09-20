import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC } from 'react';
import { RecentActivityRow } from "./RecentActivityRow";

export const RecentActivityWidget: FC = _ => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const router = useRouter();
  let [activities] = useBehaviorSubject(activeUser?.get('activity').activities$);
  activities = activities?.slice(0, 5)

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
        <div className="overflow-x-hidden">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Activity</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Date</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                activities && activities.length > 0 && activities.map((activity, i) => <RecentActivityRow activity={activity} key={i} />)
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
