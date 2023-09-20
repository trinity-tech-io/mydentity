import { FC } from "react";
import { Card, Divider } from '@mui/material';
import Barcode from 'react-barcode'
import ChipIcon from '@assets/images/card/Chip.svg';
import WaveLogoIcon from '@assets/images/card/WaveLogo.svg';
import CircleVector from '@assets/images/card/Circle.svg';
import TextBarcode from "@components/text-barcode/TextBarcode";

export const LandingCard: FC = () => {
  const BarCodeOptions = {
    displayValue: false,
    margin: 0,
    background: '#ffffffff00',
    lineColor: '#ffffff',
    height: 35,
    width: 1.3
  }

  return (
    <Card className="lg:w-[450px] sm:w-8/12 bg-black noise-bg border-white border-opacity-30 border-2 rounded-3xl relative bg-color">
      <div className="absolute w-4/6">
        <CircleVector width='100%' height='100%' viewBox="0 0 349 354"/>
      </div>
      <div className="absolute w-full circle-bottom-box">
        <CircleVector width='100%' height='100%' viewBox="0 0 349 354"/>
      </div>
      <div className="px-6 pt-5 pb-14">
        <div className="flex">
          <div className="h-7">
            <ChipIcon width='100%' height='100%' viewBox="0 0 50 38"/>
          </div>
          <div className="flex-1" />
          <div className="h-7">
            <WaveLogoIcon width='100%' height='100%' viewBox="0 0 32 40"/>
          </div>
        </div>
        <div className="w-full">
          <TextBarcode
            value="Welcome to future"
            text="Welcome to the future"
            outerClassName="pt-10"
            textClassName="text-sm tracking-[7px]"
            height={22}
          />
        </div>
        <TextBarcode
          value="identity"
          text="of identity"
          textClassName="text-sm tracking-[9px]"
          height={22}
        />
        <Divider className='border-neutral-50 border-opacity-20 pt-1'/>
      </div>
    </Card>
  )
}