"use client";
import { FC } from "react";
import { PortraitCard } from "@components/card";
import TextBarcode from "@components/text-barcode/TextBarcode";
import DarkButton from "@components/button/DarkButton";

const EntryPage: FC = () => {
  return (
    <div className="text-center">
      <div className="inline-block text-left mb-10">
        <TextBarcode
          value="Hello! Ready to dive in? Sign in to continue"
          text="Hello! Ready to dive in? Sign in to continue"
          height={30}
          textClassName="tracking-[5px] text-xl"
        />
        <br />
        <TextBarcode
          value="your journey or join us signing"
          text="your journey or join us by signing up."
          height={30}
          textClassName="tracking-[3px] text-xl"
        />
      </div>
      <div className="flex justify-center gap-1 md:gap-4">
        <PortraitCard
          content={
            <>
              <TextBarcode
                value="keeping"
                text="Gate keeping"
                textClassName="text-sm tracking-[4px]"
                height={25}
              />
              <br />
              <TextBarcode
                value="essentials"
                text="the essentials"
                textClassName="text-sm tracking-[6px]"
                height={25}
              />
            </>
          }
          footer={
            <DarkButton color="primary" className="w-3/5">
              SIGN IN
            </DarkButton>
          }
        />
        <PortraitCard
          content={
            <>
              <TextBarcode
                value="Forging"
                text="Forging your"
                textClassName="text-sm tracking-[4px]"
                height={25}
              />
              <br />
              <TextBarcode
                value="idenjourney"
                text="identity journey"
                textClassName="text-sm tracking-[6px]"
                height={25}
              />
            </>
          }
          footer={
            <DarkButton color="primary" className="w-3/5">
              SIGN UP
            </DarkButton>
          }
        />
      </div>
    </div>
  );
};

export default EntryPage;
