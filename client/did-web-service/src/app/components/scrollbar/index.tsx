import { FC, ReactNode } from "react";
import { ScrollbarProps, Scrollbars } from "react-custom-scrollbars-2";

import { Box, useTheme, alpha } from "@mui/material";

const Scrollbar: FC<{ children?: ReactNode; props?: ScrollbarProps }> = ({
  children,
  props,
}) => {
  const theme = useTheme();

  return (
    <Scrollbars
      autoHide={false}
      renderThumbVertical={(): ReactNode => (
        <Box
          sx={{
            width: 6,
            background: alpha("#CBCCD2", 0.25),
            borderRadius: 12,
            transition: `${theme.transitions.create(["background"])}`,
            "&:hover": {
              background: alpha("#CBCCD2", 0.5),
            },
          }}
        />
      )}
      renderTrackVertical={(props): ReactNode => (
        <Box
          {...props}
          className="track-vertical"
          sx={{
            top: 2,
            bottom: 2,
            right: 0,
            width: 7,
            // background: alpha("#CBCCD2", 0.1),
            borderRadius: 12,
          }}
        />
      )}
      renderView={(props): ReactNode => (
        <Box
          {...props}
          className="view"
          sx={{
            paddingRight: "10px",
          }}
        />
      )}
      {...props}
      style={{ width: "auto", marginRight: -10 }}
    >
      {children}
    </Scrollbars>
  );
};

export default Scrollbar;
