import { FC, MouseEventHandler, ReactNode, useRef, useState } from "react";
import {
  Button,
  ClickAwayListener,
  Fade,
  MenuItem,
  Paper,
  Popper,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const SelectBox: FC<{
  list: string[];
  defaultValue?: number;
  valuePrefix?: string;
  onChange?: (value: string) => void;
}> = ({
  list,
  defaultValue = 0,
  valuePrefix = "",
  onChange = (_: string): void => {},
}) => {
  const [openPopper, setOpenPopper] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(defaultValue);
  const menuEl = useRef(null);

  const handleClick: MouseEventHandler<HTMLLIElement> = (e): void => {
    setCurrentIndex(e.currentTarget.value);
    onChange(`${valuePrefix}${e.currentTarget.value}`);
    setOpenPopper(false);
  };

  return (
    <>
      <Button
        ref={menuEl}
        variant="outlined"
        className="opacity-80"
        endIcon={openPopper ? <ExpandLess /> : <ExpandMore />}
        color="inherit"
        sx={{
          transition: "opacity .1s ease-out",
          "&:hover": { opacity: 1 },
          borderRadius: 2,
        }}
        onClick={(): void => {
          setOpenPopper(!openPopper);
        }}
      >
        {list[currentIndex]}
      </Button>
      <Popper
        open={openPopper}
        anchorEl={menuEl.current}
        placement="bottom-start"
        transition
      >
        {({ TransitionProps, placement }): ReactNode => (
          <ClickAwayListener
            onClickAway={(): void => {
              setOpenPopper(false);
            }}
          >
            <Fade
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper sx={{ py: 1 }}>
                {list.map((item, _id) => (
                  <MenuItem key={_id} value={_id} onClick={handleClick}>
                    {item}
                  </MenuItem>
                ))}
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};
export default SelectBox;
