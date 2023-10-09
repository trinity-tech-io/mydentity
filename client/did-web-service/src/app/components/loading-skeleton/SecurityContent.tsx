import { FC } from "react";
import { Stack } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkelTheme from "./SkelTheme";

// ----------------------------------------------------------------------

const SecurityContent: FC = () => {
  return (
    <SkelTheme>
      <Stack direction="row" spacing={2} className="w-full" alignItems="center">
        <h5 className="flex-1">
          <Skeleton count={3}/>
        </h5>
      </Stack>
    </SkelTheme>
  );
};

export default SecurityContent;
