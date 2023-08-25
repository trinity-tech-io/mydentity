"use client";
import { bindPasskey, unlockPasskey } from "@services/keyring/keyring.service";
import { isLogined } from "@services/user/user.service";
import { FC, useEffect } from "react";
import PasskeyAdd from './widgets/PasskeyAdd';
import PasskeyHeader from './widgets/PasskeyHeader';
import PasskeyUnlock from './widgets/PasskeyUnlock';

import { Card } from "@mui/material";
import clsx from 'clsx';

const BindPassKey: FC = () => {
    useEffect(() => {
        // fix console error.
        const logined = isLogined();
    }, []);

    const addPasskeyConfirmation = (password: string) => {
        bindPasskey();
    }

    const authPasskeyConfirmation = (password: string) => {
        unlockPasskey();
    }
    return (
        <div className="col-span-full" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Card className={clsx('py-40 w-full text-center min-h-full')} elevation={0}>
                <PasskeyHeader />
                <PasskeyAdd onConfirm={addPasskeyConfirmation} />
                <PasskeyUnlock onConfirm={authPasskeyConfirmation} />
            </Card>
        </div>
    )
}

export default BindPassKey;