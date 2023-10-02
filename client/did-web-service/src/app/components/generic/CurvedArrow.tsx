import { FC } from "react";
import { styled } from "@mui/material";

const CurvedArrowBox = styled("div")(({ theme }) => ({
  color: "white",
  ".path": {
    strokeWidth: 6,
    fill: "none",
    strokeDasharray: 1000,
    strokeDashoffset: 1000,
    animation: "drawArrow 1500ms ease-in-out forwards",
  },
  ".arrowhead": {
    animationDelay: ".5s",
  },
  "@keyframes drawArrow": {
    "0%": {
      strokeDashoffset: 1000,
    },
    "100%": {
      strokeDashoffset: 0,
    },
  },
}));
const CurvedArrow: FC<{
  className?: string;
  svgClassName?: string;
  rotateX?: boolean;
}> = ({ className = "", svgClassName = "", rotateX = false }) => {
  return (
    <CurvedArrowBox className={className}>
      <svg
        className={svgClassName}
        width="100%"
        height="100%"
        viewBox="30 178 340 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={rotateX ? { transform: "rotateX(180deg)" } : {}}
      >
        <clipPath id="clipPath1">
          <path
            d="M28 220C200 170 330 187.285 400 220"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </clipPath>
        <clipPath id="clipPath2">
          <path
            d="M330 182C400 210 388 280 361 218C382 222 347 226 318 219"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </clipPath>
        <path
          className="path"
          clip-path="url(#clipPath1)"
          d="M35 215C180.529 180.938 320.006 187.285 361 215.530"
          stroke="currentColor"
          stroke-opacity="0.9"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          className="path arrowhead"
          clip-path="url(#clipPath2)"
          d="M335 182C362 200 368 214 361 218C361 218 347 224 320 222"
          stroke="currentColor"
          stroke-opacity="0.9"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </CurvedArrowBox>
  );
};
export default CurvedArrow;
