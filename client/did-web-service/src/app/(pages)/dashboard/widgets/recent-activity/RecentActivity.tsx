import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC } from 'react';
import { RecentActivityRow } from "./RecentActivityRow";
import DetailContainer from "@components/generic/DetailContainer";
import { Avatar, Divider, ListItemText, Stack, Typography, styled } from "@mui/material";
import { Icon as ReactIcon } from "@iconify/react";

const IconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: "#3A3A3A",
  color: "#DDD",
  width: 36,
  height: 36,
  padding: 8,
}));

export const RecentActivityWidget: FC = _ => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const router = useRouter();
  let [activities] = useBehaviorSubject(activeUser?.get('activity').activities$);
  activities = activities?.slice(0, 5)

  const handleShowAllClick = (): void => {
    router.push("/recent-activity");
  }

  return (
    <DetailContainer title="Recent Activity">
      <div className="mb-1">
        <Stack direction="row" className="pl-12 pr-2 py-1" sx={{background: "linear-gradient(to right, transparent, #444 25%, #3e3e3e 50%, #444 75%, transparent)"}}>
          <span className="text-[15px] flex-1 font-medium">ACCOUNT ACTIVITY</span>
          <span className="text-[15px] font-medium">DATE</span>
        </Stack>
        <Stack direction="row" spacing={1}>
          <div className="inline-flex items-center">
            <IconAvatar ><ReactIcon icon="ic:round-log-in" /></IconAvatar>
          </div>
          <div className="flex-1">
            <div className="flex flex-1 items-center pl-1">
              <ListItemText
                className="flex-1"
                primary={<span className="font-medium">User sign-in</span>}
                secondary={<span className="text-[12px]">Microsoft sign-in</span>}
              />
              <span>1 min ago</span>
            </div>
            <Divider />
          </div>
        </Stack>
      </div>
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
    </DetailContainer>
    // <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    //   <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
    //     <h2 className="font-semibold text-slate-800 dark:text-slate-100">Recent activity</h2>
    //   </header>
    //   <div className="p-3">

    //   </div>
    // </div>
  );
}
