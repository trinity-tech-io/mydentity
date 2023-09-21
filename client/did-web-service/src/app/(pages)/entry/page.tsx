"use client";
import { FC } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { PortraitCard } from "@components/card";
import TextBarcode from "@components/text-barcode/TextBarcode";
import { DarkButton } from "@components/button";
import { useRouter } from "next/navigation";

const EntryPage: FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const barcodeHeight = isMobile ? 20 : 25;

  return (
    <div className="text-center">
      <div className="inline-block text-left mb-6 md:mb-10">
        <TextBarcode
          value={
            isMobile
              ? "Yo,Ready to dive in?"
              : "Hello! Ready to dive in? Sign in to continue"
          }
          text="Hello! Ready to dive in? Sign in to continue"
          height={30}
          textClassName={
            isMobile ? "tracking-[1px] text-sm" : "tracking-[5px] text-xl"
          }
        />
        <br />
        <TextBarcode
          value={
            isMobile ? "yo journey or join" : "your journey or join us signing"
          }
          text="your journey or join us by signing up."
          height={30}
          textClassName={isMobile ? "" : "tracking-[3px] text-xl"}
        />
      </div>
      <div className="flex justify-center gap-2 md:gap-4">
        <PortraitCard
          content={
            <>
              <TextBarcode
                value={isMobile ? "keep" : "keeping"}
                text="Gate keeping"
                textClassName={
                  isMobile
                    ? "text-[10pt] tracking-[1px]"
                    : "text-sm tracking-[4px]"
                }
                height={barcodeHeight}
              />
              <br />
              <TextBarcode
                value={isMobile ? "essent" : "essentials"}
                text="the essentials"
                textClassName={
                  isMobile
                    ? "text-[10pt] tracking-[2px]"
                    : "text-sm tracking-[6px]"
                }
                height={barcodeHeight}
              />
            </>
          }
          footer={
            <DarkButton color="primary" className="w-4/5 md:w-3/5">
              SIGN IN
            </DarkButton>
          }
        />
        <PortraitCard
          content={
            <>
              <TextBarcode
                value={isMobile ? "Forg" : "Forging"}
                text="Forging your"
                textClassName={
                  isMobile
                    ? "text-[10pt] tracking-[2px]"
                    : "text-sm tracking-[4px]"
                }
                height={barcodeHeight}
              />
              <br />
              <TextBarcode
                value={isMobile ? "identy" : "idenjourney"}
                text="identity journey"
                textClassName={
                  isMobile
                    ? "text-[10pt] tracking-[2px]"
                    : "text-sm tracking-[6px]"
                }
                height={barcodeHeight}
              />
            </>
          }
          footer={
            <DarkButton
              color="primary"
              className="w-4/5 md:w-3/5"
              onClick={(): void => {
                router.push("register");
              }}
            >
              SIGN UP
            </DarkButton>
          }
        />
      </div>
    </div>
  );
};

export default EntryPage;
