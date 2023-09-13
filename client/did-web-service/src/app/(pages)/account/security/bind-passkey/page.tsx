"use client";
import { FC } from "react";
import PasskeyBind from './components/PasskeyBind';

import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import clsx from 'clsx';
import { PasskeyAuth } from "./components/PasskeyAuth";

const BindPassKey: FC = () => {
    return (
        <div className="col-span-full" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Breadcrumbs entries={["security-center", "bind-browser"]} />

            <div className={clsx('py-40 w-full text-center min-h-full')} >
                <PasskeyAuth />
                <PasskeyBind />
            </div>
        </div>
    )
}

export default BindPassKey;