"use client";
import BindEmailWithGoogle from "@components/security/bindemail/widgets/BindEmailWithGoogle";
import BindEmailWithLinkedin from "@components/security/bindemail/widgets/BindEmailWithLinkedin";
import SeparateLineText from "@components/separate-line";
import { Box, Container, Link } from "@mui/material";
import { isSignedIn } from "@services/user/user.service";
import { FC, useEffect } from "react";
import { BindEmailOnly } from './widgets/BindEmailOnly';
import BindEmailWithMicrosoft from './widgets/BindEmailWithMicrosoft';

const EmailAuthComponent: FC = () => {
  useEffect(() => {
    // fix console error.
    const logined = isSignedIn();
  }, []);

  return (
    <Box className="w-full md:w-1/2 max-w-xl flex flex-col justify-center items-center">
      <Container className="py-4">
        <BindEmailWithMicrosoft />
      </Container>
      <Container className="py-4">
        <BindEmailWithGoogle />
      </Container>
      <Container className="py-4">
        <BindEmailWithLinkedin />
      </Container>
      <div className="py-4 w-full">
        <SeparateLineText text="or receive a magic link to get verified" />
      </div>
      <Container className="py-4">
        <BindEmailOnly />
      </Container>
      <span className="text-[11px] font-extralight text-center opacity-50">
        Binding an account means you agree to the<br />
        <Link href="#" color="inherit"><span className="font-medium">Privacy Policy</span></Link> and <Link href="#" color="inherit"><span className="font-medium">Terms of Service</span></Link>.
      </span>
    </Box>
  )
}

export default EmailAuthComponent;