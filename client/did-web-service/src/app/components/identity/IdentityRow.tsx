"use client";
import { FC } from "react";
import { ListItemText, TableCell } from "@mui/material";
import { DetailTableRow } from "@components/generic/DetailTable";
import { IdentityAvatar } from "@components/identity/IdentityAvatar";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { shortenDID } from "@services/identity/identity.utils";
import { getDateDistance } from "@utils/date";
import { activeIdentity$ } from "@services/identity/identity.events";
import { useToast } from "@services/feedback.service";
import { identityService } from "@services/identity/identity.service";
import { useRouter } from "next13-progressbar";

export const IdentityRow: FC<{
  identity: RegularIdentity;
}> = ({ identity }) => {
  const [name] = useBehaviorSubject(identity.profile().name$);
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const { showSuccessToast } = useToast()
  const router = useRouter()

  const handleCellClick = (identity: RegularIdentity): void => {
    if (identity !== activeIdentity) {
      const shortDid = shortenDID(identity.did, 8)
      const text = 'Your current active identity is: ' + name + '(' + shortDid + ')'
      showSuccessToast(text);
    }
    identityService.setActiveIdentity(identity);
    router.push("/profile");
  };

  return (
    <DetailTableRow
      props={{ hover: true }}
      onClick={(): void => handleCellClick(identity)}
      className="h-[3.5rem] cursor-pointer"
      avatar={<IdentityAvatar identity={identity} width={36} height={36} />}
      rowCells={
        <>
          <TableCell>
            <ListItemText
              className="flex-1"
              primary={<span className="font-medium">{name || "Unnamed identity"}</span>}
              secondary={
                <span className="text-[8pt]">
                  {shortenDID(identity.did, 8)}
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
                  lineHeight: 1.2,
                },
              }}
            />
          </TableCell>
          <TableCell>{getDateDistance(identity.createdAt)}</TableCell>
        </>
      }
    />
  );
};
