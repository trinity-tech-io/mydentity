"use client";
import { MainButton } from "@components/generic/MainButton";
import { FC } from "react";

const EssentialsPage: FC = () => {
  const openEssentialsWebsite = (): void => {
    window.open("https://d.web3essentials.io", "_blank");
  }

  return (<div className="col-span-full">
    Essentials is a <b>mobile app</b> to manage <b>Web3 identities</b> (like this web app) but also cryptocurrencies. In Essentials, <b>everything is non custodial</b>, meaning that there is no service storing any data about you. You, as the user, are responsible to save your cryptographic keys. Full ownership, additional responsibility. The choice is yours.

    <MainButton onClick={openEssentialsWebsite} className="mt-6">Get Essentials</MainButton>
  </div>)
}

export default EssentialsPage;