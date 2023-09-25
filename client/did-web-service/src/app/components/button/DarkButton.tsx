import { styled } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const DarkButton = styled(LoadingButton)(({ theme }) => ({
  background: "#323B45 !important",
  borderRadius: 4,
  padding: "8px 18px",
  color: "white",
  textTransform: "capitalize",
  "&:disabled": {
    opacity: '0.7 !important',
    backgroundColor: "#555 !important",
    color: "#fff !important",
  },
  "&:hover": {
    background: "#666e76 !important",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: 12,
    padding: "6px 14px",
  },
  ".MuiLoadingButton-loadingIndicator": {
    position: 'unset',
    color: 'white',
    visibility: 'inherit',
  }
}));

export default DarkButton;
