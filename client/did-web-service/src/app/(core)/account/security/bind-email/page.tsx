"use client";
import {FC, useEffect} from "react";
// import HeaderSignIn from './widgets/HeaderSignIn'
// import MicrosoftSignIn from './widgets/MicrosoftSignIn'
// import SeparateLine from './widgets/SeparateLine'
// import { EmailSignIn } from './widgets/EmailSignIn'
import { Card } from '@material-ui/core';
import clsx from 'clsx';
import EmailAuthComponent from "@components/bindemail/EmailAuthComponent";

const SignIn: FC = () => {
    useEffect(() => {
        const item = localStorage.getItem('access_token');
    }, []);

    return (
        <div className="col-span-full" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Card className={clsx('py-40 w-full text-center min-h-full')} elevation={0}>
                {/* SignInHeader */}
                <EmailAuthComponent />
                {/*/!* SignIn with MicrosoftButton *!/*/}
                {/*<MicrosoftSignIn />*/}
                {/*/!* Separate line *!/*/}
                {/*<SeparateLine />*/}
                {/*/!* SignIn with Email *!/*/}
                {/*<EmailSignIn />*/}
            </Card>
        </div>
    )
}

export default SignIn;