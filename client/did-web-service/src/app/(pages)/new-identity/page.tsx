"use client";
import React, { FC, useRef, useState } from "react";
import clsx from "clsx";
import { first } from "rxjs";
import { motion } from "framer-motion";
import {
  Button,
  FormControl,
  Input,
  LinearProgress,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import ChipIcon from "@assets/images/chip.svg";
import CardIcon from "@assets/images/card/card.svg";
import IdentityCaseIcon from "@assets/images/identity-case.svg";
import { Identity } from "@model/identity/identity";
import Headline from "@components/layout/Headline";
import { CardCase, LandingCard } from "@components/card";
import DetailLine from "@components/feature/DetailLine";
import { DarkButton } from "@components/button";
import { callWithUnlock } from "@components/security/unlock-key-prompt/call-with-unlock";
import CurvedArrow from "@components/generic/CurvedArrow";
import { authUser$ } from "@services/user/user.events";
import { usePostSignInFlow } from "@services/flow.service";
import { identityService } from "@services/identity/identity.service";
import { useToast } from "@services/feedback.service";

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

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  ".MuiInput-root": {
    marginTop: 0,
    "&:before, &:after": {
      opacity: 0.18,
      borderColor: "white",
    },
  },
  ".MuiInputBase-root.MuiInput-root:hover:not(.Mui-disabled, .Mui-error)": {
    "&:before, &:after": {
      opacity: 0.18,
      borderColor: "white",
    },
  },
  ".MuiInput-root.Mui-focused": {
    "&:before, &:after": {
      opacity: 0.3,
    },
  },
  ".MuiInputLabel-root, .MuiInputLabel-root.Mui-focused:not(.Mui-error)": {
    color: "white",
    fontSize: "10px",
    transform: "unset",
    WebkitTransform: "unset",
  },
  "#holder-name": {
    paddingBottom: "10%",
    fontWeight: 600,
    fontSize: "21pt",
    caretColor: "white",
    color: "rgb(255 255 255 / 65%)",
  },
}));

