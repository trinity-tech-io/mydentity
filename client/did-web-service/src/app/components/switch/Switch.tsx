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
    backgroundColor: `#fff !important`,
    width: 24,
    height: 24,
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#3A3A3A",
    borderRadius: 40 / 2,
    border: 0,
  },
  "& .Mui-checked+.MuiSwitch-track": {
    background: "linear-gradient(270deg, #089ecd 0%, #172232 100%)",
    opacity: "1 !important",
  },
}));

export default SwitchUI;
