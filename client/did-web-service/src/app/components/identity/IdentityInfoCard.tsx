"use client";
import { FC } from "react";
import { LandingCard } from "@components/card";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { activeIdentity$ } from "@services/identity/identity.events";
import { shortenDID } from "@services/identity/identity.utils";
import clsx from "clsx";
import GradientTypography from "@components/text/GradientTypography";

/**
 * Component used as card styled identity on top left sidebar
 */
export const IdentityInfoCard: FC<{
  identity: RegularIdentity;
}> = ({ identity }) => {
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [name] = useBehaviorSubject(identity.profile().name$);

  return (
    <LandingCard
      className={clsx(
        "w-full",
        activeIdentity != identity ? "bg-[#675216]" : "bg-neutral-950"
      )}
      waveIconVisible={false}
      footer={
        <Typography variant="inherit" fontSize="7pt" sx={{ color: "#fff" }}>
          {shortenDID(identity.did, 8)}
        </Typography>
      }
    >
      <GradientTypography variant="body2" fontWeight={600} className="pb-2">
        {name || "Unnamed identity"}
      </GradientTypography>
    </LandingCard>
  );
};
