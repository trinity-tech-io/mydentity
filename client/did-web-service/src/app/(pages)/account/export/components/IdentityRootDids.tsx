"use client";
import { IdentityAvatar } from "@components/identity/IdentityAvatar";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import React, { FC } from "react";
import { DislayName } from "./DislayName";
import { Box, Stack, Typography } from "@mui/material";
import DidTextfield from "@/app/(pages)/developers/components/DidTextfield";

export const IdentityRootDids: FC<{
  identities: RegularIdentity[];
}> = ({ identities }) => {
  return (
    <>
      {identities.map((identity, index) => (
        <Box key={index} className="relative z-10 flex flex-col">
          <Stack direction="row" spacing={1.5} pb={1} alignItems="center">
            <IdentityAvatar identity={identity} width={32} height={32} />
            <Stack flexGrow={1}>
              <Typography variant="body2" fontWeight={600}>
                <DislayName identity={identity}/>
              </Typography>
              <Typography variant="caption" fontStyle="italic" fontSize={9}>
                {identity?.createdAt.toLocaleString()}
              </Typography>
            </Stack>
            {/* <div>
            <NormalButton
              size="small"
              endIcon={
                expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
              }
              onClick={handleExpanding}
            >
              Show less
            </NormalButton>
          </div> */}
          </Stack>
          <DidTextfield
            value={identity.did}
            outerProps={{ readOnly: true }}
            inputProps={{ className: "opacity-80", style: { fontSize: 12 } }}
          />
        </Box>
      ))}
    </>
  );
};
