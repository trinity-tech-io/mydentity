import { Popper } from "@mui/material";
import { styled } from "@mui/material/styles";

const ArrowPopper = styled(Popper)(({ theme }) => ({
  zIndex: 100,
  ".paper": {
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      width: 10,
      height: 10,
      backgroundColor: "inherit",
      backgroundImage: "inherit",
      transform: "rotate(45deg)",
      transformOrigin: "left bottom",
      boxShadow: "2px 2px 3px 0px rgba(0,0,0,0.1)",
    },
  },
  "&[data-popper-placement*='top'] .paper": {
    "&:before": {
      bottom: 0,
      left: 10,
    },
  },
  "&[data-popper-placement*='bottom'] .paper": {
    "&:before": {
      top: 0,
      left: 10,
      transformOrigin: "right top",
      boxShadow: "-2px -2px 3px 0px rgba(0,0,0,0.1)",
    },
  },
  "&[data-popper-placement*='right'] .paper": {
    "&:before": {
      top: 10,
      left: 0,
      transformOrigin: "left top",
      boxShadow: "-2px 2px 3px 0px rgba(0,0,0,0.1)",
    },
  },
}));

export default ArrowPopper;
