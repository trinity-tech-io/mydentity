import { FC } from "react";
import { Stack, useTheme } from "@mui/material";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DarkThemeProp } from "./prop";

// ----------------------------------------------------------------------

const ProfileInfo: FC = () => {
  const theme = useTheme();
  const themeProp = theme.palette.mode === "dark" ? DarkThemeProp : {};
  return (
    <SkeletonTheme {...themeProp}>
      <Stack direction="row" spacing={2} className="w-full" alignItems="center">
        <Skeleton
          width={80}
          height={80}
          circle={true}
          containerClassName="leading-none"
        />
        <h5 className="flex-1">
          <Skeleton count={1} height={25} style={{ lineHeight: 3 }} />
          <Skeleton count={1} height={12} containerClassName="leading-none"/>
        </h5>
      </Stack>
    </SkeletonTheme>
  );
};

export default ProfileInfo;
