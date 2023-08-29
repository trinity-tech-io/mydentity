"use client";
import EmailAuthComponent from "@components/security/bindemail/EmailAuthComponent";
import { Card } from "@mui/material";
import { isSignedIn } from "@services/user/user.service";
import clsx from 'clsx';
import { FC, useEffect } from "react";

const BindEmail: FC = () => {
    useEffect(() => {
        // fix console error.
        const logined = isSignedIn();
    }, []);

    return (
        <div className="col-span-full" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Card className={clsx('py-40 w-full text-center min-h-full')} elevation={0}>
                {/* SignInHeader */}
                <EmailAuthComponent />
            </Card>
        </div>
    )
}

export default BindEmail;