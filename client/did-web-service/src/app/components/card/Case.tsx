import { Box, Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CaseWrapper = styled(Box)(({ theme }) => ({
  minWidth: 180,
  perspective: 600,
  borderRadius: "1.5rem",
  "&:after": {
    paddingTop: "73%",
    display: "block",
    content: "''",
  },
  ".card": {
    position: "relative",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    transformStyle: "preserve-3d",
    transformOrigin: "center right",
    transition: "transform 0.5s",
    ".card-face": {
      position: "absolute",
      width: "100%",
      height: "100%",
      backfaceVisibility: "hidden",
    },
    ".back": {
      transform: "rotateY(180deg)",
    },
  },
  ".card.is-flipped": {
    transform: "translateX(-100%) rotateY(-180deg)",
  },
}));

export const CardCase = styled(Card)(({ theme }) => ({
  minWidth: 180,
  cursor: "initial",
  backgroundImage: "url('/dark-leather.png')",
  backgroundColor: "black",
  borderRadius: "1.5rem",
  overflow: "visible",
  "&:after": {
    paddingTop: "73%",
    display: "block",
    content: "''",
  },
  ".dashed-body": {
    border: "2px dashed rgb(50 38 38)",
  },
  ".compartment, .compartment-top": {
    backgroundImage: "url('/dark-leather.png')",
    backgroundColor: "black",
    width: "100%",
  },
  ".compartment-top": {
    height: "18%",
    "--mask1":
      "radial-gradient(circle at 50% -20%, transparent 25%, black 25.5%)",
    WebkitMaskImage: "var(--mask1)",
    maskImage: "var(--mask1)",
  },
  "@keyframes fadeOut": {
    "0%": {
      visibility: "visible",
    },
    "55%": {
      visibility: "visible",
    },
    "56%, 100%": {
      visibility: "hidden",
    },
  },
  ".fade-out": {
    animation: `fadeOut 1s ${theme.transitions.easing.easeInOut} forwards`,
    MsAnimation: `fadeOut 1s ${theme.transitions.easing.easeInOut} forwards`,
    WebkitAnimation: `fadeOut 1s ${theme.transitions.easing.easeInOut} forwards`,
    MozAnimation: `fadeOut 1s ${theme.transitions.easing.easeInOut} forwards`,
  },
}));
