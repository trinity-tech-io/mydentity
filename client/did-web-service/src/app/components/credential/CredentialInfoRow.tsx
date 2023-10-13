import { FC } from "react";
import { ListItemText, TableCell, Typography } from "@mui/material";
import { DetailTableRow } from "@components/generic/DetailTable";
import { CredentialAvatar } from "./CredentialAvatar";
import { Credential } from "@model/credential/credential";
import { JsonViewer } from "./JsonViewer";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import SharedCountLabel from "./SharedCountLabel";

export const CredentialInfoRow: FC<{ credential: Credential }> = ({
  credential,
}) => {
  const [isConform] = useBehaviorSubject(credential?.isConform$);
  const [requestingApplications] = useBehaviorSubject(credential?.requestingApplications$);

  return (
    <DetailTableRow
      className="h-[3.5rem]"
      avatar={
        <CredentialAvatar credential={credential} width={32} height={32} />
      }
      rowCells={
        <>
          <TableCell>
            <ListItemText
              className="flex-1"
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
          </TableCell>
          <TableCell sx={{ padding: 0 }}>
            <SharedCountLabel count={requestingApplications?.length || 0} isConform={isConform} />
          </TableCell>
        </>
      }
    />
  );
};
