import { Button, styled } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

const BlackButton = styled(LoadingButton)(({ theme }) => ({
  background: "#000 !important",
  borderRadius: 4,
  padding: "8px 18px",
  color: "white",
  "&:disabled": {
    opacity: '0.7 !important',
    backgroundColor: "#343434 !important",
    color: "#fff !important",
  },
  "&:hover": {
    background: "#222 !important",
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 12,
    padding: "6px 14px",
  },
  ".MuiLoadingButton-loadingIndicator": {
    position: 'unset',
    color: 'white',
    visibility: 'inherit'
  }
}));

export default BlackButton;
