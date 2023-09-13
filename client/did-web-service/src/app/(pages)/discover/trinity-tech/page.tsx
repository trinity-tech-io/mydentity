"use client";
import { MainButton } from "@components/generic/MainButton";
import { FC } from "react";

const TrinityTechPage: FC = () => {
  const openTrinityTechWebsite = (): void => {
    window.open("https://trinity-tech.io", "_blank");
  }

  return (<div className="col-span-full">
    Trinity Tech is the company that delivers this identity application. Trinity tech is specialized in building Elastos technologies and services.
    <MainButton onClick={openTrinityTechWebsite} className="mt-6">Discover Trinity tech website</MainButton>
  </div>)
}

export default TrinityTechPage;