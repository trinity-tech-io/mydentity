import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import SkelTheme from "./SkelTheme";

// ----------------------------------------------------------------------

const AccountName: FC = () => {
  return (
    <SkelTheme>
      <h5>
        <Skeleton count={1} height={28}/>
      </h5>
    </SkelTheme>
  );
};

export default AccountName;
