import { Button, styled } from "@mui/material";

const NormalButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "white" : "black",
}));

export default NormalButton