import { FC, ReactNode } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Button, Card, CardContent, styled } from "@mui/material";
import clsx from "clsx";

const ButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "white" : "black",
}));
const CardStyled = styled(Card)(({ theme }) => ({
  border: "2px solid #FFFFFF55",
  borderRadius: "0.5rem",
  background: "#1D1D1D",
}));
const DetailContainer: FC<{
  title: string | ReactNode;
  className?: string,
  children: ReactNode;
  showAllAction: () => void;
}> = ({ title, children, className = "", showAllAction }) => {
  return (
    <CardStyled className={clsx("border bord", className)} elevation={0}>
      <Box className="py-4 px-6 flex">
        <span className="flex-1 text-[20px] font-semibold">{title}</span>
        <ButtonStyled size="small" endIcon={<NavigateNextIcon />} onClick={showAllAction}>
          Show all
        </ButtonStyled>
      </Box>
      <CardContent sx={{px: 3, pt: 1}}>{children}</CardContent>
    </CardStyled>
  );
};

export default DetailContainer;
