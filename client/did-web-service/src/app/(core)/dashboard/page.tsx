import { FC } from "react";
import { IdentityListWidget } from "./widgets/IdentityList";
import { RecentActivityWidget } from "./widgets/RecentActivity";

const Dashboard: FC = () => {
  return (<>
    <RecentActivityWidget />
    <IdentityListWidget />
  </>)
}

export default Dashboard;