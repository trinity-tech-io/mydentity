"use client";
import { FC } from "react";
import SecurityIcon from "@mui/icons-material/Security";
import { Card, styled } from "@mui/material";
import PasskeyBind from "./components/PasskeyBind";
import Headline from "@components/layout/Headline";
import EllipseBg from "@components/layout/EllipseBg";
import W3Icon from "@assets/images/www-circle.svg";
import DetailLine from "@components/feature/DetailLine";
import CurvedArrow from "@components/generic/CurvedArrow";

const IPadStyled = styled(Card)(({ theme }) => ({
  maxWidth: 300,
  minWidth: 180,
  backgroundColor: "#1E1E1F",
  borderRadius: "0.8rem",
  "&:after": {
    paddingTop: "130%",
    display: "block",
    content: "''",
  },
  ".body": {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    padding: "4%",
    ".camera": {
      height: "calc(4%*10/13)",
      div: {
        background: "#444445",
        "&:after": {
          paddingTop: "100%",
          display: "block",
          content: "''",
        },
      },
    },
    ".screen": {
      borderRadius: "0.4rem",
      background: "url('../../device-bg.png') repeat center center / cover",
    },
  },
}));
const MacBookStyled = styled(Card)(({ theme }) => ({
  maxWidth: 300,
  minWidth: 200,
  backgroundColor: "#1E1E1F",
  borderRadius: "0.2rem",
  "&:after": {
    paddingTop: "68%",
    display: "block",
    content: "''",
  },
  ".body": {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    paddingTop: "4%",
    ".topbar": {
      paddingLeft: "3%",
      height: "calc(4%*10/6.8)",
      div: {
        "&:after": {
          paddingTop: "100%",
          display: "block",
          content: "''",
        },
      },
    },
    ".screen": {
      background: "url('../../device-bg.png') repeat center center / cover",
    },
  },
}));
const MobileStyled = styled(Card)(({ theme }) => ({
  maxWidth: 100,
  minWidth: 60,
  backgroundColor: "#1E1E1F",
  borderRadius: "0.6rem",
  "&:after": {
    paddingTop: "217%",
    display: "block",
    content: "''",
  },
  ".body": {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    padding: "3%",
    ".camera": {
      div: {
        background: "#1E1E1F",
        "&:after": {
          paddingTop: "100%",
          display: "block",
          content: "''",
        },
      },
    },
    ".screen": {
      borderRadius: "0.5rem",
      background: "url('../../device-bg.png') repeat center center / cover",
    },
  },
}));
const BindPassKey: FC = () => {
  return (
    <>
      <Headline
        title="Bind your account with current browser"
        description={
          <>
            Bind your current browser. This doesn't require to provide any email
            or password,{" "}
            <span className="text-red-600">
              but access to your identity will be lost if you don't bind
              multiple devices as recovery.
            </span>
          </>
        }
      />
      <div className="w-full flex flex-col items-center justify-center py-[6%]">
        <div className="flex">
          <div className="px-[8%]">
            <IPadStyled className="inline-block rounded-3xl relative">
              <div className="body">
                <div className="camera w-full absolute right-0 top-0 flex items-center justify-center">
                  <div className="w-[1.7%] rounded-full"></div>
                </div>
                <div className="screen h-full" />
              </div>
            </IPadStyled>
          </div>
          <div className="relative flex items-center max-w-2xl">
            <DetailLine
              icon={<SecurityIcon fontSize="small" />}
              title="ENHANCE YOUR SECURITY"
              description="Increase your chances of recovery in case one of your devices is
                compromised by binding additional devices like your mobile phone,
                tablet, and laptop."
            />
            <CurvedArrow className="absolute w-2/3 top-[-2rem] left-1/2 translate-x-[-50%] translate-y-[-100%]"/>
            <CurvedArrow className="absolute w-2/3 bottom-[-5rem] right-[-10rem] translate-y-full" svgClassName="rotate-[160deg]"/>
            <CurvedArrow className="absolute w-2/3 bottom-[-5rem] left-[-10rem] translate-y-full" svgClassName="rotate-[200deg]"/>
          </div>
          <div className="px-[8%] flex items-center">
            <MacBookStyled className="inline-block rounded-3xl relative">
              <div className="body">
                <div className="topbar w-full absolute right-0 top-0 flex items-center gap-0.5">
                  <div className="w-[1.7%] bg-[#F3605C] rounded-full"></div>
                  <div className="w-[1.7%] bg-[#F8BE39] rounded-full"></div>
                  <div className="w-[1.7%] bg-[#50C845] rounded-full"></div>
                </div>
                <div className="screen h-full" />
              </div>
            </MacBookStyled>
          </div>
        </div>
        <div className="flex items-center my-[5%]">
          <MobileStyled className="inline-block rounded-3xl relative">
            <div className="body">
              <div className="relative">
                <div className="camera w-full absolute right-0 top-1 flex items-center justify-center">
                  <div className="w-[5%] rounded-full"></div>
                </div>
              </div>
              <div className="screen h-full" />
            </div>
          </MobileStyled>
        </div>
        <PasskeyBind />
      </div>
      <div className="absolute w-full md:w-2/3 h-[65%] bottom-0 right-0 overflow-hidden z-[-1]">
        <EllipseBg className="opacity-[0.15] h-full" />
        <div className="absolute w-1/3 right-[-7%] bottom-[-7%] opacity-30">
          <W3Icon />
        </div>
      </div>
    </>
  );
};

export default BindPassKey;
