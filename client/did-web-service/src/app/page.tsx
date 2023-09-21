"use client";
import { FC, MouseEventHandler } from "react";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { LandingCard } from "@components/card/LandingCard";
import TextBarcode from "@components/text-barcode/TextBarcode";
import TrinityLogo from "@assets/images/TrinityLogo.svg";

const Home: FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const launchApp: MouseEventHandler<HTMLButtonElement> = () => {
    router.push("dashboard");
  };

  return isMobile ? (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col landing-bg">
        <div className="p-8">
          <h1 className="text-white h1">
            Take back
            <br />
            control of your
          </h1>
          <TextBarcode
            value="identity"
            text="i d e n t i t y"
            outerClassName="pt-2"
            textClassName="text-lg"
          />
          <p className="text-gray-300 md:text-xl">
            In an era of increasing data breaches, decentralized credentials
            offer a robust solution for safeguarding personal information.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <LandingCard />
        </div>
        <div className="text-center p-7">
          <Button className="bg-black" variant="contained" onClick={launchApp}>
            LAUNCH APP
          </Button>
        </div>
      </div>
      <div className="bg-black p-6">
        <TextBarcode
          value="Decentralized Srv"
          text="Decentralized Identity Web Service"
          textClassName="text-xs tracking-[2px]"
          height={15}
        />
        <br />
        <TextBarcode
          value="Elastos"
          text="Powered by Elastos"
          outerClassName="pt-2"
          textClassName="text-xs tracking-[1.5px]"
          height={15}
        />
        <div className="relative">
          <TrinityLogo className="absolute bottom-0 right-0" />
        </div>
      </div>
    </main>
  ) : (
    <main className="flex min-h-screen">
      <div className="w-full md:w-2/5 bg-black pt-12 md:pt-24 px-8 flex justify-center">
        <div className="max-w-md flex flex-col">
          <div className="flex-1">
            <h1 className="text-white h1">Take back control of your</h1>
            <TextBarcode
              value="identity"
              text="i d e n t i t y"
              outerClassName="pt-2"
              textClassName="text-lg"
            />
            <p className="text-gray-300 md:text-xl">
              In an era of increasing data breaches, decentralized credentials
              offer a robust solution for safeguarding personal information.
            </p>
          </div>
          <div>
            <TextBarcode
              value="Decentralized Srv"
              text="Decentralized Identity Web Service"
              outerClassName="pt-2"
              textClassName="text-xs tracking-[2px]"
              height={15}
            />
            <br />
            <TextBarcode
              value="Elastos"
              text="Powered by Elastos"
              outerClassName="pt-2"
              textClassName="text-xs tracking-[1.5px]"
              height={15}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col landing-bg">
        <div className="text-right p-7">
          <Button
            className="flex-1 bg-black"
            variant="contained"
            onClick={launchApp}
          >
            LAUNCH APP
          </Button>
        </div>
        <div className="flex flex-1">
          <div className="flex items-center justify-center w-full">
            <LandingCard />
          </div>
        </div>
        <div className="flex justify-end p-7">
          <TrinityLogo />
        </div>
      </div>
    </main>
  );
};

export default Home;
