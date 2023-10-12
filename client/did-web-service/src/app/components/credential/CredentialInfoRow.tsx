import { FC } from "react";
import {
  Avatar,
  ListItemText,
  TableCell,
  Typography,
  styled,
} from "@mui/material";
import { DetailTableRow } from "@components/generic/DetailTable";
import { CredentialAvatar } from "./CredentialAvatar";
import { Credential } from "@model/credential/credential";
import { JsonViewer } from "./JsonViewer";

export const CredentialInfoRow: FC<{ credential: Credential }> = ({
  credential,
}) => {
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
            <div className="w-4 h-4 bg-[#9291A5] inline-flex justify-center items-center p-2 text-[7pt] rounded-[4px]">
              1
            </div>
          </TableCell>
        </>
      }
    />
  );
};
