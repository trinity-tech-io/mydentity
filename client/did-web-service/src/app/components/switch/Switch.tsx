import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

const SwitchUI = styled(Switch)(({ theme }) => ({
  width: 52,
  height: 32,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 4,
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#202020" : "currentColor",
    width: 24,
    height: 24,
  },
  "& .Mui-checked .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#7a3cff",
  },
  "& .MuiSwitch-track": {
    // opacity: 1,
    // backgroundColor: "#3A3A3A",
    borderRadius: 40 / 2,
    border: 0,
  },
  "& .Mui-checked+.MuiSwitch-track": {
    background: theme.palette.mode === "dark" ? "#fff" : "#bb9bff",
    // opacity: "1 !important",
  },
}));

export default SwitchUI;
