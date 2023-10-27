import { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LandingCard } from "@components/card";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { ApplicationIdentity } from "@model/application-identity/application-identity";
import { Credential } from "@model/credential/credential";
import GradientTypography from "@components/text/GradientTypography";

/**
 * Component used as card styled identity in application page
 */
const ApplicationCard: FC<{
  identity: ApplicationIdentity;
  wrapperClassName?: string;
}> = ({ identity, wrapperClassName="" }) => {
  const TAG = "ApplicationCard";
  const [localAppIdentityCredentials] = useBehaviorSubject(
    identity?.credentials().credentials$
  ); // Credentials of the app identity
  const [localAppCredential, setLocalAppCredential] =
    useState<Credential>(null);
  const [appName, setAppName] = useState<string>(null);

  useEffect(() => {
    setLocalAppCredential(
      identity?.credentials().getCredentialByType("ApplicationCredential")
    );
  }, [identity, localAppIdentityCredentials]);

  useEffect(() => {
    if (localAppCredential) {
      setAppName(localAppCredential?.getSubject().getProperty("name"));
    }
  }, [localAppCredential]);

  return (
    <>
      <LandingCard
        className={clsx("w-[26rem] h-auto bg-neutral-950", wrapperClassName)}
        waveIconVisible={false}
        footer={<Typography variant="caption">{identity?.did}</Typography>}
      >
        <div className="flex flex-col mb-[5%]">
          <label htmlFor="holder-name" className="text-white text-[10px]">
            APPLICATION NAME
          </label>
          <GradientTypography variant="h5" fontSize={26} fontWeight={600}>
            {appName || "Unnamed application"}
          </GradientTypography>
        </div>
      </LandingCard>
    </>
  );
};

export default ApplicationCard;
