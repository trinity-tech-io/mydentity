"use client"
import { MainButton } from "@components/MainButton";
import { configure, createIdentity } from "@trinitytech/did-web-service-sdk";
import { FC } from "react";

configure({
  webServiceEndpoint: process.env.NEXT_PUBLIC_FRONTEND_URL,
  webServiceAPIEndpoint: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const DonationDemo: FC = () => {

  const onCreateIdentity = async () => {
    console.log("Creating a remote identity");
    await createIdentity()
    console.log("Remote identity creation ended");
  }

  return (
    <div className="col-span-full">
      <div className="flex flex-col gap-4">
        Hey donation
        <MainButton onClick={onCreateIdentity}>Create identity</MainButton>
      </div>
    </div>
  )
}

export default DonationDemo;