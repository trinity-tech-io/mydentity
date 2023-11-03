import { useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { FC } from "react";

const UpdatingSpinnerBox = styled("div")(({ theme }) => ({
  color: "#fff",
  overflow: "hidden",
  width: "1em",
  height: "1em",
  borderRadius: "50%",
  position: "relative",
  WebkitTransform: "translateZ(0)",
  transform: "translateZ(0)",
  WebkitAnimation: "load6 1.7s infinite ease, round 1.7s infinite ease",
  animation: "load6 1.7s infinite ease, round 1.7s infinite ease",
  "@-webkit-keyframes load6": {
    "0%": {
      boxShadow:
        "0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em",
    },
    "5%, 95%": {
      boxShadow:
        "0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em",
    },
    "10%, 59%": {
      boxShadow:
        "0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em",
    },
    "20%": {
      boxShadow:
        "0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em",
    },
    "38%": {
      boxShadow:
        "0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em",
    },
    "100%": {
      boxShadow:
        "0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em",
    },
  },
  "@keyframes load6": {
    "0%": {
      boxShadow:
        "0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em",
    },
    "5%, 95%": {
      boxShadow:
        "0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em",
    },
    "10%, 59%": {
      boxShadow:
        "0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em",
    },
    "20%": {
      boxShadow:
        "0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em",
    },
    "38%": {
      boxShadow:
        "0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em",
    },
    "100%": {
      boxShadow:
        "0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em",
    },
  },
  "@-webkit-keyframes round": {
    "0%": {
      WebkitTransform: "rotate(0deg)",
      transform: "rotate(0deg)",
    },
    "100%": {
      WebkitTransform: "rotate(360deg)",
      transform: "rotate(360deg)",
    },
  },
  "@keyframes round": {
    "0%": {
      WebkitTransform: "rotate(0deg)",
      transform: "rotate(0deg)",
    },
    "100%": {
      WebkitTransform: "rotate(360deg)",
      transform: "rotate(360deg)",
    },
  },
}));

const UpdatingSpinner: FC<{ size: number }> = ({ size }) => {
  const theme = useTheme();
  const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const widthRate = (lessThanSmall && 0.75) || (smallToMid && 0.9) || 1;
  return <UpdatingSpinnerBox sx={{ fontSize: size * widthRate }} />;
};

export default UpdatingSpinner;
