import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const NormalButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "white" : "black",
}));

export default NormalButton