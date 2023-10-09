import { FC } from "react";
import SecurityIcon from "@mui/icons-material/Security";

const SecurityStatusIcon: FC<{ turnedOn: boolean; width?: number }> = ({
  turnedOn,
  width = 24,
}) => (
  <SecurityIcon width={width} sx={{ color: turnedOn ? "#34A853" : "#EA4335" }} />
);
export default SecurityStatusIcon;
