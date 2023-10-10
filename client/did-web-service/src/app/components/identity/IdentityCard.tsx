"use client";
import { FC, useEffect } from "react";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { LandingCard } from "@components/card";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { Box, IconButton, Typography } from "@mui/material";
import { useToast } from "@services/feedback.service";
import { activeIdentity$ } from "@services/identity/identity.events";
import { shortenDID } from "@services/identity/identity.utils";
import clsx from "clsx";

/**
 * Component used as card styled identity in My identity page
 */
export const IdentityCard: FC<{
  identity: RegularIdentity;
}> = ({ identity }) => {
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const { showSuccessToast } = useToast();
  const [name] = useBehaviorSubject(identity.profile().name$);

  // useEffect(() => {
  //   if (activeIdentity == identity) {
  //     const shortDid = shortenDID(identity.did, 8)
  //     const text = 'Your current active identity is: ' + name + '(' + shortDid + ')'
  //     showSuccessToast(text);
  //   }
  // }, [showSuccessToast, name, activeIdentity, identity]);

  return (
    <LandingCard
      className={clsx(
        "w-[26rem] h-auto bg-neutral-950",
        activeIdentity != identity ? "bg-[#675216]" : ""
      )}
      waveIconVisible={false}
      topRightSection={
        <div
          className={clsx(
            "flex",
            activeIdentity != identity ? "items-center" : ""
          )}
        >
          <div className="flex">
            <div className="flex flex-col items-end">
              {activeIdentity == identity && (
                <Box className="rounded-[4px] text-[6pt] px-3 py-0.5 mt-1 inline-block text-white whitespace-nowrap bg-[#9291A5]">
                  ACTIVE IDENTITY
                </Box>
              )}
              <Typography variant="caption" fontSize={10} fontStyle="italic" lineHeight={2.2}>
                Last used :{" "}
                {identity.lastUsedAt$.getValue().toLocaleString()}
              </Typography>
            </div>
          </div>
          <div className="flex flex-col">
            <IconButton
              size="small"
              color="inherit"
              sx={{ p: 0.5 }}
              // onClick={(event): void => {
              //   handleOpenMenu(event, credential);
              // }}
            >
              <MoreVertIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </div>
        </div>
      }
      footer={<Typography variant="caption">{identity.did}</Typography>}
    >
      <div className="flex flex-col mb-[5%]">
        <label htmlFor="holder-name" className="text-white text-[10px]">
          IDENTITY NAME
        </label>
        <Typography variant="h5" fontSize={26} fontWeight={600}>
          {name}
        </Typography>
      </div>
    </LandingCard>
  );
};
