"use client";
import {FC, useEffect} from "react";
import HeaderSignIn from './widgets/HeaderSignIn'
import MicrosoftSignIn from './widgets/MicrosoftSignIn'
import SeparateLine from './widgets/SeparateLine'
import { EmailSignIn } from './widgets/EmailSignIn'
import { Card } from '@material-ui/core';
import clsx from 'clsx';
import {signOut} from "@services/user/user.service";

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
      </Card>
    </div>
  )
}

export default SignIn;