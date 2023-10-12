import { FC, MouseEventHandler, ReactNode } from "react";
import { Box, Divider, styled } from "@mui/material";
import clsx from "clsx";
import ChipIcon from "@assets/images/card/chip.svg";
import WaveLogoIcon from "@assets/images/card/wave-logo.svg";
import CircleVector from "@assets/images/card/circle.svg";
import { BaseButton } from "@components/button";

const CardStyled = styled(Box)(({ theme }) => ({
  borderRadius: "6.329% / 10%",
  boxShadow: "inset 0 0 0 1.5px #FFFFFF4C",
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
    background: "url('/noise1.png') repeat center center",
  },
  ".circle-bottom-box": {
    left: "37%",
    top: "62%",
    transform: "rotate(335deg)",
  },
  hr: {
    borderColor: "rgb(250 250 250 / 0.2)",
  },
}));

const LandingCard: FC<{
  className?: string;
  children?: ReactNode;
  topRightSection?: ReactNode;
  footer?: ReactNode;
  waveIconVisible?: boolean;
  position?: string;
  dividerVisible?: boolean;
  chipClickable?: boolean;
  handleClickChip?: MouseEventHandler<HTMLButtonElement>;
}> = ({
  className = "",
  waveIconVisible = true,
  position = "relative",
  dividerVisible = true,
  topRightSection = null,
  chipClickable = false,
  handleClickChip = (e) => {},
  children,
  footer,
}) => {
  return (
    <CardStyled
      className={clsx(
        "inline-block drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
        className,
        position
      )}
    >
      <div className="body noise-bg px-[5%] py-[5%]">
        <div className="absolute w-4/6 top-[1.5px] left-[1.5px]">
          <CircleVector width="100%" height="100%" viewBox="0 0 349 354" />
        </div>
        <div className="absolute w-full circle-bottom-box">
          <CircleVector width="100%" height="100%" viewBox="0 0 349 354" />
        </div>
        <div className=" flex flex-col h-full">
          <div className="flex h-[14%] mb-7">
            {chipClickable ? (
              <BaseButton onClick={handleClickChip}>
                <div className="h-full chip-item">
                  <ChipIcon width="100%" height="100%" viewBox="0 0 50 38" />
                </div>
              </BaseButton>
            ) : (
              <div className="h-full chip-item">
                <ChipIcon width="100%" height="100%" viewBox="0 0 50 38" />
              </div>
            )}
            <div className="flex-1" />
            {waveIconVisible ? (
              <div className="h-full">
                <WaveLogoIcon width="100%" height="100%" viewBox="0 0 32 40" />
              </div>
            ) : (
              topRightSection
            )}
          </div>
          <div className="flex flex-1 items-end">{children}</div>
          {dividerVisible && <Divider />}
          <div className="h-[15%] flex items-end">{footer}</div>
        </div>
      </div>
    </CardStyled>
  );
};
export default LandingCard;
