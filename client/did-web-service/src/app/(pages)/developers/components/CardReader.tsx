import { FC } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const ReaderBox = styled(Box)((theme) => ({
  width: 320,
  height: 300,
  display: "flex",
  ".surface": {
    perspective: "1000px",
    fontSize: "5rem",
    borderRadius: 24,
    padding: "1.3rem",
    backgroundColor: "#0A0A0A",
    "&.top": {
      clipPath: "polygon(0% 0%, 0% 100%, 87% 100%, 87% 0%)",
      zIndex: 20,
      ".entry-left": {
        position: "absolute",
        top: "10%",
        right: "calc(13% + 2px)",
        width: "5%",
        height: "80%",
        background:
          "linear-gradient(to right, rgb(0 0 0 / 0%), rgb(0 0 0 / 20%) 20%, rgb(0 0 0 / 34%))",
      },
    },
    "&:before": {
      content: "''",
      backgroundColor: "transparent",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      opacity: 0.1,
      top: 0,
      left: 0,
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    ".entry": {
      position: "absolute",
      rotate: "y 300deg",
      transformOrigin: "0 0",
      left: "calc(87% - 2px)",
      top: "10%",
      alignItems: "center",
      textAlign: "center",
      width: "30%",
      height: "80%",
      overflow: "hidden",
      padding: "1px",
      boxShadow:
        "inset 2px 2px 1px 0 rgba(0, 0, 0, 0.2), inset -2px -2px 1px 0 rgba(80, 80, 80, 0.4)",
      background:
        "linear-gradient(to right, transparent, #2424245e 15%, #2e2e2e52 40%, #2424245e 45%, #000000)",
    },
  },
  ".surface-back": {
    padding: "1.3rem",
    "&:before": {
      content: "''",
      display: "block",
      position: "absolute",
      top: -2,
      left: -2,
      width: "calc(100% + 4px)",
      height: "calc(100% + 4px)",
      borderRadius: 24,
      boxShadow: "0 0 20px black",
      zIndex: -1,
      background:
        "radial-gradient(farthest-corner at center, #fff 0%, #ffb3ff 4%, #f3f 12.25%, #800080 31.25%, #242424 50%) bottom right / 200% 200%",
      animation: "colorChange 5s linear infinite",
      transition: "all 1s ease-in",
    },
  },
  ".surface-back-light": {
    animation: "rotate 5s linear infinite",
    transform: "rotate(135deg)",
    filter: "blur(40px)",
    "&:before": {
      content: "''",
      background: "rgb(255, 0, 179)",
      borderRadius: "50%",
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      animation: "colorChange 5s linear infinite",
      transform: "scaleY(1.4) scaleX(2.0) translateY(100%)",
      transition: "all 1s ease-in"
    }
  },
  "@keyframes bloc-reval": {
    "0%": {
      width: "20%",
      right: "100%",
    },
    "50%": {
      width: "20%",
      right: 0,
    },
    "75%": {
      width: "100%",
      right: 0,
      borderRadius: 0,
    },
    "100%": {
      width: "100%",
      right: 0,
      borderRadius: 12,
    },
  },
  "@keyframes colorChange": {
    "0%": {
      filter: "hue-rotate(0deg)",
      backgroundPosition: "bottom right",
    },
    "25%": {
      filter: "hue-rotate(90deg)",
      backgroundPosition: "bottom left",
    },
    "50%": {
      filter: "hue-rotate(180deg)",
      backgroundPosition: "top left",
    },
    "75%": {
      filter: "hue-rotate(270deg)",
      backgroundPosition: "top right",
    },
    "100%": {
      filter: "hue-rotate(360deg)",
      backgroundPosition: "bottom right",
    },
  },
  "@keyframes rotate": {
    "0%": {
      transform: "rotate(135deg)",
    },
    "100%": {
      transform: "rotate(495deg)",
    },
  },
}));
const CardReader: FC = () => {
  return (
    <ReaderBox className="relative flex items-center justify-center">
      <div className="surface-back-light absolute w-1/4 h-1/4" />
      <div className="surface-back absolute w-full h-full" />
      <div className="surface absolute w-full h-full overflow-hidden flex">
        <span className="entry" />
      </div>
      <div className="surface absolute w-full h-full overflow-hidden flex top flex-col">
        <span className="light" />
        <div className="entry-left" />
        <span className="entry" />
      </div>
    </ReaderBox>
  );
};
export default CardReader;
