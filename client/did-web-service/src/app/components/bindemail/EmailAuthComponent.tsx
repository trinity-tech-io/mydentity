"use client";

import {FC, useEffect} from "react";
// import HeaderSignIn from './widgets/HeaderSignIn'
import BindEmailWithMicrosoft from './widgets/BindEmailWithMicrosoft'
import SeparateLine from './widgets/SeparateLine'
import { BindEmailOnly } from './widgets/BindEmailOnly'
import { Card } from '@material-ui/core';
import clsx from 'clsx';

const EmailAuthComponent: FC = () => {
    useEffect(() => {
        const item = localStorage.getItem('access_token');
    }, []);

  return (
    <div className="col-span-full" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Card className={clsx('py-40 w-full text-center min-h-full')} elevation={0}>
      {/* SignInHeader */}
      {/*<HeaderSignIn />*/}
      {/* SignIn with MicrosoftButton */}
      <BindEmailWithMicrosoft />
      {/* Separate line */}
      <SeparateLine />
      {/* SignIn with Email */}
      <BindEmailOnly />
      </Card>
    </div>
  )
}

export default EmailAuthComponent;