"use client";
import React, { FC, useRef, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useMediaQuery, useTheme, styled, Input, InputAdornment, Fade, InputLabel, FormHelperText } from "@mui/material";
import { useToast } from "@services/feedback.service";
import { signOut, signUp } from "@services/user/user.service";
import TextBarcode from "@components/text-barcode/TextBarcode";
import { BlackButton } from "@components/button";
import { CaseWrapper, CardCase, LandingCard } from "@components/card";
import AccountForm from "@components/form/AccountForm";
import PasswordInput from "./components/PasswordInput";

const DescriptionText = styled("div")(({ theme }) => ({
  ".fade-in": {
    animation: `blurFadeIn 2000ms ${theme.transitions.easing.easeInOut} forwards`,
    MsAnimation: `blurFadeIn 2000ms ${theme.transitions.easing.easeInOut} forwards`,
    WebkitAnimation: `blurFadeIn 2000ms ${theme.transitions.easing.easeInOut} forwards`,
    MozAnimation: `blurFadeIn 2000ms ${theme.transitions.easing.easeInOut} forwards`,
  },
  ".fade-out": {
    animation: `blurFadeOut 2000ms ${theme.transitions.easing.easeInOut} forwards`,
    MsAnimation: `blurFadeOut 2000ms ${theme.transitions.easing.easeInOut} forwards`,
    WebkitAnimation: `blurFadeOut 2000ms ${theme.transitions.easing.easeInOut} forwards`,
    MozAnimation: `blurFadeOut 2000ms ${theme.transitions.easing.easeInOut} forwards`,
  },
  "@keyframes blurFadeIn": {
    "0%": {
      opacity: 0,
      textShadow: "0px 0px 20px #fff",
      WebkitTransform: "scale(1.2)",
      transform: "scale(1.2)",
    },
    "30%": {
      opacity: 1,
      textShadow: "0px 0px 0px #fff",
      WebkitTransform: "scale(1)",
      transform: "scale(1)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
  "@keyframes blurFadeOut": {
    "0%": {
      opacity: 1,
      textShadow: "0px 0px 0px #fff",
      WebkitTransform: "scale(1.2)",
      transform: "scale(1.2)",
    },
    "30%": {
      opacity: 0,
      textShadow: "0px 0px 20px #fff",
      WebkitTransform: "scale(0)",
      transform: "scale(0)",
    },
    "100%": {
      transform: "scale(0)",
    },
  },
}));

const RegisterPage: FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [holderName, setHolderName] = useState("");
  const [password, setPassword] = useState({ pw: "", confirm: "" });
  const [visibleNextBtn, setVisibleNextBtn] = useState(false);
  const [visibleNextForm, setVisibleNextForm] = useState(false);
  const [validationState, setValidationState] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const pwInputRef = useRef(null);
  const confirmPwInputRef = useRef(null);
  const { showErrorToast } = useToast();
  const enabledButtonState = holderName.trim().length>0 && (!visibleNextForm || (visibleNextForm && password.pw.length>0 && password.pw === password.confirm))

  const handleInputName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setVisibleNextBtn(true);
    setHolderName(e.target.value);
  };

  const handlePassword =
    (field: "pw" | "confirm") => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword((prev) => {
        const temp = { ...prev };
        temp[field] = e.target.value;
        return temp;
      });
    };

  const handleNext: React.MouseEventHandler = () => {
    setVisibleNextForm(true);
    pwInputRef.current.focus();
  };

  const handleCreate: React.MouseEventHandler = async () => {
    setValidationState(true);
    if (pwInputRef.current.value !== confirmPwInputRef.current.value) return;

    setIsCreating(true)
    try {
      const createdUser = await signUp(holderName);
      if (createdUser) {
        // After sign up, create the first shadow key based on the given password, so we can create a first identity just after.
        const passwordBound = await createdUser.get("security").bindPassword(password.pw);
        if (passwordBound) {
          // All good, go to on boarding
          router.push("/onboarding");
        }
        else {
          // Something wrong happened, sign out from the failing attempt
          // TODO: Show feedback to user
          signOut();
          setIsCreating(false);
        }
      }
      else {
        setIsCreating(false);
        showErrorToast("Sign up failed.")
      }
    } catch(e) {
      showErrorToast("Sign up failed.")
    }
  };

  return (
    <div className="text-center">
      <DescriptionText className="inline-block text-left mb-6 md:mb-10 relative">
        <div className={visibleNextForm ? "fade-out" : "fade-in"}>
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
              isMobile
                ? "preferred nickname"
                : "preferred nickname as an account"
            }
            text="preferred nickname as an account name."
            height={30}
            textClassName={isMobile ? "" : "tracking-[3px] text-xl"}
          />
        </div>
        <div
          className={clsx(
            "absolute w-full top-0",
            visibleNextForm ? "fade-in" : "opacity-0"
          )}
        >
          <TextBarcode
            value={
              isMobile
                ? "personalize card holder"
                : "Let's personalize this virtual card holder"
            }
            text="Now, let's add a robust password. We'll guide you next on"
            height={30}
            textClassName={isMobile ? "text-sm" : "tracking-[1px] text-xl"}
          />
          <br />
          <TextBarcode
            value={
              isMobile
                ? "preferred nickname"
                : "preferred nickname as an account"
            }
            text="how to secure your account and identities."
            height={30}
            textClassName={isMobile ? "" : "tracking-[2px] text-xl"}
          />
        </div>
      </DescriptionText>
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
                      <div className="basis-[89%] overflow-hidden pt-2 relative">
                        <LandingCard className="w-full bg-neutral-950" />
                        <div className="compartment-top absolute bottom-[45%]" />
                        <div className="compartment absolute bottom-0 h-[45%]">
                          <div className="px-[10%] py-4 w-full">
                            <AccountForm fullWidth>
                              <label
                                htmlFor="holder-name"
                                className="text-white text-[10px]"
                              >
                                ACCOUNT NAME
                              </label>
                              <Input
                                id="holder-name"
                                inputProps={{
                                  maxLength: 30,
                                }}
                                startAdornment={
                                  <InputAdornment position="start"></InputAdornment>
                                }
                                onChange={handleInputName}
                              />
                            </AccountForm>
                          </div>
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
                  <div className="dashed-body w-full h-full rounded-2xl p-1.5">
                    <div className="px-6 py-8 w-full">
                      <div className="flex flex-col gap-5">
                        <AccountForm fullWidth>
                          <InputLabel htmlFor="pw">PASSWORD</InputLabel>
                          <PasswordInput
                            outerProps={{ onChange: handlePassword("pw") }}
                            inputProps={{ ref: pwInputRef }}
                          />
                        </AccountForm>
                        <AccountForm
                          error={
                            validationState && password.pw !== password.confirm
                          }
                          fullWidth
                        >
                          <InputLabel htmlFor="confirm-pw">
                            CONFIRM PASSWORD
                          </InputLabel>
                          <PasswordInput
                            outerProps={{
                              id: "confirm-pw",
                              color: "warning",
                              onChange: handlePassword("confirm"),
                            }}
                            inputProps={{ ref: confirmPwInputRef }}
                          />
                          <FormHelperText>
                            Confirm password is incorrect!
                          </FormHelperText>
                        </AccountForm>
                      </div>
                    </div>
                  </div>
                </div>
              </CardCase>
            </div>
          </div>
        </CaseWrapper>
        <div className="p-8 w-full">
          <Fade in={visibleNextBtn}>
            <BlackButton
              id="action-btn"
              loading={isCreating}
              className="w-full"
              disabled={!enabledButtonState}
              onClick={visibleNextForm ? handleCreate : handleNext}
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
