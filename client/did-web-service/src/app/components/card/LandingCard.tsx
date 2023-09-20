import { FC } from "react";
import { Card, Divider, Grid } from "@mui/material";
import ChipIcon from "@assets/images/card/Chip.svg";
import WaveLogoIcon from "@assets/images/card/WaveLogo.svg";
import CircleVector from "@assets/images/card/Circle.svg";
import TextBarcode from "@components/text-barcode/TextBarcode";
import "./style.css";

export const LandingCard: FC = () => {
  return (
    <Card className="card-wrapper max-xl:w-11/12 lg:w-[450px] sm:w-8/12 bg-black border-white border-opacity-30 border-2 rounded-3xl relative drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="body noise1-bg">
        <div className="absolute w-4/6">
          <CircleVector width="100%" height="100%" viewBox="0 0 349 354" />
        </div>
        <div className="absolute w-full circle-bottom-box">
          <CircleVector width="100%" height="100%" viewBox="0 0 349 354" />
        </div>
        <div className="px-6 pt-5 pb-14">
          <Grid container spacing={{ xl: 0.5, sm: 0.8, md: 1 }}>
            <Grid item xs={12}>
              <div className="flex pb-7">
                <div className="h-6 md:h-7">
                  <ChipIcon width="100%" height="100%" viewBox="0 0 50 38" />
                </div>
                <div className="flex-1" />
                <div className="h-6 md:h-7">
                  <WaveLogoIcon
                    width="100%"
                    height="100%"
                    viewBox="0 0 32 40"
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextBarcode
                value="Welcome to future"
                text="Welcome to the future"
                textClassName="text-sm tracking-[7px]"
                height={22}
              />
            </Grid>
            <Grid item xs={12}>
              <TextBarcode
                value="identity"
                text="of identity"
                textClassName="text-sm tracking-[9px]"
                height={22}
              />
            </Grid>
          </Grid>
          <Divider className="border-neutral-50 border-opacity-20" />
        </div>
      </div>
    </Card>
  );
};
