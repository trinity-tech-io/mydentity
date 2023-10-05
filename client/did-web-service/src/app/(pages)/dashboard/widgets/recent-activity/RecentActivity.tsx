import { FC } from "react";
import { useRouter } from "next13-progressbar";
import { Stack, TableCell, TableRow } from "@mui/material";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import DetailContainer from "@components/generic/DetailContainer";
import { DetailTable } from "@components/generic/DetailTable";
import { ActivityRow } from "./ActivityRow";
import { useMounted } from "@hooks/useMounted";
import { TableAvatarRow } from "@components/loading-skeleton";

export const RecentActivityWidget: FC = (_) => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const { mounted } = useMounted();
  const router = useRouter();
  let [activities] = useBehaviorSubject(
    activeUser?.get("activity").activities$
  );
  activities = activities?.slice(0, 5);

  const handleShowAllClick = (): void => {
    router.push("/recent-activity");
  };

  return (
    <DetailContainer
      className="h-full"
      title="Recent Activity"
      showAllAction={handleShowAllClick}
    >
      <div className="mb-1">
        <DetailTable
          headCells={
            <>
              <TableCell>ACCOUNT ACTIVITY</TableCell>
              <TableCell>DATE</TableCell>
            </>
          }
          bodyRows={
            !mounted ? (
              Array(3)
                .fill(0)
                .map((_i) => <TableAvatarRow key={_i} />)
            ) : (
              <>
                {activities && activities.length > 0 ? (
                  activities
                    .slice(0, 5)
                    .map((activity, i) => (
                      <ActivityRow activity={activity} key={i} />
                    ))
                ) : (
                  <TableRow>
                    <TableCell component="th" colSpan={3} align="center">
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
  );
};
