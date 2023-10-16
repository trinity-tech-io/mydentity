import { FC } from "react";
import { useTheme } from "@mui/material/styles";
import { Stack, TableCell, TableRow } from "@mui/material";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DarkThemeProp } from "./prop";

// ----------------------------------------------------------------------

const TableAvatarRow: FC<{ colSpan?: number }> = ({ colSpan = 2 }) => {
  const theme = useTheme();
  const themeProp = theme.palette.mode === "dark" ? DarkThemeProp : {};
  return (
    <SkeletonTheme {...themeProp}>
      <TableRow className="h-[3.5rem]">
        <TableCell>
          <Skeleton width={36} height={36} circle={true} />
        </TableCell>
        <TableCell colSpan={colSpan}>
          <h5 style={{ flexGrow: 1 }}>
            <Skeleton count={1} />
          </h5>
        </TableCell>
      </TableRow>
    </SkeletonTheme>
  );
};

export default TableAvatarRow;
