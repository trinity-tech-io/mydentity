"use client"
import { Typography } from "@mui/material";
import { CreatedManagedIdentity, configure } from "@trinitytech/did-web-service-sdk";
import { FC, useState } from "react";
import { FormSubmissionStep } from "./FormSubmissionStep";
import { IntroStep } from "./IntroStep";
import "./style.css";

configure({
  webServiceEndpoint: process.env.NEXT_PUBLIC_FRONTEND_URL,
  webServiceAPIEndpoint: process.env.NEXT_PUBLIC_BACKEND_URL,
});

enum Step {
  Intro,
  FillForm
}

const DonationDemo: FC = () => {
  const [step, setStep] = useState<Step>(Step.Intro);
  const [createdIdentity, setCreatedIdentity] = useState<CreatedManagedIdentity>(null);

  return (
    <div className="col-span-full">
      <div className="flex flex-col gap-4">
        <Typography variant="h6">Donation demo</Typography>

        {step === Step.Intro && <IntroStep goToNextStep={() => setStep(Step.FillForm)} />}
        {step === Step.FillForm && <FormSubmissionStep
          onCreatedIdentity={setCreatedIdentity}
          onImportedCredentials={() => { }} />}
      </div>
    </div>
  )
}

export default DonationDemo;