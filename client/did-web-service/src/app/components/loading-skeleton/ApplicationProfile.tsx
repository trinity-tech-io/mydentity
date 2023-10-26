import { FC } from "react";
import { Stack } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkelTheme from "./SkelTheme";

// ----------------------------------------------------------------------

const ApplicationProfile: FC = () => {
  return (
    <SkelTheme>
      <Stack spacing={2} className="w-full" alignItems="center">
        <Skeleton
          width={88}
          height={88}
          circle={true}
          containerClassName="leading-none"
        />
        <h5 className="w-full max-w-sm">
          <Skeleton count={1} height={25} style={{ lineHeight: 3 }} />
        </h5>
      </Stack>
    </SkelTheme>
  );
};

export default ApplicationProfile;
