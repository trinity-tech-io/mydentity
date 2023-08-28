"use client";
import { Card } from "@mui/material";
import { signOut } from "@services/user/user.service";
import clsx from 'clsx';
import { FC, useEffect } from "react";
import { EmailSignIn } from './widgets/EmailSignIn';
import HeaderSignIn from './widgets/HeaderSignIn';
import MicrosoftSignIn from './widgets/MicrosoftSignIn';
import SeparateLine from './widgets/SeparateLine';
import PasskeySignIn from './widgets/PasskeySignIn';

const SignIn: FC = () => {
    useEffect(() => {
        signOut();
    }, []);

  return (
    <div className="col-span-full" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Card className={clsx('py-40 w-full text-center min-h-full')} elevation={0}>
      {/* SignInHeader */}
      <HeaderSignIn />
      {/* SignIn with MicrosoftButton */}
      <MicrosoftSignIn />
      {/* Separate line */}
      <SeparateLine />
      {/* SignIn with Email */}
      <EmailSignIn />
      <PasskeySignIn />
      </Card>
    </div>
  )
}

export default SignIn;