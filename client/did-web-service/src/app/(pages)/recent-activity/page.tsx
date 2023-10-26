"use client";
import { FC, useEffect } from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { Icon as ReactIcon } from "@iconify/react";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { clearOnGoingFlowOperation } from "@services/flow.service";
import { authUser$ } from "@services/user/user.events";
import Headline from "@components/layout/Headline";
import DetailContainer from "@components/generic/DetailContainer";
import { IconAvatar } from "@components/feature/DetailLine";
import { DetailTable } from "@components/generic/DetailTable";
import { useMounted } from "@hooks/useMounted";
import { LoadingTableAvatarRow } from "@components/loading-skeleton";
import { ActivityRow } from "../dashboard/widgets/recent-activity/ActivityRow";
import { Activity } from "@model/activity/activity";

const RecentActivity: FC = () => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const [activities] = useBehaviorSubject(
    activeUser?.get("activity").activities$
  );
  const { mounted } = useMounted();

  useEffect(() => {
    clearOnGoingFlowOperation();
  }, []);

  const deleteActivity = async (activity: Activity): Promise<boolean> => {
    const isSuccess = await activeUser
      ?.get("activity")
      .deleteActivities({ ids: [activity.id] });
    return isSuccess;
  };

  return (
    <div className="col-span-full">
      <Headline
        title="Recent Activity"
        description="Stay informed about what's been happening. Explore a detailed overview of your recent activity for enhanced account security and gain valuable insights for better account management."
        showBg={true}
      />
      <DetailContainer
        title={
          <div className="flex items-center">
            <IconAvatar>
              <ReactIcon icon="akar-icons:wallet" />
            </IconAvatar>
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
                  .map((_, _i) => (
                    <LoadingTableAvatarRow colSpan={3} key={_i} />
                  ))
              ) : (
                <>
                  {activities.length > 0 ? (
                    activities.map((activity, i) => (
                      <ActivityRow
                        activity={activity}
                        needMoreAction={true}
                        deleteActivity={deleteActivity}
                        key={i}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell component="th" colSpan={4} align="center">
                        <span className="text-base">No activity found.</span>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )
            }
          />
        </div>
      </DetailContainer>
    </div>
  );
};

export default RecentActivity;
