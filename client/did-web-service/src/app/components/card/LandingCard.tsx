import { FC, ReactNode } from "react";
import { Box, Divider, styled } from "@mui/material";
import ChipIcon from "@assets/images/card/chip.svg";
import WaveLogoIcon from "@assets/images/card/wave-logo.svg";
import CircleVector from "@assets/images/card/circle.svg";
import clsx from "clsx";

const CardStyled = styled(Box)(({ theme }) => ({
  borderRadius: "6.329% / 10%",
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
    background: "url('./noise1.png') repeat center center",
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

const LandingCard: FC<{
  className?: string;
  children?: ReactNode;
  footer?: ReactNode;
  waveIconVisible?: boolean;
  position?: string;
  dividerVisible?: boolean;
}> = ({
  className = "",
  waveIconVisible = true,
  position = "relative",
  dividerVisible = true,
  children,
  footer,
}) => {
  return (
    <CardStyled
      className={clsx(
        "inline-block border-white border-opacity-30 border-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
        className,
        position
      )}
    >
      <div className="body noise-bg">
        <div className="absolute w-4/6">
          <CircleVector width="100%" height="100%" viewBox="0 0 349 354" />
        </div>
        <div className="absolute w-full circle-bottom-box">
          <CircleVector width="100%" height="100%" viewBox="0 0 349 354" />
        </div>
        <div className="px-[5%] py-[5%] flex flex-col h-full">
          <div className="flex h-[14%] mb-7">
            <div className="h-full">
              <ChipIcon width="100%" height="100%" viewBox="0 0 50 38" />
            </div>
            <div className="flex-1" />
            {waveIconVisible && (
              <div className="h-full">
                <WaveLogoIcon width="100%" height="100%" viewBox="0 0 32 40" />
              </div>
            )}
          </div>
          <div className="flex flex-1 items-end">{children}</div>
          {dividerVisible && <Divider />}
          <div className="min-h-[12%]">{footer}</div>
        </div>
      </div>
    </CardStyled>
  );
};
export default LandingCard;
