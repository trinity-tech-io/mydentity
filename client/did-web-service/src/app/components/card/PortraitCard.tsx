import { FC, ReactNode } from "react";
import { Card, styled } from "@mui/material";
import ChipIcon from "@assets/images/card/Chip.svg";

const CardStyled = styled(Card)(({ theme }) => ({
  maxWidth: 300,
  minWidth: 180,
  backgroundColor: "black",
  borderRadius: "1.5rem",
  "&:after": {
    paddingTop: "158%",
    display: "block",
    content: "''",
  },
  ".noise-bg": {
    background: "url('./Noise2.png') repeat center center",
  },
  ".body": {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    "&:before, &:after": {
      opacity: 0.2,
      content: "''",
      position: "absolute",
      width: "70%",
      height: "100%",
      background:
        "linear-gradient(to bottom, rgba(255, 255, 255, 100%), rgba(255, 255, 255, 25%), transparent)",
      transform: "rotate(-50deg)",
      zIndex: -1,
    },
    "&:before": {
      top: "-40%",
      left: 0,
    },
    "&:after": {
      top: "-20%",
      left: "-10%",
      transform: "rotate(-47deg)",
    },
    ".ellipse": {
      bottom: "20%",
      width: "100%",
      height: "42%",
      background:
        "linear-gradient(to bottom, rgba(255, 211, 187, 100%), rgba(255, 211, 187, 40%), transparent)",
      borderTopLeftRadius: "100%",
    },
  },
}));

interface PortraitCardType {
  content: ReactNode;
  footer: ReactNode;
}

const PortraitCard: FC<PortraitCardType> = (props) => {
  const { content, footer } = props;
  return (
    <CardStyled className="inline-block w-[45%] xl:w-[40%] md:w-[25%] h-full border-white border-opacity-30 border-2 rounded-3xl relative drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="body noise-bg">
        <div className="absolute opacity-20 ellipse" />
        <div className="px-4 py-6 md:px-6 md:py-8 h-full flex flex-col">
          <div className="flex pb-4 md:pb-7">
            <div className="flex-1" />
            <div className="h-6 md:h-9">
              <ChipIcon width="100%" height="100%" viewBox="0 0 50 38" />
            </div>
          </div>
          <div className="flex flex-1 pt-[10%]">
            <div className="text-left">{content}</div>
          </div>
          <div className="flex justify-center">{footer}</div>
        </div>
      </div>
    </CardStyled>
  );
};
export default PortraitCard;
