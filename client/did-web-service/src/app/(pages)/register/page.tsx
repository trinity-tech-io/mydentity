"use client";
import React, { FC, useRef, useState } from "react";
import clsx from "clsx";
// import Xarrow from "react-xarrows";
import { Card, useMediaQuery, useTheme, styled, FormControl, Input, InputAdornment, Fade, Box } from "@mui/material";
import TextBarcode from "@components/text-barcode/TextBarcode";
import { BlackButton } from "@components/button";
import { LandingCard } from "@components/card";

const CaseWrapper = styled(Box)(({ theme }) => ({
  minWidth: 180,
  perspective: 600,
  borderRadius: "1.5rem",
  "&:after": {
    paddingTop: "73%",
    display: "block",
    content: "''",
  },
  ".card": {
    position: "relative",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    transformStyle: "preserve-3d",
    transformOrigin: "center right",
    transition: "transform 0.5s",
    ".card-face": {
      position: "absolute",
      width: "100%",
      height: "100%",
      backfaceVisibility: "hidden",
    },
    ".back": {
      transform: "rotateY(180deg)",
    },
  },
  ".card.is-flipped": {
    transform: "translateX(-100%) rotateY(-180deg)",
  },
}));

const CardCase = styled(Card)(({ theme }) => ({
  minWidth: 180,
  backgroundImage: "url('./dark-leather.png')",
  backgroundColor: "black",
  borderRadius: "1.5rem",
  "&:after": {
    paddingTop: "73%",
    display: "block",
    content: "''",
  },
  ".dashed-body": {
    border: "2px dashed rgb(50 38 38)",
  },
  ".compartment": {
    backgroundImage: "url('./dark-leather.png')",
    backgroundColor: "black",
    width: "100%",
    height: "33%",
    "--mask1":
      "radial-gradient(circle at 50% -20%, transparent 25%, black 25.5%)",
    WebkitMaskImage: "var(--mask1)",
    maskImage: "var(--mask1)",
  },
}));

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  ".MuiInput-root, .MuiInput-root:hover": {
    marginTop: 0,
    "&:before, &:after": {
      opacity: 0.18,
      borderColor: "white !important",
    },
  },
  ".MuiInput-root.Mui-focused": {
    "&:before, &:after": {
      opacity: 0.3,
    },
  },
  input: {
    fontWeight: 600,
    fontSize: "15pt",
    textAlign: "center",
    caretColor: "white",
    color: "rgb(255 255 255 / 65%)",
  },
}));

const RegisterPage: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [holderName, setHolderName] = useState("");
  const [visibleNextBtn, setVisibleNextBtn] = useState(false);
  const [visibleNextForm, setVisibleNextForm] = useState(false);

  const handleInputName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setVisibleNextBtn(true);
    setHolderName(e.target.value);
  };

  const handleNext: React.MouseEventHandler = () => {
    setVisibleNextForm(true);
  };

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
      <div className="w-4/5 max-w-md flex items-center flex-col m-auto">
        <CaseWrapper className="wrapper relative w-full md:pb-2">
          <div className={clsx("card", visibleNextForm && "is-flipped")}>
            <div className="card-face front">
              <CardCase className="relative w-full md:pb-2">
                <div className="absolute inset-0 p-2">
                  <div className="dashed-body w-full h-full rounded-2xl p-1.5">
                    <div className="flex flex-col h-full">
                      <div className="basis-[11%] overflow-hidden">
                        <LandingCard className="w-full bg-[#523E21]" />
                      </div>
                      <div className="basis-[50%] overflow-hidden pt-2 relative">
                        <LandingCard className="w-full bg-neutral-950" />
                        <div className="compartment absolute bottom-0" />
                      </div>
                      <div className="basis-[39%] flex items-center">
                        <div className="px-[10%] pb-4 w-full">
                          <FormControlStyled fullWidth>
                            <label
                              htmlFor="name-adornment"
                              className="text-white text-[10px]"
                            >
                              ACCOUNT NAME
                            </label>
                            <Input
                              id="name-adornment"
                              inputProps={{
                                maxLength: 30,
                              }}
                              startAdornment={
                                <InputAdornment position="start"></InputAdornment>
                              }
                              onChange={handleInputName}
                            />
                          </FormControlStyled>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardCase>
            </div>
            <div className="card-face back">
              <CardCase className="relative w-full md:pb-2">
                <div className="absolute inset-0 p-2">
                  <div className="dashed-body w-full h-full rounded-2xl p-1.5"></div>
                </div>
              </CardCase>
            </div>
          </div>
        </CaseWrapper>
        <div className="p-8 w-full">
          <Fade in={visibleNextBtn}>
            <BlackButton
              className="w-full"
              disabled={!holderName.length}
              onClick={handleNext}
            >
              {visibleNextForm ? "CREATE ACCOUNT" : "NEXT"}
            </BlackButton>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
