import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import SkelTheme from "./SkelTheme";

// ----------------------------------------------------------------------

const OneLineText: FC<{ height?: number }> = ({ height = 14 }) => {
  return (
    <SkelTheme>
      <h5>
        <Skeleton count={1} height={height} />
      </h5>
    </SkelTheme>
  );
};

export default OneLineText;
