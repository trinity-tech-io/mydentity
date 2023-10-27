import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const GradientTypography = styled(Typography)({
  backgroundImage: "linear-gradient(180deg, #FFFFFFAE, #FFFFFF)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  display: "inline",
});
export default GradientTypography;
