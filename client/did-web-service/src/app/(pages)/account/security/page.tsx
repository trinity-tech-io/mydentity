"use client";
import EmailIcon from '@assets/images/email.svg';
import FingerprintIcon from '@assets/images/fingerprint.svg';
import PasswordIcon from '@assets/images/password.svg';
import { Breadcrumbs } from '@components/breadcrumbs/Breadcrumbs';
import { MainButton } from "@components/generic/MainButton";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { Typography } from "@mui/material";
import { authUser$ } from "@services/user/user.events";
import Link from 'next/link';
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { BrowserRow } from './components/BrowserRow';

const Security: FC = () => {
  const { mounted } = useMounted();
  const [authUser] = useBehaviorSubject(authUser$());
  const emailFeature = authUser?.get("email");
  const [userEmails] = useBehaviorSubject(emailFeature?.userEmails$);
  const securityFeature = authUser?.get("security");
  const browserFeature = authUser?.get("browser");
  const [browsers] = useBehaviorSubject(browserFeature?.browsers$);
  const [shadowKeys] = useBehaviorSubject(securityFeature?.shadowKeys$);
  const isPasswordBound = securityFeature?.isPasswordBound();
  const isThisBrowserBound = securityFeature?.isThisBrowserBound();
  const isEmailBound = userEmails?.length > 0;
  const router = useRouter();

  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (error && error !== '') {
      switch (error) {
        case 'emailExists':
          setErrorMsg('Email already exists');
          break;
        default:
          setErrorMsg('Unknown error, please try again.');
          break;
      }
    }
  }, []);

  const bindDevice = () => {
    // securityFeature.bindDevice();
  }

  const bindPasskey = () => {
    router.push("/account/security/bind-passkey");
  }

  const bindPassword = () => {
    router.push("/account/security/bind-password");
  }

  const bindEmail = () => {
    router.push("/account/security/bind-email");
  }

  return (<div className="col-span-full">
    <Breadcrumbs entries={["security-center"]} />
    <Typography variant="h4">Security center</Typography>
    <p>
      Your identity is a Web3 identity, <b>protected by cryptographic keys</b>. Many Web3 applications require you to
      save those keys by yourself, and you will sometimes do that in unsafe ways. On the contrary, this service
      partially stores the complex cryptographic keys
      for you so you don&apos;t have to do it. Your keys are protected by your own browsers or passwords
      and <b>this app cannot do anything without your consent</b>. For this reason, you need to bind multiple devices and browsers,
      as this is your only way to recover your account later in case one of the devices is lost. <b>We cannot do that for you</b>.
    </p>
    <br /><br />
    {mounted && <>
      <div className='grid grid-cols-12 items-start gap-10'>
        <div className='col-span-full xl:col-span-6 flex flex-row gap-10 items-start'>
          <EmailIcon width={60} />
          {
            !isEmailBound &&
            <div className="flex flex-col flex-1">
              <div className="info mb-2">
                Attaching your <b>email address</b> to your account allows you to sign in later. Without email,
                you will be able to sign in using browser biometrics if configured.
              </div>
              <MainButton onClick={bindEmail} className="self-start">Verify your email address</MainButton>
              {errorMsg && <>
                <div className='text-red-500'>{errorMsg}</div>
              </>
              }
            </div>
          }
          {
            isEmailBound && <div className='flex flex-col flex-1'>
              <div>Email addresses already bound</div>
              <div>
                {userEmails.map(email => <div key={email.id} className="info mb-2">{email.email}</div>)}
              </div>
              <Link href="/account/security/bind-email">Bind more</Link>
              {errorMsg && <>
                <div className='text-red-500'>{errorMsg}</div>
              </>
              }
            </div>
          }
        </div>

        {/* Password */}
        <div className='col-span-full xl:col-span-6 flex flex-row gap-10 items-start'>
          <PasswordIcon width={60} />
          {
            !isPasswordBound &&
            <div className="flex flex-col flex-1">
              <div className="info mb-2">
                By defining <b>master password</b>, all your personal information stored in our service gets encrypted and can only
                be accessed with your approval. Note that this password can only changed if you have another encryption method
                defined, such as the browser biometrics.
              </div>
              <MainButton onClick={bindPassword} className="self-start">Bind a master password</MainButton>
            </div>
          }
          {
            isPasswordBound && <div className='flex flex-col flex-1'>
              <div>Your master password has been set</div>
              <Link href="/account/security/bind-password">Update password</Link>
            </div>
          }
        </div>

        {/* Passkey */}
        <div className='col-span-full xl:col-span-6 flex flex-row gap-10 items-start'>
          <FingerprintIcon width={60} />
          {
            !isThisBrowserBound &&
            <div className="flex flex-col flex-1">
              <div className="info mb-2">
                Binding your account to your <b>browser biometrics</b> allows you to sign in to this app (only from this browser)
                but also to unlock the secret key that decrypts all the data you store on our servers. Without this key, we,
                or potential attackers, are not able to read your personal information in clear text.
              </div>
              <MainButton onClick={bindPasskey} className="self-start">Secure with this browser biometrics</MainButton>
            </div>
          }
          {
            isThisBrowserBound && <div className='flex flex-col flex-1'>
              <div>Your browser is bound to your account</div>
              <Link href="/account/security/bind-passkey">Bind again</Link>
            </div>
          }
        </div>
      </div>

      <br /><br />

      <Typography variant="h5">My browsers</Typography>
      {browsers?.length == 0 && "No browser used so far."}
      {
        browsers && browsers.map((browser, i) => <BrowserRow key={i} browser={browser} />)
      }
    </>}
  </div>)
}

export default Security;