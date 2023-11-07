import { FC, ReactNode } from "react";
import { useRouter } from "next13-progressbar";
import clsx from "clsx";
import { Icon as ReactIcon } from "@iconify/react";
import { DetailTableRow } from "@components/generic/DetailTable";
import { Box, ListItemText, TableCell } from "@mui/material";
import SecurityStatusIcon from "@components/security/SecurityIcon";
import IconAvatar from "../../components/IconAvatar";

const TitleByMethod = {
  email: {
    title: "Sign in with email address",
    icon: "entypo:email",
    action: "LINKED",
  },
  browser: {
    title: "Sign in with this browser",
    icon: "fluent-mdl2:website",
    action: "BOUND",
  },
};
export const AccountAccessRow: FC<{
  method: "email" | "browser";
  secondaryDetail: string | ReactNode;
  isSet: boolean;
}> = ({ method, secondaryDetail, isSet }) => {
  const router = useRouter();
  const handleRowClick = (): void => {
    router.push("/account/security");
  };
  return (
    <DetailTableRow
      props={{ hover: true }}
      onClick={(): void => {
        handleRowClick();
      }}
      className="h-[3.5rem] cursor-pointer"
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
                  <span
                    className={clsx(
                      "font-medium text-[11pt]",
                      isSet ? "" : "text-[#9291A5]"
                    )}
                  >
                    {TitleByMethod[method].title}
                  </span>
                  <SecurityStatusIcon turnedOn={isSet} />
                </div>
              }
              secondary={
                <span
                  className={clsx("text-[8pt]", isSet ? "" : "text-[#9291A5]")}
                >
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
              {`${method.toUpperCase()} ${isSet ? "" : "NOT "}${
                TitleByMethod[method].action
              }`}
            </Box>
          </TableCell>
        </>
      }
    />
  );
};
