import { FC, ReactNode } from "react";
import { Icon as ReactIcon } from "@iconify/react";
import { DetailTableRow } from "@components/generic/DetailTable";
import { Avatar, Box, ListItemText, TableCell, styled } from "@mui/material";
import SecurityStatusIcon from "@components/security/SecurityIcon";

const IconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: "#3A3A3A",
  color: "#DDD",
  width: 36,
  height: 36,
  padding: 8,
}));

const TitleByMethod = {
  email: {
    title: "Sign in with email address",
    icon: "entypo:email",
    action: "LINKED"
  },
  browser: {
    title: "Sign in with this browser",
    icon: "fluent-mdl2:website",
    action: "BOUND"
  },
};
export const AccountAccessRow: FC<{
  method: "email" | "browser";
  secondaryDetail: string | ReactNode;
}> = ({ method, secondaryDetail }) => {
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
                    <SecurityStatusIcon turnedOn={false} />
                </div>
              }
              secondary={<span className="text-[8pt] text-[#9291A5]">{secondaryDetail}</span>}
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
          <TableCell sx={{padding: 0}}>
            <Box className="rounded-md bg-[#EA4335] text-[8pt] px-3 py-0.5 inline-block text-white">
              {`${method.toUpperCase()} NOT ${TitleByMethod[method].action}`}
            </Box>
          </TableCell>
        </>
      }
    />
  );
};
