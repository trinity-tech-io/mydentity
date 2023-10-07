"use client";
import React, { FC, useEffect } from "react";
import { signOut } from "@services/user/user.service";
import { Box, Container, styled } from "@mui/material";
import { EmailSignIn } from './widgets/EmailSignIn';
import { SignInHeader } from "./widgets/HeaderSignIn";
import MicrosoftSignIn from './widgets/MicrosoftSignIn';
import PasskeySignIn from './widgets/PasskeySignIn';
import SeparateLineText from "@components/separate-line";
import GoogleSignIn from "@/app/(pages)/signin/widgets/GoogleSignIn";
import LinkedinSignIn from "@/app/(pages)/signin/widgets/LinkedinSignIn";

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

const ContainerBox:FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <Container className="relative w-full flex flex-col py-4">
      {children}
    </Container>
  )
}
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
          <CardStyled className="w-full md:w-1/2 max-w-xl border-2 border-white border-opacity-30 bg-[#1E1E1E] relative max-sm:p-5 md:p-10 flex flex-col justify-center items-center">
            <div className="w-full md:w-3/4 z-10">
              <ContainerBox>
                <MicrosoftSignIn />
              </ContainerBox>
              <ContainerBox>
                <GoogleSignIn />
              </ContainerBox>
              <ContainerBox>
                <LinkedinSignIn />
              </ContainerBox>
              <div className="py-4">
                <SeparateLineText text="or sign in with your email" />
              </div>
              {/* Sign in with magic key by email */}
              <ContainerBox>
                <EmailSignIn />
              </ContainerBox>
              <div className="py-4">
                <SeparateLineText text="or sign in with your browser" />
              </div>
              <ContainerBox>
                <PasskeySignIn />
              </ContainerBox>
            </div>
          </CardStyled>
        </div>
      </div>
    </div>
  )
}

export default SignIn;