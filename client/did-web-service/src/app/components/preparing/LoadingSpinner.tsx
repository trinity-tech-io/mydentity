import { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const LoaderBox = styled(Box)(({ theme }) => ({
  "--dot-size": 5,
  "--speed": 1.5,
  "--radius": 10,
  "--center-size": 5,
  "--rotation": -25,
  "--ring-radius": 8,
  "--ring-thickness": 0.75,
  "--bg": "#b5b3ff",
  position: "relative",
  height: "calc(var(--dot-size) * var(--center-size) * 1px)",
  width: "calc(var(--dot-size) * var(--center-size) * 1px)",
  WebkitAnimation:
    "turn calc(var(--speed) * 20s) calc(var(--speed) * -2s) infinite linear",
  animation:
    "turn calc(var(--speed) * 20s) calc(var(--speed) * -2s) infinite linear",
  "&:before": {
    content: "''",
    position: "absolute",
    top: "50%",
    left: "50%",
    background: "var(--bg)",
    height: "100%",
    width: "100%",
    transform: "translate(-50%, -50%)",
    borderRadius: "100%",
    animation: "pulse calc(var(--speed) * 1s) infinite alternate-reverse",
  },
  ".dot": {
    height: "calc(var(--dot-size) * 1px)",
    width: "calc(var(--dot-size) * 1px)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform:
      "translate(-50%, -50%) rotate(calc((360 / 8) * var(--index) * 1deg)) translate(0, calc(var(--dot-size) * var(--radius) * 1px))",
    "&:after, &:before": {
      content: "''",
      borderRadius: "100%",
      boxSizing: "border-box",
      position: "absolute",
      background: "none",
      top: "50%",
      left: "50%",
      WebkitAnimationDuration: "calc(var(--speed) * 1s)",
      animationDuration: "calc(var(--speed) * 1s)",
      WebkitAnimationDelay:
        "calc((8 - var(--index)) * (var(--speed) / 8) * -1s)",
      animationDelay: "calc((8 - var(--index)) * (var(--speed) / 8) * -1s)",
      WebkitAnimationIterationCount: "infinite",
      animationIterationCount: "infinite",
      WebkitAnimationTimingFunction: "ease-in-out",
      animationTimingFunction: "ease-in-out",
      WebkitAnimationFillMode: "both",
      animationFillMode: "both",
      transform: "translate(-50%, -50%) scale(var(--scale))",
    },
    "&:after": {
      "--dot-size": 5,
      "--ring-thickness": 0.75,
      "--ring-radius": 8,
      "--scale": 0,
      WebkitAnimationName: "load",
      animationName: "load",
      border:
        "calc(var(--dot-size) * var(--ring-thickness) * 1px) solid var(--bg)",
      height: "calc(var(--dot-size) * var(--ring-radius) * 1px)",
      width: "calc(var(--dot-size) * var(--ring-radius) * 1px)",
    },
    "&:before": {
      "--scale": 1,
      WebkitAnimationName: "fade",
      animationName: "fade",
      background: "var(--bg)",
      height: "100%",
      width: "100%",
    },
  },
  "@-webkit-keyframes fade": {
    "0%": {
      opacity: 1,
    },
    "85%, 100%": {
      opacity: 0.2,
    },
  },
  "@keyframes fade": {
    "0%": {
      opacity: 1,
    },
    "85%, 100%": {
      opacity: 0.2,
    },
  },
  "@-webkit-keyframes load": {
    "0%": {
      transform: "translate(-50%, -50%) scale(0)",
    },
    "85%, 100%": {
      transform: "translate(-50%, -50%) scale(1)",
      opacity: 0,
    },
  },
  "@keyframes load": {
    "0%": {
      transform: "translate(-50%, -50%) scale(0)",
    },
    "85%, 100%": {
      transform: "translate(-50%, -50%) scale(1)",
      opacity: 0,
    },
  },
  "@-webkit-keyframes pulse": {
    to: {
      opacity: 0.35,
    },
  },
  "@keyframes pulse": {
    to: {
      opacity: 0.35,
    },
  },
  "@-webkit-keyframes turn": {
    to: {
      transform: "rotate(-360deg)",
    },
  },
  "@keyframes turn": {
    to: {
      transform: "rotate(-360deg)",
    },
  },
}));

const TextLoader = styled("h5")(({ theme }) => ({
  color: theme.palette.background.default,
  fontSize: 12,
  fontWeight: 500,
  transform: "translateY(80px)",
  display: "flex",
  gap: 4,
  span: {
    position: "relative",
    top: 5,
    width: 18,
    height: 18,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#b5b3ff",
    WebkitAnimation: "0.7s ease-in-out infinite alternate",
    animation: "0.7s ease-in-out infinite alternate",
    WebkitAnimationName: "loading-txt",
    animationName: "loading-txt",
    WebkitAnimationDelay: "calc(var(--offset-time) * 0.15s)",
    animationDelay: "calc(var(--offset-time) * 0.15s)",
  },
  "@keyframes loading-txt": {
    to: {
      top: 0,
    },
  },
}));
const LoadingSpinner: FC = () => {
  return (
    <Stack alignItems="center" sx={{ py: "55px", mt: { xs: 4, sm: 8 } }}>
      <LoaderBox>
        {Array(8)
          .fill(0)
          .map((_, _id) => (
            <div
              key={_id}
              className="dot"
              style={{ "--index": _id } as React.CSSProperties}
            ></div>
          ))}
      </LoaderBox>
      {/* <TextLoader>
        {["L", "O", "A", "D", "I", "N", "G"].map((l, _id) => (
          <span
            key={l}
            style={{ "--offset-time": _id + 1 } as React.CSSProperties}
          >
            {l}
          </span>
        ))}
      </TextLoader> */}
      <Typography
        variant="body2"
        sx={{ transform: "translateY(70px)", color: "#b5b3ff" }}
      >
        LOADING ...
      </Typography>
    </Stack>
  );
};

export default LoadingSpinner;
