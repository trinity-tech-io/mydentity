import { FC } from "react";
import clsx from "clsx";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChipIcon from "@assets/images/card/chip.svg";

const LoadingRing = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: 32,
  width: 150,
  height: 150,
  background: "transparent",
  border: "3px solid #3c3c3c",
  borderRadius: "50%",
  textAlign: "center",
  lineHeight: 150,
  color: "#fff000",
  textShadow: "0 0 10px #fff000",
  boxShadow: "0 0 20px rgba(0,0,0,.5)",
  "&:before": {
    content: "''",
    position: "absolute",
    top: -3,
    left: -3,
    width: "calc(100% + 6px)",
    height: "calc(100% + 6px)",
    border: "3px solid transparent",
    borderTop: "3px solid #fff000",
    borderRight: "3px solid #fff000",
    borderRadius: "50%",
    animation: "rotate 2s linear infinite",
  },
  "span.bubble": {
    display: "block",
    position: "absolute",
    top: "calc(50% - 2px)",
    left: "50%",
    width: "50%",
    height: 4,
    background: "transparent",
    transformOrigin: "left",
    animation: "rotate 2s linear infinite",
    rotate: "45deg",
    "&:before": {
      content: "''",
      position: "absolute",
      width: 16,
      height: 16,
      borderRadius: "50%",
      background: "#fff000",
      top: -6,
      right: -8,
      boxShadow: "0 0 20px #fff000",
    },
  },
  "@keyframes rotate": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));
export const PreparingRequest: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <LoadingRing>
        <ChipIcon width="100%" height="100%" viewBox="0 0 50 38" />
        <span className="bubble"></span>
      </LoadingRing>
      <Typography variant="body1" textAlign="center">
        Preparing your request. Please wait for a moment...
      </Typography>
    </Stack>
  );
};
