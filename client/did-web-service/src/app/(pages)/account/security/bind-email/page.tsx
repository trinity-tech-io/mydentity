"use client";
import { FC } from "react";
import EllipseBg from "@components/layout/EllipseBg";
import EmailAuthComponent from "@components/security/bindemail/EmailAuthComponent";
import AtMarkIcon from "@assets/images/at-mark.svg"

const BindEmail: FC = () => {
    return (
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
            <div className="absolute w-full md:w-2/3 h-[65%] bottom-0 right-0 overflow-hidden">
                <EllipseBg className="opacity-[0.15] h-full" />
                <div className="absolute w-1/3 right-[-2rem] bottom-[-2rem] opacity-30">
                    <AtMarkIcon />
                </div>
            </div>
        </>
    )
}

export default BindEmail;