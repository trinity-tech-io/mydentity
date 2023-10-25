import { FC } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { IdentityInteractingApplication } from "@model/identity-interacting-application/identity-interacting-application";
import { CardStyled } from "../account/security/components/SecuritySection";
import Image from "next/image";
import DidTextfield from "../developers/components/DidTextfield";
import { NormalButton } from "@components/button";

const ApplicationBox: FC<{ application: IdentityInteractingApplication }> = ({
  application,
}) => {
  const [appName] = useBehaviorSubject(
    application?.interactingApplication?.name$
  );
  const [appIcon] = useBehaviorSubject(
    application?.interactingApplication?.icon$
  );
  const [requestedCredentials] = useBehaviorSubject(
    application?.requestedCredentials$
  );
  const [importedCredentials] = useBehaviorSubject(
    application?.importedCredentials$
  );

  return (
    <CardStyled elevation={0}>
      <Box className="relative z-10 flex flex-col h-full p-4">
        <Stack direction="row" spacing={1.5} pb={1} alignItems="center">
          <Avatar sx={{ width: 32, height: 32 }}>
            {appIcon && <Image src={appIcon} alt="" width={32} height={32} />}
          </Avatar>
          <Stack flexGrow={1}>
            <Typography variant="body2" fontWeight={600}>
              {appName}
            </Typography>
            <Typography variant="caption" fontStyle="italic" fontSize={9}>
              {application?.createdAt.toLocaleString()}
            </Typography>
          </Stack>
          <div>
            <NormalButton
              size="small"
              endIcon={<ExpandMoreIcon />}
              // onClick={showCredentials}
            >
              Show credentials
            </NormalButton>
          </div>
        </Stack>
        <DidTextfield
          value={application.interactingApplication.did}
          outerProps={{ readOnly: true }}
          inputProps={{ className: "opacity-80", style: { fontSize: 12 } }}
        />
      </Box>
    </CardStyled>
  );
};

export default ApplicationBox;
