"use client";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  ClickAwayListener,
  Fade,
  IconButton,
  Paper,
  Popper,
  TableCell,
  Typography,
  styled,
} from "@mui/material";
import clsx from "clsx";
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material";
import { useToast } from "@services/feedback.service";
import { LandingCard } from "@components/card";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { activeIdentity$ } from "@services/identity/identity.events";
import ChipIcon from "@assets/images/chip.svg";
import { shortenDID } from "@services/identity/identity.utils";
import { IconAvatar } from "@components/feature/DetailLine";
import { NormalButton } from "@components/button";
import { DetailTable } from "@components/generic/DetailTable";
import { CredentialInfoRow } from "@components/credential/CredentialInfoRow";

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
 * Component used as card styled identity in My identities page
 */
export const IdentityCard: FC<{
  identity: RegularIdentity;
  onClickChip?: Function;
}> = ({ identity, onClickChip = () => {} }) => {
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const { showSuccessToast } = useToast();
  const [name] = useBehaviorSubject(identity.profile().name$);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [credentials] = useBehaviorSubject(
    identity?.credentials().credentials$
  );

  // useEffect(() => {
  //   if (activeIdentity == identity) {
  //     const shortDid = shortenDID(identity.did, 8)
  //     const text = 'Your current active identity is: ' + name + '(' + shortDid + ')'
  //     showSuccessToast(text);
  //   }
  // }, [showSuccessToast, name, activeIdentity, identity]);

  const handleClickChip: MouseEventHandler<HTMLButtonElement> = (e) => {
    setMenuAnchorEl(e.currentTarget);
    onClickChip();
  };
  return (
    <>
      <LandingCard
        className={clsx(
          "w-[26rem] h-auto",
          activeIdentity != identity ? "bg-[#675216]" : "bg-neutral-950"
        )}
        waveIconVisible={false}
        chipClickable={true}
        handleClickChip={handleClickChip}
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
                <Typography
                  variant="caption"
                  fontSize={10}
                  fontStyle="italic"
                  lineHeight={2.2}
                >
                  Last used : {identity.lastUsedAt$.getValue().toLocaleString()}
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
          <GradientTypography variant="h5" fontSize={26} fontWeight={600}>
            {name}
          </GradientTypography>
        </div>
      </LandingCard>
      <Popper
        open={Boolean(menuAnchorEl)}
        anchorEl={menuAnchorEl}
        placement="bottom-start"
        transition
      >
        {({ TransitionProps }) => (
          <ClickAwayListener
            onClickAway={() => {
              setMenuAnchorEl(null);
            }}
          >
            <Fade {...TransitionProps} timeout={350}>
              <Paper sx={{ padding: 2, minWidth: 300 }}>
                <div className="inline-flex items-center gap-2 w-full">
                  <div className="flex flex-1 items-center">
                    <IconAvatar className="mr-2">
                      <div className="w-4 h-4 flex justify-center">
                        <ChipIcon />
                      </div>
                    </IconAvatar>
                    <Typography fontWeight={600}>Credentials</Typography>
                  </div>
                  <NormalButton
                    size="small"
                    endIcon={<NavigateNextIcon />}
                    // onClick={showAllAction}
                  >
                    Show all
                  </NormalButton>
                </div>
                <Box
                  className="mt-4"
                  sx={{ "thead th:first-child": { display: "none" } }}
                >
                  <DetailTable
                    headCells={
                      <>
                        <TableCell colSpan={2}>DETAILS</TableCell>
                        <TableCell>SHARED APPS</TableCell>
                      </>
                    }
                    bodyRows={credentials.map((c, _id) => (
                      <CredentialInfoRow credential={c} key={_id} />
                    ))}
                  />
                </Box>
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
};
