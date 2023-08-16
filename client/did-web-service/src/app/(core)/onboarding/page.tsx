"use client";
import { MainButton } from "@components/MainButton";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC } from "react";

const OnBoarding: FC = () => {
  const router = useRouter();

  const goToSecurityCenter = async () => {
    router.push("/account/security");
  }

  return (
    <div className="col-span-full">
      <Typography variant="h5" className='w-full text-center font-semibold mt-32 mb-24 leading-9'>
        You're now on board, welcome to your Web3 identity.
      </Typography>
      <p>
        Your identity is a Web3 identity, <b>protected by cryptographic keys</b>. Many Web3 applications require you to
        save those keys by yourself, and you will sometimes do that in unsafe ways. On the contrary, this service
        partially stores the complex cryptographic keys
        for you so you don&apos;t have to do it. Your keys are protected by your own devices or passwords
        and <b>this app cannot do anything without your consent</b>. For this reason, you need to bind multiple devices and browsers,
        as this is your only way to recover your account later in case one of the devices is lost. <b>We cannot do that for you</b>.
      </p>

      <div className="flex flex-col mt-4 gap-4">
        <MainButton onClick={goToSecurityCenter}>Enter security center</MainButton>
      </div>
    </div>
  )
}

export default OnBoarding;