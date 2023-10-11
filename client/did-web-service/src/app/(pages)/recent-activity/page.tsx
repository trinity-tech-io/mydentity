"use client";
import { FC, useEffect } from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { Icon as ReactIcon } from "@iconify/react"
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { clearOnGoingFlowOperation } from "@services/flow.service";
import { authUser$ } from "@services/user/user.events";
import { RecentActivityRow } from "../dashboard/widgets/recent-activity/RecentActivityRow";
import Headline from "@components/layout/Headline";
import DetailContainer from "@components/generic/DetailContainer";
import { IconAvatar } from "@components/feature/DetailLine";
import { DetailTable } from "@components/generic/DetailTable";
import { useMounted } from "@hooks/useMounted";
import { LoadingTableAvatarRow } from "@components/loading-skeleton";
import { ActivityRow } from "../dashboard/widgets/recent-activity/ActivityRow";

const RecentActivity: FC = () => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const [activities] = useBehaviorSubject(
    activeUser?.get("activity").activities$
  );
  const { mounted } = useMounted();

  useEffect(() => {
    clearOnGoingFlowOperation();
  }, []);

  return (
    <>
      {/* Widgets */}
      {activeUser && (
        <div className="col-span-full">
          <Headline
            title="Recent Activity"
            description="Stay informed about what's been happening. Explore a detailed overview of your recent activity for enhanced account security and gain valuable insights for better account management."
            showBg={true}
          />
          <DetailContainer
            title={
              <div className="flex items-center">
                <IconAvatar><ReactIcon icon="akar-icons:wallet" /></IconAvatar>
                <Typography
                  className="flex-1"
                  variant="h6"
                  fontWeight={600}
                  sx={{ ml: 1 }}
                >
                  Account Overview
                </Typography>
              </div>
            }
            able2ShowAll={false}
          >
            <div className="mb-1">
              <DetailTable
                headCells={
                  <>
                    <TableCell>ACCOUNT ACTIVITY</TableCell>
                    <TableCell align="center">DATE</TableCell>
                    <TableCell width={0}></TableCell>
                  </>
                }
                bodyRows={
                  !mounted || !activities ? (
                    Array(3)
                      .fill(0)
                      .map((_, _i) => <LoadingTableAvatarRow colSpan={3} key={_i} />)
                  ) : (
                    <>
                      {activities.length > 0 ? (
                        activities.map((activity, i) => (
                          <ActivityRow activity={activity} needMoreAction={true} key={i} />
                        ))
                      ) : (
                        <TableRow>
                          <TableCell component="th" colSpan={4} align="center">
                            <span className="text-base">
                              No activity found.
                            </span>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )
                }
              />
            </div>
          </DetailContainer>
          {/* <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
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
                <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                  {activities &&
                    activities.length > 0 &&
                    activities.map((activity, i) => (
                      <RecentActivityRow activity={activity} key={i} />
                    ))}
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default RecentActivity;
