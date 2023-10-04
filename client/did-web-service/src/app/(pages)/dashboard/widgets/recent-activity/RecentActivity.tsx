import { FC } from "react";
import { Avatar, ListItemText, TableCell, styled } from "@mui/material";
import { Icon as ReactIcon } from "@iconify/react";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { RecentActivityRow } from "./RecentActivityRow";
import DetailContainer from "@components/generic/DetailContainer";
import { DetailTable, DetailTableRow } from "@components/generic/DetailTable";
import { ActivityRow } from "./ActivityRow";

const IconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: "#3A3A3A",
  color: "#DDD",
  width: 36,
  height: 36,
  padding: 8,
}));

export const RecentActivityWidget: FC = (_) => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const router = useRouter();
  let [activities] = useBehaviorSubject(
    activeUser?.get("activity").activities$
  );
  activities = activities?.slice(0, 5);

  const handleShowAllClick = (): void => {
    router.push("/recent-activity");
  };

  return (
    <DetailContainer title="Recent Activity" showAllAction={handleShowAllClick}>
      <div className="mb-1">
        <DetailTable
          headCells={
            <>
              <TableCell>ACCOUNT ACTIVITY</TableCell>
              <TableCell>DATE</TableCell>
            </>
          }
          bodyRows={
            <>
              {/* <DetailTableRow
                avatar={
                  <IconAvatar>
                    <ReactIcon icon="ic:round-log-in" />
                  </IconAvatar>
                }
                rowCells={
                  <>
                    <TableCell>
                      <ListItemText
                        className="flex-1"
                        primary={
                          <span className="font-medium">User sign-in</span>
                        }
                        secondary={
                          <span className="text-[12px]">Microsoft sign-in</span>
                        }
                      />
                    </TableCell>
                    <TableCell>1 min ago</TableCell>
                  </>
                }
              /> */}
              {activities &&
              activities.length > 0 &&
              activities.map((activity, i) => (
                <ActivityRow activity={activity} key={i} />
              ))}
            </>
          }
        />
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
            {activities &&
              activities.length > 0 &&
              activities.map((activity, i) => (
                <RecentActivityRow activity={activity} key={i} />
              ))}
          </tbody>
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
};