const AnimatedTextWord: FC<{ text: string }> = ({ text }) => {
  const words = text.split(" ");

  // Variants for Container of words.
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        // stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        // stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ wordBreak: "break-all" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "5px", display: "inline-block" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
const CreatingSteps = [
  "Creating the secure identity",
  "Creating credential",
  "Registering identity",
  "Creating storage",
  "Successfully created",
];
const NewIdentityPage: FC = () => {
  const { mounted } = useMounted();
  const [activeUser] = useBehaviorSubject(authUser$);
  const [holderName, setHolderName] = useState("");
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();
  const [visibleInputForm, setVisibleInputForm] = useState(false);
  const [creatingIdentity, setCreatingIdentity] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const nameInputRef = useRef(null);
  const { showSuccessToast } = useToast();
  const enabledButtonState =
    holderName.trim().length > 0 && progressStep < CreatingSteps.length - 1;
  const progress = (100 * progressStep) / (CreatingSteps.length - 1);

  const showProfile = (): void => {
    navigateToPostSignInLandingPage("/profile");
  };

  const onIdentityCreated = async (identity: Identity): Promise<void> => {
    showProfile();
  };

  const onSkip = () => {
    navigateToPostSignInLandingPage();
  };

  const startAction = (): void => {
    setVisibleInputForm(true);
    setTimeout(() => {
      nameInputRef.current.focus();
    }, 1000);
  };

  const handleInputName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setHolderName(e.target.value);
  };

  const createAction = async (): Promise<void> => {
    setCreatingIdentity(true);
    // Create identity for real in the backend
    try {
      const identity = await callWithUnlock(() =>
        activeUser.get("identity").createRegularIdentity(holderName)
      );
      if (!identity) return;

      setProgressStep(1);

      if (identity) {
        identityService.setActiveIdentity(identity);

        // First fetch the (empty list of) credentials, this is required to be able to create new credentials.
        identity
          .profile()
          .profileCredentials$.pipe(first((v) => !!v))
          .subscribe(async () => {
            try {
              // Attach the name as credential, to this new identity
              await identity.profile().createInitialNameCredential(holderName);
              setProgressStep(2);

              await identity.publication().awaitIdentityPublished();
              setProgressStep(3);

              // Prepare the hive vault. This also starts the vault registration is not done yet, through the lazy access of vault status.
              await identity.hive().awaitHiveVaultReady();
              setProgressStep(4);
              setCreatingIdentity(false);

              showSuccessToast("Your new identity was created!");
              onIdentityCreated(identity);
            } catch (e) {
              setCreatingIdentity(false);
              setProgressStep(0);
            }
          });
      }
    } catch (e) {
      setCreatingIdentity(false);
      setProgressStep(0);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <Headline
        title="Create a new identity"
        description={
          visibleInputForm ? (
            <AnimatedTextWord text="Welcome to the identity creation process, a sophisticated journey where you'll meticulously craft a distinct digital persona. Through credentials, you will shape an online presence uniquely tailored to your objectives. Please enter your identity name below to embark on this exciting journey." />
          ) : (
            "Creating an identity opens up the door to constructing a credible online persona, complete with authentic credentials, for diverse digital endeavors. To illustrate, envision the virtual card holder as your primary account and the virtual card as your digital identity, where each credential securely resides within the embedded chip."
          )
        }
      />
      <div className="w-full flex justify-center py-4">
        <Zoom in={!visibleInputForm}>
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
        </Zoom>
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
                      <div className="compartment absolute bottom-0 h-[45%]" />
                      <Zoom in={!visibleInputForm}>
                        <div>
                          <CurvedArrow
                            className="absolute top-[20%] w-2/5 left-4 translate-x-[-100%]"
                            rotateX={true}
                          />
                          <CurvedArrow className="absolute top-[22%] w-2/5 right-0 translate-x-1/2 rotate-180" />
                          <CurvedArrow className="absolute top-[70%] w-2/5 left-8 translate-x-[-100%]" />
                        </div>
                      </Zoom>
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
                    dividerVisible={false}
                    footer={
                      (creatingIdentity ||
                        progressStep === CreatingSteps.length - 1) && (
                        <div className="flex flex-col w-full h-full">
                          <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{ height: 2, background: "#5a5a5aa8" }}
                          />
                          <div className="flex flex-1 items-end">
                            <span className="text-[#DDD] text-[10pt] flex-1 pr-2">
                              {CreatingSteps[progressStep]}{" "}
                              {progressStep < CreatingSteps.length - 1 && "..."}
                            </span>
                            <span className="text-[#DDD] text-[10pt]">
                              {`${progress}%`}
                            </span>
                          </div>
                        </div>
                      )
                    }
                  >
                    <FormControlStyled fullWidth>
                      <label
                        htmlFor="holder-name"
                        className="text-white text-[10px]"
                      >
                        IDENTITY NAME
                      </label>
                      <Input
                        id="holder-name"
                        autoFocus={true}
                        inputProps={{
                          maxLength: 30,
                          ref: nameInputRef,
                        }}
                        startAdornment={<div />}
                        disabled={creatingIdentity}
                        onChange={handleInputName}
                      />
                    </FormControlStyled>
                  </LandingCard>
                </IdentityForm>
              </div>
            </CardCase>
          </div>
        </div>
        <Zoom in={!visibleInputForm}>
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
        </Zoom>
      </div>
      <div className="flex justify-center">
        <div className="inline-flex flex-col gap-2">
          {visibleInputForm ? (
            <DarkButton
              id="bind-ms"
              loading={creatingIdentity}
              className="w-full"
              onClick={createAction}
              disabled={!enabledButtonState || creatingIdentity}
            >
              CREATE IDENTITY
            </DarkButton>
          ) : (
            <DarkButton id="bind-ms" className="w-full" onClick={startAction}>
              COOL! LET'S GET STARTED!
            </DarkButton>
          )}
          <Zoom in={!visibleInputForm}>
            <Button
              sx={{ color: "#9D3E3E", textDecoration: "underline" }}
              endIcon={<KeyboardArrowRightIcon />}
              onClick={onSkip}
            >
              Not now. I'm just checking things out
            </Button>
          </Zoom>
        </div>
      </div>
    </>
  );
};

export default NewIdentityPage;
