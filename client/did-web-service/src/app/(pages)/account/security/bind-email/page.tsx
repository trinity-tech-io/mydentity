"use client";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import EmailAuthComponent from "@components/security/bindemail/EmailAuthComponent";
import { Card } from "@mui/material";
import clsx from 'clsx';
import { FC } from "react";

const BindEmail: FC = () => {
    return (
        // <div className="col-span-full" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        //     <Breadcrumbs entries={["security-center", "bind-email"]} />

        //     <Card className={clsx('py-40 w-full text-center min-h-full')} elevation={0}>
        //         {/* SignInHeader */}
        //         <EmailAuthComponent />
        //     </Card>
        // </div>
        <>
            <h3 className='w-full text-4xl font-bold text-center'>
                Bind your account to an email address
            </h3>
            <p className="mt-4">
                Verify one of your existing email addresses and bind it to your account with a password. You can later use your email and password to sign in and unlock access to your identity.
            </p>
            <div className="w-full flex justify-center py-[10%]">
                <EmailAuthComponent />
            </div>
        </>
    )
}

export default BindEmail;