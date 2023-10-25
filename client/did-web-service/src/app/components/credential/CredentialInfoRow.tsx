import { FC, MouseEvent, ReactNode, useRef, useState } from "react";
import {
  Fade,
  ListItemText,
  MenuItem,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Credential } from "@model/credential/credential";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { CredentialAvatar } from "./CredentialAvatar";
import { JsonViewer } from "./JsonViewer";
import SharedCountLabel, { ConformBadge } from "./SharedCountLabel";
import CredentialInteractingApp from "./CredentialInteractingApp";

export const CredentialInfoRow: FC<{ credential: Credential }> = ({
  credential,
}) => {
  const [isConform] = useBehaviorSubject(credential?.isConform$);
  const [requestingApplications] = useBehaviorSubject(
    credential?.requestingApplications$
  );
  const [openPopper, setOpenPopper] = useState(false);
  const menuEl = useRef(null);

  const handleEnter = (e: MouseEvent): void => {
    setOpenPopper(true);
  };

  const handleLeave = (): void => {
    setOpenPopper(false);
  };

  return (
    <>
      <MenuItem
        disableRipple
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        ref={menuEl}
      >
        <div className="flex items-center w-full">
          <Stack alignItems="center" flexGrow={1} spacing={1.5} direction="row">
            <div className="relative">
              <CredentialAvatar
                credential={credential}
                width={32}
                height={32}
              />
              {isConform && (
                <ConformBadge className="absolute right-0 bottom-0 translate-x-[10%] translate-y-[20%]" />
              )}
            </div>
            <ListItemText
              primary={
                <Typography variant="body2" fontWeight={600}>
                  {credential.getDisplayableTitle()}
                </Typography>
              }
              secondary={
                <Typography variant="caption" sx={{ color: "#DDD" }}>
                  {credential.getDisplayValue() && (
                    <JsonViewer data={credential.getDisplayValue()} />
                  )}
                </Typography>
              }
              sx={{ my: 0 }}
              primaryTypographyProps={{
                sx: {
                  lineHeight: 1.3,
                },
              }}
              secondaryTypographyProps={{
                sx: {
                  lineHeight: 1,
                },
              }}
            />
          </Stack>
          <SharedCountLabel count={requestingApplications?.length || 0} />
          <KeyboardArrowRightIcon
            className="ml-1 mr-[-.5rem]"
            sx={{
              fontSize: 14,
              visibility: requestingApplications?.length ? "visible" : "hidden",
            }}
          />
        </div>
      </MenuItem>
      {!!requestingApplications?.length && (
        <Popper
          open={openPopper}
          anchorEl={menuEl.current}
          placement="right-start"
          transition
          onMouseEnter={(e): void => {
            setOpenPopper(true);
          }}
          onMouseLeave={(e): void => {
            setOpenPopper(false);
          }}
        >
          {({ TransitionProps, placement }): ReactNode => (
            <Fade
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper sx={{ py: 1 }}>
                {requestingApplications.map((app, _id) => (
                  <CredentialInteractingApp key={_id} app={app} />
                ))}
              </Paper>
            </Fade>
          )}
        </Popper>
      )}
    </>
  );
};
