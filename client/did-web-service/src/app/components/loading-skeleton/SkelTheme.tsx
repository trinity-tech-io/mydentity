import { FC, ReactNode } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "@mui/material/styles";
import { DarkThemeProp } from "./prop";
const SkelTheme: FC<{children: ReactNode}> = ({children}) => {
    const theme = useTheme();
    const themeProp = theme.palette.mode === "dark" ? DarkThemeProp : {};
    return (
      <SkeletonTheme {...themeProp}>
        {children}
      </SkeletonTheme>
    );
  };

  export default SkelTheme;