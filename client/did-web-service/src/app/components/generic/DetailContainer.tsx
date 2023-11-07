import { FC, ReactNode } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  Card,
  CardContent,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { NormalButton } from "@components/button";
import { ColorMap } from "@/app/theming/palette";

const CardStyled = styled(Card)(({ theme }) => ({
  border: "1px solid #cacaca55",
  borderRadius: "0.5rem",
  background: ColorMap[theme.palette.mode].GREY0,
  position: "relative",
  "&:before": {
    opacity: 0.1,
    content: "''",
    position: "absolute",
    width: "100%",
    height: "200%",
    background:
      "linear-gradient(to bottom, rgba(163, 163, 163, 60%), rgba(255, 255, 255, 15%), transparent)",
    transform: "rotate(-30deg)",
    transformOrigin: "top left",
    top: 0,
    right: "-40%",
  },
}));

/**
 * Component to be used as card styled wrapper with title in several pages such as dashboard page.
 * <Show all> button can be visible or invisibe on top right position.
 */
const DetailContainer: FC<{
  title: string | ReactNode;
  className?: string;
  children: ReactNode;
  able2ShowAll?: boolean;
  topRightSection?: ReactNode;
  sx?: SxProps<Theme>;
  showAllAction?: () => void;
}> = ({
  title,
  children,
  className = "",
  able2ShowAll = true,
  topRightSection = null,
  sx = {},
  showAllAction = (): void => {},
}) => {
  return (
    <CardStyled className={className} elevation={0} sx={sx}>
      <Box
        className="flex card-header"
        sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 1.5, sm: 2 } }}
      >
        <Typography className="flex-1" variant="h6" fontWeight={600}>
          {title}
        </Typography>
        {able2ShowAll ? (
          <NormalButton
            size="small"
            endIcon={<NavigateNextIcon />}
            onClick={showAllAction}
          >
            Show all
          </NormalButton>
        ) : (
          topRightSection
        )}
      </Box>
      <Box
        className="relative z-10"
        sx={{
          px: { xs: 1.5, sm: 3 },
          pt: { xs: 0.5, sm: 1 },
          pb: { xs: 1.5, sm: 2 },
        }}
      >
        {children}
      </Box>
    </CardStyled>
  );
};

export default DetailContainer;
