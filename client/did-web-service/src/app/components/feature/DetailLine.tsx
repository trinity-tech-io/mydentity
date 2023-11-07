import { FC, ReactNode } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ColorMap } from "@/app/theming/palette";

export const IconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: "#9D3E3E",
  color: "white",
  width: 36,
  height: 36,
  padding: 8,
}));

interface DetailLineType {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

/**
 * Component to be used with curved arrow in Create identity page
 * This component is group template of object icon, object name and description of it.
 */
const DetailLine: FC<DetailLineType> = ({
  icon,
  title,
  description,
  className = "",
}) => (
  <Box className={className} sx={{color: (theme) => ColorMap[theme.palette.mode].GREY2}}>
    <div className="inline-flex pb-1">
      <IconAvatar>{icon}</IconAvatar>
    </div>
    <Typography variant="body1" className="underline underline-offset-2">
      {title}
    </Typography>
    <Typography variant="body2">{description}</Typography>
  </Box>
);
export default DetailLine;
