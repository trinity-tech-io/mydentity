"use client";
import { FC } from "react";
import { LandingCard } from "@components/card";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { Box, IconButton, Typography, styled } from "@mui/material";
import { activeIdentity$ } from "@services/identity/identity.events";
import { shortenDID } from "@services/identity/identity.utils";
import clsx from "clsx";

const GradientTypography = styled(Typography)({
  backgroundImage: "linear-gradient(180deg, #FFFFFFAE, #FFFFFF)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  display: "inline",
});
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
      footer={<Typography variant="caption" fontSize="7pt">{shortenDID(identity.did, 8)}</Typography>}
    >
      <GradientTypography variant="body2" fontWeight={600} className="pb-2">
        {name}
      </GradientTypography>
    </LandingCard>
  );
};