"use client";
import { FC } from "react";
import { Box, Card, useMediaQuery, useTheme, styled } from "@mui/material";
import TextBarcode from "@components/text-barcode/TextBarcode";
import { BlackButton } from "@components/button";

const CardCase = styled(Card)(({ theme }) => ({
  minWidth: 180,
  backgroundColor: "black",
  borderRadius: "1.5rem",
  "&:after": {
    paddingTop: "73%",
    display: "block",
    content: "''",
  },
  ".dashed-body": {
    border: '2px dashed rgb(50 38 38)'
  }
}))

const EntryPage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className="text-center">
      <div className="inline-block text-left mb-6 md:mb-10">
        <TextBarcode
          value={
            isMobile
              ? "personalize card holder"
              : "Let's personalize this virtual card holder"
          }
          text="Let's personalize this virtual card holder with your"
          height={30}
          textClassName={
            isMobile ? "tracking-[1px] text-sm" : "tracking-[3px] text-xl"
          }
        />
        <br />
        <TextBarcode
          value={
            isMobile ? "preferred nickname" : "preferred nickname as an account"
          }
          text="preferred nickname as an account name."
          height={30}
          textClassName={isMobile ? "" : "tracking-[3px] text-xl"}
        />
      </div>
      <div className="flex justify-center">
        <CardCase className="w-4/5 max-w-md p-2">
          <div className="dashed-body w-full h-full rounded-2xl">

          </div>
        </CardCase>
      </div>
    </div>
  );
};

export default EntryPage;
