"use client";
import { FC, MouseEventHandler } from "react";
import Barcode from "react-barcode";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { LandingCard } from "@components/card/LandingCard";
import TrinityLogo from "@assets/images/TrinityLogo.svg";

const Home: FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const BarCodeOptions = {
    displayValue: false,
    margin: 0,
    background: "#ffffffff00",
    lineColor: "#ffffff",
    height: 35,
    width: 1.3,
  };
  const launchApp: MouseEventHandler<HTMLButtonElement> = () => {
    router.push("dashboard");
  };

  return (
    isMobile ? (
      <main className="flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col landing-bg">
          <div className="p-8">
            <h1 className="text-white h1">Take back<br/>control of your</h1>
            <div className="inline-flex flex-col pt-2">
              <Barcode value="identity" {...BarCodeOptions} />
              <h5 className="text-white h5 stretch text-lg">i d e n t i t y</h5>
            </div>
            <p className="text-gray-300 md:text-xl">
              In an era of increasing data breaches, decentralized credentials
              offer a robust solution for safeguarding personal information.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <LandingCard />
          </div>
          <div className="text-center p-7">
            <Button
              className="bg-black"
              variant="contained"
              onClick={launchApp}
            >
              LAUNCH APP
            </Button>
          </div>
        </div>
        <div className="bg-black p-6">
          <div className="inline-flex flex-col">
            <Barcode
              value="Decentralized Srv"
              {...BarCodeOptions}
              height={15}
            />
            <p className="text-white stretch text-xs tracking-[2px]">
              Decentralized Identity Web Service
            </p>
          </div>
          <br/>
          <div>
            <div className="inline-flex flex-col pt-2">
              <Barcode value="Elastos" {...BarCodeOptions} height={15} />
              <p className="text-white stretch text-xs tracking-[1.5px]">
                Powered by Elastos
              </p>
            </div>
          </div>
          <div className="relative">
            <TrinityLogo className="absolute bottom-0 right-0"/>
          </div>
        </div>
      </main>
    ) : (
      <main className="flex min-h-screen">
        <div className="w-full md:w-2/5 bg-black pt-12 md:pt-24 px-8 flex justify-center">
          <div className="max-w-md flex flex-col">
            <div className="flex-1">
              <h1 className="text-white h1">Take back control of your</h1>
              <div className="inline-flex flex-col pt-2">
                <Barcode value="identity" {...BarCodeOptions} />
                <h5 className="text-white h5 stretch text-lg">i d e n t i t y</h5>
              </div>
              <p className="text-gray-300 md:text-xl">
                In an era of increasing data breaches, decentralized credentials
                offer a robust solution for safeguarding personal information.
              </p>
            </div>
            <div>
              <div className="inline-flex flex-col pt-2">
                <Barcode
                  value="Decentralized Srv"
                  {...BarCodeOptions}
                  height={15}
                />
                <p className="text-white stretch text-xs tracking-[2px]">
                  Decentralized Identity Web Service
                </p>
              </div>
              <br/>
              <div>
                <div className="inline-flex flex-col pt-2">
                  <Barcode value="Elastos" {...BarCodeOptions} height={15} />
                  <p className="text-white stretch text-xs tracking-[1.5px]">
                    Powered by Elastos
                  </p>
                </div>
              </div>
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
    )
  );
};

export default Home;
