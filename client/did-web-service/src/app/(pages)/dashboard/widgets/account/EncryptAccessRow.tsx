import { FC, ReactNode } from "react";
import { Icon as ReactIcon } from "@iconify/react";
import { DetailTableRow } from "@components/generic/DetailTable";
import { Avatar, Box, ListItemText, TableCell, styled } from "@mui/material";
import SecurityStatusIcon from "@components/security/SecurityIcon";
import clsx from "clsx";

const IconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: "#3A3A3A",
  color: "#DDD",
  width: 36,
  height: 36,
  padding: 8,
}));

const TitleByMethod = {
  password: {
    title: "Decrypt data using password",
    icon: "ic:round-password",
    action: "SET",
  },
  biometrics: {
    title: "Decrypt data using browser's biometrics",
    icon: "fluent:fingerprint-48-filled",
    action: "SET",
  },
};
export const EncryptAccessRow: FC<{
  method: "password" | "biometrics";
  secondaryDetail: string | ReactNode;
  isSet: boolean;
}> = ({ method, secondaryDetail, isSet }) => {
  return (
    <DetailTableRow
      className="h-[3.5rem]"
      avatar={
        <IconAvatar>
          <ReactIcon icon={TitleByMethod[method].icon} />
        </IconAvatar>
      }
      rowCells={
        <>
          <TableCell>
            <ListItemText
              className="flex-1"
              primary={
                <div className="flex items-center gap-1">
                  <span className="font-medium text-[11pt] text-[#9291A5]">
                    {TitleByMethod[method].title}
                  </span>
                  <SecurityStatusIcon turnedOn={isSet} />
                </div>
              }
              secondary={
                <span className="text-[8pt] text-[#9291A5]">
                  {secondaryDetail}
                </span>
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
            <Box
              className={clsx(
                "rounded-md text-[8pt] px-3 py-0.5 inline-block text-white whitespace-nowrap",
                isSet ? "bg-[#34A853]" : "bg-[#EA4335]"
              )}
            >
              {`${method.toUpperCase()} ${isSet ? "" : "NOT "}${TitleByMethod[method].action}`}
            </Box>
          </TableCell>
        </>
      }
    />
  );
};
