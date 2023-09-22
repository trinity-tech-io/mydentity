import { Button, styled } from "@mui/material";

const BlackButton = styled(Button)(({ theme }) => ({
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
}));

export default BlackButton;
