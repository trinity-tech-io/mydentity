"use client";
import { FC } from "react";
import TextBarcode from "@components/text-barcode/TextBarcode";
import { SignCard } from "@components/card"

const EntryPage: FC = () => {
  return (
    <div className="text-center">
      <div className="inline-block text-left">
        <TextBarcode
          value="Hello, Ready? Sign in to continue"
          text="Hello! Ready to dive in? Sign in to continue"
          height={30}
          textClassName="tracking-[3px]"
        />
        <br />
        <TextBarcode
          value="your journey or join us"
          text="your journey or join us by signing up."
          height={30}
          textClassName="tracking-[2px]"
        />
      </div>
      <div>
        <SignCard />
      </div>
    </div>
  );
};

export default EntryPage;
