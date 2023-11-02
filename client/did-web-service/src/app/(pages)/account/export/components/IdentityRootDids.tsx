"use client";
import React, { FC, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { IdentityAvatar } from "@components/identity/IdentityAvatar";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { DislayName } from "./DislayName";
import DidTextfield from "@/app/(pages)/developers/components/DidTextfield";
import { NormalButton } from "@components/button";

export const IdentityRootDids: FC<{
  identities: RegularIdentity[];
}> = ({ identities }) => {
  const [expanded, setExpanded] = useState(true);

  const handleExpanding = (): void => {
    setExpanded(!expanded);
  };
  return (
    <AnimatePresence initial={false}>
      {identities.map((identity, index) =>
        !expanded && index > 0 ? null : (
          <motion.section
            key={index}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <Box className="relative z-10 flex flex-col">
              <Stack direction="row" spacing={1.5} pb={1} alignItems="center">
                <IdentityAvatar identity={identity} width={32} height={32} />
                <Stack flexGrow={1}>
                  <Typography variant="body2" fontWeight={600}>
                    <DislayName identity={identity} />
                  </Typography>
                  <Typography
                    variant="caption"
                    fontStyle="italic"
                    fontSize={10}
                  >
                    Created : {identity?.createdAt.toLocaleString()}
                  </Typography>
                </Stack>
                {index === 0 && identities.length > 1 && (
                  <div>
                    <NormalButton
                      size="small"
                      endIcon={
                        expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
                      }
                      onClick={handleExpanding}
                    >
                      Show {expanded ? "less" : "more"}
                    </NormalButton>
                  </div>
                )}
              </Stack>
              <DidTextfield
                value={identity.did}
                outerProps={{ readOnly: true }}
                inputProps={{
                  className: "opacity-80",
                  style: { fontSize: 12 },
                }}
              />
            </Box>
          </motion.section>
        )
      )}
    </AnimatePresence>
  );
};
