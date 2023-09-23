"use client";
import { FC, useEffect } from "react";
import { Icon as ReactIcon } from '@iconify/react';
import { signOut } from "@services/user/user.service";
import { Box, Typography, styled } from "@mui/material";
import { EmailSignIn } from './widgets/EmailSignIn';
import { SignInHeader } from "./widgets/HeaderSignIn";
import MicrosoftSignIn from './widgets/MicrosoftSignIn';
import PasskeySignIn from './widgets/PasskeySignIn';
import { DarkButton } from "@components/button";
import SeparateLineText from "@components/separate-line";

const SignInWidget: FC<{
  title: string;
  children: any;
}> = ({ title, children }) => {
  return <div className="col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-4">
    <Typography variant="h5">{title}</Typography>
    {children}
  </div>
}

const CardStyled = styled(Box)(({theme})=>({
  borderRadius: "1rem",
  overflow: 'hidden',
  "&:before": {
    opacity: 0.1,
    content: "''",
    position: "absolute",
    width: "100%",
    height: "200%",
    background:
      "linear-gradient(to bottom, rgba(163, 163, 163, 100%), rgba(255, 255, 255, 25%), transparent)",
    transform: "rotate(-20deg)",
    transformOrigin: 'top left',
    top: 0,
    right: "-40%",
  }
}))
const SignIn: FC = () => {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <div className='w-full'>
      <div className="flex flex-col justify-center items-center">
        {/* SignInHeader */}
        <SignInHeader />

        <div className="max-sm:pt-4 md:p-10 w-full flex justify-center">
          <CardStyled className="md:w-1/2 border-2 border-white border-opacity-30 w-full bg-[#1E1E1E] relative max-sm:p-5 md:p-10 flex flex-col justify-center items-center">
            <div className="w-full md:w-3/4">
              <MicrosoftSignIn />
              <SeparateLineText text="or sign in with your email" />

              <SignInWidget title="Email magic key">
                {/* Sign in with magic key by email */}
                <EmailSignIn />
              </SignInWidget>

              <SeparateLineText text="or sign in with your browser" />

              <SignInWidget title="Browser">
                <PasskeySignIn />
              </SignInWidget>
            </div>
          </CardStyled>
        </div>
      </div>
    </div>
  )
}

export default SignIn;