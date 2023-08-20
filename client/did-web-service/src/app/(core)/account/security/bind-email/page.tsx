"use client";
import {FC, useEffect} from "react";
import { Card } from '@material-ui/core';
import clsx from 'clsx';
import EmailAuthComponent from "@components/bindemail/EmailAuthComponent";

const BindEmail: FC = () => {
    useEffect(() => {
        const item = localStorage.getItem('access_token');
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