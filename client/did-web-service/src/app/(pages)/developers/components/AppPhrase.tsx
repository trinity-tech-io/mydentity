import { FC, useCallback, useEffect, useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CopyButton } from "@components/button";
import { authUser$ } from "@services/user/user.events";
import { ApplicationIdentity } from "@model/application-identity/application-identity";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import clsx from "clsx";

/**
 * Readable Application DID mnemonics section used in application detail page
 */
const AppPhrase: FC<{ appIdentity: ApplicationIdentity }> = ({
  appIdentity,
}) => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [phrases, setPhrases] = useState("");

  useEffect(() => {
    if (activeUser && appIdentity) handleExportMnemonic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser, appIdentity]);

  const handleClickShowPhrases: React.MouseEventHandler = () =>
    setShowMnemonic((show) => !show);

  const handleMouseDownPhrases: React.MouseEventHandler = (event) => {
    event.preventDefault();
  };

  const handleExportMnemonic = useCallback(async (): Promise<void> => {
    const mnemonic = await activeUser
      .get("identity")
      .exportMnemonic(appIdentity.identityRootId);
    if (mnemonic) {
      setPhrases(mnemonic);
    }
  }, [activeUser, appIdentity]);
  return (
    <Stack flexGrow={1} justifyContent="end">
      <Stack direction="row" alignItems="center" className="mt-2" spacing={1}>
        <Typography
          variant="caption"
          className="break-all flex-1"
          color="text.primary"
          fontWeight={600}
          fontSize={10}
        >
          APPLICATION DID MNEMONICS
        </Typography>
        <div className="">
          <IconButton
            size="small"
            sx={{ p: "5px" }}
            onClick={handleClickShowPhrases}
            onMouseDown={handleMouseDownPhrases}
            color="primary"
          >
            {showMnemonic ? (
              <VisibilityOff sx={{ fontSize: { xs: 16, sm: 20 } }} />
            ) : (
              <Visibility sx={{ fontSize: { xs: 16, sm: 20 } }} />
            )}
          </IconButton>
          <CopyButton text={appIdentity.did} />
        </div>
      </Stack>
      <Box
        sx={{
          background: (theme) => theme.palette.primary.light,
          borderRadius: 1,
          ".redacted": {
            fontFamily: "Redacted Script",
          },
        }}
      >
        <Typography
          variant="caption"
          color="text.primary"
          lineHeight={1.3}
          align="center"
          className={clsx("block px-1 py-2", !showMnemonic && "redacted")}
          fontSize={10}
        >
          {phrases}
        </Typography>
      </Box>
      <Typography variant="caption" color="error.main" fontSize={10} align="center" className="pt-1">
        Reminder: Please store the mnemonics in a secure place
      </Typography>
    </Stack>
  );
};

export default AppPhrase;
