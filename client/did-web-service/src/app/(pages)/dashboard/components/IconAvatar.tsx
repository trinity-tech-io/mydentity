import { ColorMap } from "@/app/theming/palette";
import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

const IconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: ColorMap[theme.palette.mode].GREY1,
  color: ColorMap[theme.palette.mode].GREY2,
  width: 36,
  height: 36,
  padding: 8,
}));

export default IconAvatar;
