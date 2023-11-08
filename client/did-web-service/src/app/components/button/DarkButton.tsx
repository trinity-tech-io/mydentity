import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

const DarkButton = styled(LoadingButton)(({ theme, className }) => ({
  background: theme.palette.mode === "dark" ? "#323B45" : "#7a3cff",
  borderRadius: className?.includes("rounded") ? 8 : 4,
  color: "white",
  textTransform: "uppercase",
  paddingLeft: 12,
  paddingRight: 12,
  "&:disabled": {
    opacity: "0.8",
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgb(120 120 120 / 44%)"
        : "rgba(0, 0, 0, 0.12)",
    color: theme.palette.mode === "dark" ? "#fff" : "rgb(0 0 0 / 26%)",
  },
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#242b32" : "#612bd5",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "6px 14px",
  },
  ".MuiLoadingButton-loadingIndicator": {
    position: "unset",
    color: "white",
    visibility: "inherit",
  },
}));

export default DarkButton;
