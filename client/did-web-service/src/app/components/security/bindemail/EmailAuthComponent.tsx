"use client";
import { Card, Container, Link } from "@mui/material";
import { isSignedIn } from "@services/user/user.service";
import clsx from 'clsx';
import { FC, useEffect } from "react";
import { BindEmailOnly } from './widgets/BindEmailOnly';
import BindEmailWithMicrosoft from './widgets/BindEmailWithMicrosoft';
import SeparateLineText from "@components/separate-line";

const EmailAuthComponent: FC = () => {
  useEffect(() => {
    // fix console error.
    const logined = isSignedIn();
  }, []);

  return (
    <Card className="w-full md:w-1/2 max-w-xl flex flex-col justify-center items-center" elevation={0}>
      <Container className="py-4">
        <BindEmailWithMicrosoft />
      </Container>
      <div className="py-4 w-full">
        <SeparateLineText text="or sign in with your email" />
      </div>
      <Container className="py-4">
        <BindEmailOnly />
      </Container>
      <span className="text-[11px] font-extralight text-center opacity-50">
        Binding an account means you agree to the<br />
        <Link href="#" color="inherit"><span className="font-medium">Privacy Policy</span></Link> and <Link href="#" color="inherit"><span className="font-medium">Terms of Service</span></Link>.
      </span>
    </Card>
  )
}

export default EmailAuthComponent;