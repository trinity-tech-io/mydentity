import { FC } from "react";
import { TableCell } from "@mui/material";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import DetailContainer from "@components/generic/DetailContainer";
import { DetailTable } from "@components/generic/DetailTable";
import { ActivityRow } from "./ActivityRow";

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
              {activities &&
                activities.length > 0 &&
                activities.map((activity, i) => (
                  <ActivityRow activity={activity} key={i} />
                ))}
            </>
          }
        />
      </div>
    </DetailContainer>
  );
};
