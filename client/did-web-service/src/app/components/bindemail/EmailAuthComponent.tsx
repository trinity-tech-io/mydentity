"use client";

import {FC, useEffect} from "react";
import BindEmailWithMicrosoft from './widgets/BindEmailWithMicrosoft'
import SeparateLine from './widgets/SeparateLine'
import { BindEmailOnly } from './widgets/BindEmailOnly'
import { Card } from '@material-ui/core';
import clsx from 'clsx';
import {isLogined} from "@services/user/user.service";

const EmailAuthComponent: FC = () => {
    useEffect(() => {
        // fix console error.
        const logined = isLogined();
    }, []);

  return (
    <div className="col-span-full" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Card className={clsx('py-40 w-full text-center min-h-full')} elevation={0}>
      <BindEmailWithMicrosoft />
      <SeparateLine />
      <BindEmailOnly />
      </Card>
    </div>
  )
}

export default EmailAuthComponent;