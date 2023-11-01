import { ClickAwayListener, Fade, Paper, Popper } from "@mui/material";
import { PopperOwnProps } from "@mui/base/Popper";
import { FC, ReactNode } from "react";

interface PopupMenuType {
  popperProps: PopperOwnProps;
  children: ReactNode;
  handleClickAway: () => void;
}

const PopupMenu: FC<PopupMenuType> = ({
  popperProps,
  children,
  handleClickAway,
}) => {
  return (
    <Popper
      placement="bottom-start"
      {...popperProps}
      transition
      sx={{ zIndex: 10 }}
    >
      {({ TransitionProps, placement }): ReactNode => (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper sx={{ py: 1 }}>{children}</Paper>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default PopupMenu;
