"use client";
import { Typography } from "@mui/material";
import { signOut } from "@services/user/user.service";
import { FC, useEffect } from "react";
import { EmailSignIn } from './widgets/EmailSignIn';
import { SignInHeader } from "./widgets/HeaderSignIn";
import MicrosoftSignIn from './widgets/MicrosoftSignIn';
import PasskeySignIn from './widgets/PasskeySignIn';
import { deleteBrowserId } from "@services/browser.service";

const SignInWidget: FC<{
  title: string;
  children: any;
}> = ({ title, children }) => {
  return <div className="col-span-full xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-4">
    <Typography variant="h5">{title}</Typography>
    {children}
  </div>
}

const SignIn: FC = () => {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <div className="col-span-full flex flex-col justify-center items-center">
      <div className='w-full text-center'>
        {/* SignInHeader */}
        <SignInHeader />

        <div className="grid grid-cols-12 bg-red mt-10 gap-4">
          <SignInWidget title="Social account">
            {/* Sign in with Microsoft oauth */}
            <MicrosoftSignIn />
          </SignInWidget>

          <SignInWidget title="Email magic key">
            {/* Sign in with magic key by email */}
            <EmailSignIn />
          </SignInWidget>

          <SignInWidget title="Browser">
            <PasskeySignIn />
          </SignInWidget>
        </div>
      </div>
    </div>
  )
}

export default SignIn;