import { MainButton } from "@components/MainButton";
import { Typography } from "@mui/material";
import { FC } from "react";

export const IntroStep: FC<{
  goToNextStep: () => void;
}> = ({ goToNextStep }) => {
  return (
    <div className="flex flex-col gap-4 items-start">
      <Typography><b>This demo processes several things:</b></Typography>
      <ul className="demo-items-list">
        <li>Considers the user has agreed to fill the donation form, and requests user to input his tax payer information</li>
        <li>Demonstrates how to automatically create a user identity (DID) remotely, without user consent, and gets a management access token in return.</li>
        <li>Saves user name, address and UK tax payer confirmation as credentials into the new identity</li>
      </ul>
      <MainButton onClick={goToNextStep}>Start</MainButton>
    </div>
  )
}