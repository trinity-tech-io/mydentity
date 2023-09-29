"use client";
import { FC, useState } from "react";
import { CreateIdentity } from "@components/identity-creation/CreateIdentity";
import { useMounted } from "@hooks/useMounted";
import { useRouter } from "next/navigation";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { Identity } from "@model/identity/identity";
import { usePostSignInFlow } from "@services/flow.service";
import Headline from "@components/layout/Headline";
import { CardCase, LandingCard } from "@components/card";
import DetailLine from "@components/feature/DetailLine";
import ChipIcon from "@assets/images/chip.svg";
import CardIcon from "@assets/images/card/card.svg";
import IdentityCaseIcon from "@assets/images/identity-case.svg";
import { DarkButton } from "@components/button";
import { Button, Input, InputAdornment, styled } from "@mui/material";
import clsx from "clsx";

const IdentityForm = styled("div")(({ theme }) => ({
  perspective: 600,
  "@keyframes takeOut": {
    "0%": {
      top: 0,
    },
    "25%": {
      WebkitTransform: "rotateX(0deg)",
      transform: "rotateX(0deg)",
      left: 0,
      right: 0,
    },
    "45%": {
      top: "-70%",
    },
    "55%, 100%": {
      top: "-70%",
      WebkitTransform: "rotateX(20deg)",
      transform: "rotateX(20deg)",
      left: "calc(-0.375rem - 2px)",
      right: "calc(-0.375rem - 2px)",
    },
  },
  "@keyframes comeOut": {
    "0%, 55%": {
      top: "calc((100% - 2 * 8px) * 0.89 * -0.7 + (100% - 2 * 8px) * 0.11 + 16px + 0.375rem + 2px)",
      width: "calc(100% - 2 * 8px)",
      WebkitTransform: "rotateX(20deg)",
      transform: "rotateX(20deg)",
      visibility: "hidden",
      left: 8,
      right: 8,
    },
    "100%": {
      top: "8%",
      visibility: "visible",
      WebkitTransform: "rotateX(0deg)",
      transform: "rotateX(0deg)",
      left: 0,
      right: 0,
    },
  },
  ".take-out": {
    animation: `takeOut 1s ${theme.transitions.easing.easeInOut} forwards`,
    MsAnimation: `takeOut 1s ${theme.transitions.easing.easeInOut} forwards`,
    WebkitAnimation: `takeOut 1s ${theme.transitions.easing.easeInOut} forwards`,
    MozAnimation: `takeOut 1s ${theme.transitions.easing.easeInOut} forwards`,
  },
  ".come-out": {
    animation: `comeOut 1s ${theme.transitions.easing.easeInOut} forwards`,
    MsAnimation: `comeOut 1s ${theme.transitions.easing.easeInOut} forwards`,
    WebkitAnimation: `comeOut 1s ${theme.transitions.easing.easeInOut} forwards`,
    MozAnimation: `comeOut 1s ${theme.transitions.easing.easeInOut} forwards`,
  },
}));
const NewIdentityPage: FC = () => {
  const { mounted } = useMounted();
  const router = useRouter();
  const [activeUser] = useBehaviorSubject(authUser$);
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();
  const [visibleInputForm, setVisibleInputForm] = useState(false);

  const showProfile = (): void => {
    navigateToPostSignInLandingPage("/profile");
  };

  const onIdentityCreated = async (identity: Identity): Promise<void> => {
    showProfile();
  };

  const startAction = (): void => {
    setVisibleInputForm(true);
  };
  if (!mounted) return null;

  return (
    <>
      <Headline
        title="Create a new identity"
        description="Creating an identity opens up the door to constructing a credible online persona, complete with authentic credentials, for diverse digital endeavors. To illustrate, envision the virtual card holder as your primary account and the virtual card as your digital identity, where each credential securely resides within the embedded chip."
      />
      <CreateIdentity onIdentityCreated={onIdentityCreated} />
      <div className="w-full flex justify-center py-4">
        <div className="w-[30%] flex flex-col max-w-sm">
          <DetailLine
            icon={
              <div className="w-4 h-4 flex justify-center">
                <ChipIcon />
              </div>
            }
            title="THE CHIP"
            description="Your credentials, such as your date of birth and country, are accessible within your identity."
          />
          <div className="flex-1" />
          <DetailLine
            icon={
              <div className="w-4 h-4 flex justify-center">
                <IdentityCaseIcon width="100%" />
              </div>
            }
            title="THE CARD HOLDER"
            description="This serves as your primary account
            for managing all your identities."
          />
        </div>
        <div className="w-2/5 flex-1 flex justify-center">
          <div className="w-full max-w-md">
            <CardCase className="relative w-full md:pb-2">
              <div className="absolute inset-0 p-2">
                <div
                  className={clsx(
                    "dashed-body w-full h-full rounded-2xl p-1.5",
                    visibleInputForm ? "fade-out" : ""
                  )}
                >
                  <div className="flex flex-col h-full">
                    <div className="basis-[11%] overflow-hidden">
                      <LandingCard className="w-full bg-[#523E21]" />
                    </div>
                    <IdentityForm className="basis-[89%] mt-2 relative">
                      <LandingCard
                        className={clsx(
                          "min-w-full w-auto h-full bg-neutral-950",
                          visibleInputForm ? "take-out" : ""
                        )}
                        position="absolute"
                      />
                      <div className="compartment-top absolute bottom-[45%]" />
                      <div className="compartment absolute bottom-0 h-[45%]">
                        <div className="px-[10%] pb-4 w-full">
                          {/* <FormControlStyled fullWidth>
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
                            </FormControlStyled> */}
                        </div>
                      </div>
                    </IdentityForm>
                  </div>
                </div>
                <IdentityForm className="absolute h-full left-0 right-0 top-0">
                  <LandingCard
                    className={clsx(
                      "w-auto h-auto bg-neutral-950 top-0 left-0 right-0 invisible",
                      visibleInputForm ? "come-out" : ""
                    )}
                    position="absolute"
                  >

                  </LandingCard>
                </IdentityForm>
              </div>
            </CardCase>
          </div>
        </div>
        <div className="w-[30%] max-w-sm">
          <DetailLine
            className="text-right"
            icon={
              <div className="w-4 h-4 flex justify-center">
                <CardIcon />
              </div>
            }
            title="THE IDENTITY CARD"
            description="The virtual card represents your
            unique identity. You can generate
             multiple identities to meet
             your needs and purposes."
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="inline-flex flex-col gap-2">
          <DarkButton id="bind-ms" className="w-full" onClick={startAction}>
            COOL! LET'S GET STARTED!
          </DarkButton>
          <Button
            sx={{ color: "#9D3E3E", textDecoration: "underline" }}
            endIcon={<KeyboardArrowRightIcon />}
            //  onClick={onSkip}
          >
            Not now. I'm just checking things out
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewIdentityPage;
