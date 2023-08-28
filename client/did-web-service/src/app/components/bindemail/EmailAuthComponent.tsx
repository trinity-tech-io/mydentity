"use client";
import { Card } from "@mui/material";
import { isSignedIn } from "@services/user/user.service";
import clsx from 'clsx';
import { FC, useEffect } from "react";
import { BindEmailOnly } from './widgets/BindEmailOnly';
import BindEmailWithMicrosoft from './widgets/BindEmailWithMicrosoft';
import SeparateLine from './widgets/SeparateLine';

const EmailAuthComponent: FC = () => {
  useEffect(() => {
    // fix console error.
    const logined = isSignedIn();
  }, []);

  return (
    <div className="col-span-full flex flex-col justify-center items-center">
      <Card className={clsx('py-10 w-full text-center min-h-full')} elevation={0}>
        <BindEmailWithMicrosoft />
        <SeparateLine />
        <BindEmailOnly />
      </Card>
    </div>
  )
}

export default EmailAuthComponent;