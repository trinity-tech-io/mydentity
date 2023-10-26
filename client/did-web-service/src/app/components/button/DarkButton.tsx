import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

const DarkButton = styled(LoadingButton)(({ theme, className }) => ({
  background: "#323B45 !important",
  borderRadius: className?.includes("rounded") ? 8 : 4,
  color: "white",
  textTransform: "capitalize",
  paddingLeft: 12,
  paddingRight: 12,
  "&:disabled": {
    opacity: "0.7 !important",
    backgroundColor: "#555 !important",
    color: "#fff !important",
  },
  "&:hover": {
    background: "#666e76 !important",
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
