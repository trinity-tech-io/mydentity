import { FC } from "react";
import ChipIcon from "@assets/images/card/chip.svg";
import { PreparingContainer } from "@components/preparing/PreparingContainer";

export const PreparingRequest: FC = () => {
  return (
    <PreparingContainer
      icon={
        <ChipIcon
          className="main-icon"
          width="90%"
          height="100%"
          viewBox="0 0 50 38"
        />
      }
      preparingText="Preparing your request. Please wait for a moment..."
    />
  );
};
