"use client";
import { isLogined } from "@services/user/user.service";
import { FC, useEffect } from "react";
import PasskeyBind from './widgets/PasskeyBind';
import PasskeyHeader from './widgets/PasskeyHeader';
import PasskeyUnlock from './widgets/PasskeyUnlock';

import { Card } from "@mui/material";
import clsx from 'clsx';

const BindPassKey: FC = () => {
    useEffect(() => {
        // fix console error.
        const logined = isLogined();
    }, []);

    return (
        <div className="col-span-full" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Card className={clsx('py-40 w-full text-center min-h-full')} elevation={0}>
                <PasskeyHeader />
                <PasskeyBind/>
                <PasskeyUnlock/>
            </Card>
        </div>
    )
}

export default BindPassKey;