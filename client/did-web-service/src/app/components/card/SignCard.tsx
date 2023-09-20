import { FC } from "react";
import { Button, Card } from "@mui/material";
import { styled } from '@mui/system';
import ChipIcon from "@assets/images/card/Chip.svg";
import TextBarcode from "@components/text-barcode/TextBarcode";
import "./style.css";
import DarkButton from "@components/button/DarkButton";

const CardStyled = styled(Card)(({ theme }) => ({
  "&:after": {
    paddingTop: "158%",
    display: "block",
    content: "''",
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
      position: 'absolute',
      width: '70%',
      height: '100%',
      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 100%), rgba(255, 255, 255, 25%), transparent)',
      transform: 'rotate(-50deg)',
      zIndex: -1,
    },
    "&:before": {
      top: '-40%',
      left: 0,
    },
    "&:after": {
      top: '-20%',
      left: '-10%',
      transform: 'rotate(-47deg)',
    }
  },
}));

const SignCard: FC = () => {
  return (
    <CardStyled className="inline-block w-[450px] bg-black border-white border-opacity-30 border-2 rounded-3xl relative drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="body noise2-bg">
        <div className="absolute" style={
            {
              opacity: 0.2,
              bottom: '20%',
              width: '100%',
              height: '42%',
              background: 'linear-gradient(to bottom, rgba(255, 211, 187, 100%), rgba(255, 211, 187, 40%), transparent)',
              borderTopLeftRadius: '100%'
            }
          } />
        <div className="px-6 py-8 h-full flex flex-col">
          <div className="flex pb-7">
            <div className="flex-1" />
            <div className="h-9">
              <ChipIcon width="100%" height="100%" viewBox="0 0 50 38" />
            </div>
          </div>
          <div className="text-left m-auto ml-0 pb-32">
            <TextBarcode
              value="Forging"
              text="Forging your"
              textClassName="text-sm tracking-[4px]"
              height={22}
            />
            <br />
            <TextBarcode
              value="idenjourney"
              text="identity journey"
              textClassName="text-sm tracking-[6px]"
              height={22}
            />
          </div>
          <div className="flex justify-center">
            <DarkButton color="primary" className="w-3/5">SIGN IN</DarkButton>
          </div>
        </div>
      </div>
    </CardStyled>
  );
};
export default SignCard;
