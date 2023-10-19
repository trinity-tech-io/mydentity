"use client"
import { Typography } from "@mui/material";
import { CreatedManagedIdentity } from "@trinitytech/mydentity-sdk";
import { FC, useState } from "react";
import { FormSubmissionStep } from "./components/FormSubmissionStep";
import { IntroStep } from "./components/IntroStep";
import "./style.css";

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