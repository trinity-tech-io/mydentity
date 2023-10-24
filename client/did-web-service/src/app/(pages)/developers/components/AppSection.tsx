import { FC, useEffect, useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useRouter } from "next13-progressbar";
import { CardStyled } from "../../account/security/components/SecuritySection";
import { CredentialAvatar } from "@components/credential/CredentialAvatar";
import { Credential } from "@model/credential/credential";
import DidTextfield from "./DidTextfield";
import { ApplicationIdentity } from "@model/application-identity/application-identity";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";

const AppSection: FC<{ appIdentity: ApplicationIdentity }> = ({
  appIdentity,
}) => {
  const [localAppIdentityCredentials] = useBehaviorSubject(
    appIdentity?.credentials().credentials$
  );
  const [localAppCredential, setLocalAppCredential] =
    useState<Credential>(null);
  const [appName, setAppName] = useState<string>(null);
  const router = useRouter();

  useEffect(() => {
    setLocalAppCredential(
      appIdentity?.credentials().getCredentialByType("ApplicationCredential")
    );
  }, [appIdentity, localAppIdentityCredentials]);

  useEffect(() => {
    if (localAppCredential) {
      setAppName(localAppCredential?.getSubject().getProperty("name"));
    }
  }, [localAppCredential]);

  const openAppDetail = (): void => {
    router.push(`/developers/application?did=${appIdentity.did}`);
  };

  return (
    <CardStyled elevation={0}>
      <Box className="relative z-10 flex flex-col h-full p-4">
        <Stack direction="row" spacing={1.5} pb={1}>
          <IconButton sx={{ p: 0 }} color="inherit" onClick={openAppDetail}>
            <CredentialAvatar
              credential={localAppCredential}
              width={32}
              height={32}
            />
          </IconButton>
          <Stack>
            <Typography variant="body2" fontWeight={600}>
              {appName}
            </Typography>
            <Typography variant="caption" fontStyle="italic" fontSize={9}>
              {localAppCredential?.createdAt.toLocaleString()}
            </Typography>
          </Stack>
        </Stack>
        <DidTextfield
          value={appIdentity.did}
          outerProps={{ readOnly: true }}
          inputProps={{ className: "opacity-80", style: { fontSize: 12 } }}
        />
      </Box>
    </CardStyled>
  );
};

export default AppSection;
