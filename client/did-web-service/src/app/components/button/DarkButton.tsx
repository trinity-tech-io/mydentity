import { Button, styled } from "@mui/material";

const DarkButton = styled(Button)(({ theme }) => ({
  background: "#323B45 !important",
  borderRadius: 4,
  fontSize: 16,
  padding: "8px 18px",
  color: "white",
  "&:disabled": {
    backgroundColor: "#c0c0c0 !important",
    color: "#fff !important",
  },
  "&:hover": {
    background: "#666e76 !important",
  },
}));

export default DarkButton;
