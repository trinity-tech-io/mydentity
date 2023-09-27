"use client";
import { FC } from "react";
import PasskeyBind from './components/PasskeyBind';
import Headline from "@components/layout/Headline";
import EllipseBg from "@components/layout/EllipseBg";
import W3Icon from "@assets/images/www-circle.svg"

const BindPassKey: FC = () => {
    return (
        <>
            <Headline
                title="Bind your account with current browser"
                description={
                    <>Bind your current browser. This doesn't require to provide any email or password, <span className="text-red-600">but access to your identity will be lost if you don't bind multiple devices as recovery.</span></>
                }
            />
            <div className="w-full flex justify-center py-[10%]">
                <PasskeyBind />
            </div>
            <div className="absolute w-full md:w-2/3 h-[65%] bottom-0 right-0 overflow-hidden z-[-1]">
                <EllipseBg className="opacity-[0.15] h-full" />
                <div className="absolute w-1/3 right-[-7%] bottom-[-7%] opacity-30">
                    <W3Icon />
                </div>
            </div>
        </>
    )
}

export default BindPassKey;