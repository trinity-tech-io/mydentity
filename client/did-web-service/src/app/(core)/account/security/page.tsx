"use client";
import { MainButton } from "@components/MainButton";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { Typography } from "@mui/material";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC } from "react";

const Security: FC = () => {
  const { mounted } = useMounted();
  const [authUser] = useBehaviorSubject(authUser$());
  const securityFeature = authUser?.get("security");
  const deviceFeature = authUser?.get("device");
  const [devices] = useBehaviorSubject(deviceFeature?.devices$);
  const [shadowKeys] = useBehaviorSubject(securityFeature?.shadowKeys$); // KEY THIS to lazily fetch the shadow keys
  const isPasswordBound = securityFeature?.isPasswordBound();
  const router = useRouter();

  const bindDevice = () => {
    securityFeature.bindDevice();
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
    <Typography variant="h4">Security center</Typography>
    <p>
      Your identity is a Web3 identity, <b>protected by cryptographic keys</b>. Many Web3 applications require you to
      save those keys by yourself, and you will sometimes do that in unsafe ways. On the contrary, this service
      partially stores the complex cryptographic keys
      for you so you don&apos;t have to do it. Your keys are protected by your own devices or passwords
      and <b>this app cannot do anything without your consent</b>. For this reason, you need to bind multiple devices and browsers,
      as this is your only way to recover your account later in case one of the devices is lost. <b>We cannot do that for you</b>.
    </p>
    <br /><br />
    {mounted && <>
      <Typography variant="h5">My devices</Typography>
      {devices?.length == 0 && "You haven't bound any device yet. Start binding this browser now to secure your account."}
      {
        devices && <>
          {devices.map(device => <div key={device.id}>{device.name}</div>)}
        </>
      }
      <br /><br />
      {shadowKeys && <>
        Password bound: <b>{isPasswordBound ? "YES" : "NO"}</b>
      </>}
      <br /><br />

      <div className="flex flex-col mb-4">
        <MainButton onClick={bindEmail} >Verify your email address</MainButton>
        <div className="info">
          Attaching your email address to your account allows you to sign in later. Without email,
          you will be able to sign in using browser biometrics if configured.
        </div>
      </div>

      {/* passkey */}
      <div className="flex flex-col mb-4">
        <MainButton onClick={bindPasskey} >Secure with this browser biometrics</MainButton>
        <div className="info">
          Binding your account to your browser biometrics allows you to sign in to this app (only from this browser)
          but also to unlock the secret key that decrypts all the data you store on our servers. Without this key, we,
          or potential attackers, are not able to read your personal information in clear text.
        </div>
      </div>

      <div className="flex flex-col mb-4">
        <MainButton onClick={bindPassword} >Bind a master password</MainButton>
        <div className="info">
          By defining master password, all your personal information stored in our service gets encrypted and can only
          be accessed with your approval. Note that this password can only changed if you have another encryption method
          defined, such as the browser biometrics.
        </div>
      </div>

    </>}
  </div>)
}

export default Security;