"use client";
import { FC, MouseEventHandler, useCallback } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
// import { useRouter } from "next/navigation";
import { useRouter } from 'next13-progressbar';
import { LandingCard } from "@components/card";
import TextBarcode from "@components/text-barcode/TextBarcode";
import { BlackButton } from "@components/button";
import TrinityLogo from "@assets/images/TrinityLogo.svg";
import { authUser$, getActiveUser } from "@services/user/user.events";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";

const WelcomeCard: FC = () => (
  <LandingCard className="max-xl:w-11/12 lg:w-[450px] sm:w-8/12 bg-black">
    <div>
      <TextBarcode
        value="Welcome to future"
        text="Welcome to the future"
        textClassName="text-sm tracking-[7px]"
        height={22}
      />
      <br />
      <TextBarcode
        value="identity"
        text="of identity"
        textClassName="text-sm tracking-[9px]"
        height={22}
      />
    </div>
  </LandingCard>
);

const Home: FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [authUser] = useBehaviorSubject(authUser$);
  const user = getActiveUser();
  const launchApp: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    router.push(user ? "dashboard" : "entry");
  }, [authUser]);

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
          <WelcomeCard />
        </div>
        <div className="text-center p-7">
          <BlackButton variant="contained" onClick={launchApp}>
            LAUNCH APP
          </BlackButton>
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
          <BlackButton
            id="launch-app"
            className="flex-1"
            variant="contained"
            onClick={launchApp}
          >
            LAUNCH APP
          </BlackButton>
        </div>
        <div className="flex flex-1">
          <div className="flex items-center justify-center w-full">
            <WelcomeCard />
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
