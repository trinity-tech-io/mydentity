import { FC, ReactNode } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Card, CardContent, styled } from "@mui/material";
import clsx from "clsx";
import { NormalButton } from "@components/button";

const CardStyled = styled(Card)(({ theme }) => ({
  border: "1px solid #FFFFFF55",
  borderRadius: "0.5rem",
  background: "#1D1D1D",
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
const DetailContainer: FC<{
  title: string | ReactNode;
  className?: string;
  children: ReactNode;
  able2ShowAll?: boolean;
  showAllAction?: () => void;
}> = ({
  title,
  children,
  className = "",
  showAllAction = (): void => {},
  able2ShowAll = true,
}) => {
  return (
    <CardStyled className={clsx("border bord", className)} elevation={0}>
      <Box className="py-4 px-6 flex">
        <span className="flex-1 text-[20px] font-semibold">{title}</span>
        {able2ShowAll && (
          <NormalButton
            size="small"
            endIcon={<NavigateNextIcon />}
            onClick={showAllAction}
          >
            Show all
          </NormalButton>
        )}
      </Box>
      <CardContent className="relative z-10" sx={{ px: 3, pt: 1 }}>
        {children}
      </CardContent>
    </CardStyled>
  );
};

export default DetailContainer;
