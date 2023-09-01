"use client";
import { FC } from "react";
import PasskeyBind from './components/PasskeyBind';
import PasskeyHeader from './components/PasskeyHeader';

import { Card } from "@mui/material";
import clsx from 'clsx';

const BindPassKey: FC = () => {
    return (
        <div className="col-span-full" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Card className={clsx('py-40 w-full text-center min-h-full')} elevation={0}>
                <PasskeyHeader />
                <PasskeyBind />
            </Card>
        </div>
    )
}

export default BindPassKey;