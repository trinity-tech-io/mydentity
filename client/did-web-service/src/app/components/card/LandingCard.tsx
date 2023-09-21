import { FC, ReactNode } from "react";
import { Box, Divider, styled } from "@mui/material";
import ChipIcon from "@assets/images/card/Chip.svg";
import WaveLogoIcon from "@assets/images/card/WaveLogo.svg";
import CircleVector from "@assets/images/card/Circle.svg";

const CardStyled = styled(Box)(({ theme }) => ({
  borderRadius: "1.5rem",
  overflow: "hidden",
  "&:after": {
    paddingTop: "63.29%",
    display: "block",
    content: "''",
  },
  ".body": {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  ".noise-bg": {
    background: "url('./Noise1.png') repeat center center",
  },
  ".circle-bottom-box": {
    left: "38%",
    top: "63%",
    transform: "rotate(335deg)",
  },
  hr: {
    borderColor: "rgb(250 250 250 / 0.2)",
  },
}));

const LandingCard: FC<{ children?: ReactNode }> = ({children}) => {
  return (
    <CardStyled className="max-xl:w-11/12 lg:w-[450px] sm:w-8/12 inline-block bg-black border-white border-opacity-30 border-2 relative drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="body noise-bg">
        <div className="absolute w-4/6">
          <CircleVector width="100%" height="100%" viewBox="0 0 349 354" />
        </div>
        <div className="absolute w-full circle-bottom-box">
          <CircleVector width="100%" height="100%" viewBox="0 0 349 354" />
        </div>
        <div className="px-6 pt-5 pb-14 flex flex-col h-full">
          <div className="flex pb-7">
            <div className="h-6 md:h-7">
              <ChipIcon width="100%" height="100%" viewBox="0 0 50 38" />
            </div>
            <div className="flex-1" />
            <div className="h-6 md:h-7">
              <WaveLogoIcon width="100%" height="100%" viewBox="0 0 32 40" />
            </div>
          </div>
          <div className="flex flex-1 items-end">
            {children}
          </div>
          <Divider />
        </div>
      </div>
    </CardStyled>
  );
};
export default LandingCard;
