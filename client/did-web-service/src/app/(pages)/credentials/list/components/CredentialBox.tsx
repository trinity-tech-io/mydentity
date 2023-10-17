import { FC } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { CardStyled } from "@/app/(pages)/account/security/components/SecuritySection";
import { Credential } from "@model/credential/credential";
import { CredentialAvatar } from "@components/credential/CredentialAvatar";
import { JsonViewer } from "@components/credential/JsonViewer";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import SharedCountLabel from "@components/credential/SharedCountLabel";

const CredentialBox: FC<{ credential: Credential }> = ({ credential }) => {
  const [requestingApplications] = useBehaviorSubject(
    credential?.requestingApplications$
  );
  const [isConform] = useBehaviorSubject(credential?.isConform$);

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
        <Stack direction="row" alignItems="center" overflow="hidden">
          <Stack
            direction="row"
            spacing={1}
            flexGrow={1}
            alignItems="center"
            overflow="hidden"
          >
            <CredentialAvatar credential={credential} width={32} height={32} />
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
          <div>
            <IconButton
              size="small"
              color="inherit"
              // onClick={(event): void => {
              //   handleOpenMenu(event, credential);
              // }}
            >
              <MoreVertIcon fontSize="small"/>
            </IconButton>
          </div>
        </Stack>
      </CardStyled>
      <div className="inline-flex absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3">
        <SharedCountLabel
          count={requestingApplications?.length || 0}
          isConform={isConform}
        />
      </div>
    </div>
  );
};
export default CredentialBox;
