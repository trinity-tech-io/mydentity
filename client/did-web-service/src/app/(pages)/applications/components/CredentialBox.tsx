import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { CardStyled } from "@/app/(pages)/account/security/components/SecuritySection";
import { Credential } from "@model/credential/credential";
import { CredentialAvatar } from "@components/credential/CredentialAvatar";
import { JsonViewer } from "@components/credential/JsonViewer";

const CredentialBox: FC<{
  credential: Credential;
}> = ({ credential }) => {
  return (
    <div className="relative h-full">
      <CardStyled
        className="h-full"
        elevation={0}
        sx={{
          pl: "12px",
          pr: "4px",
          py: "10px",
          display: "grid",
          verticalAlign: "middle",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          overflow="hidden"
          sx={{ height: 42 }}
        >
          <Stack
            direction="row"
            spacing={1}
            flexGrow={1}
            alignItems="center"
            overflow="hidden"
          >
            <div className="relative">
              <CredentialAvatar
                credential={credential}
                width={32}
                height={32}
              />
            </div>
            <Stack overflow="hidden">
              <Typography variant="body2" fontWeight={600} noWrap={true}>
                {credential.getDisplayableTitle()}
              </Typography>
              <Typography variant="caption" fontSize="9pt" noWrap={true}>
                {credential.getDisplayValue() && (
                  <JsonViewer data={credential.getDisplayValue()} />
                )}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardStyled>
    </div>
  );
};
export default CredentialBox;
