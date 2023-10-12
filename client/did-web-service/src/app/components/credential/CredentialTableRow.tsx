import { MouseEventHandler, useState, MouseEvent } from "react";
import { useRouter } from "next13-progressbar";
import { IconButton, TableCell } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { Credential } from "@model/credential/credential";
import { DetailTableRow } from "@components/generic/DetailTable";
import { ProfileCredential } from "@model/credential/profile-credential";
import { CredentialAvatar } from "./CredentialAvatar";
import { shortenDID } from "@services/identity/identity.utils";
import { ProfileFeature } from "@model/regular-identity/features/profile/profile.feature";

interface Props {
  credential: ProfileCredential;
  identityProfileFeature: ProfileFeature;
  handleOpenMenu: (event: MouseEvent, credential: ProfileCredential) => void;
}

function CredentialTableRow(props: Props): JSX.Element {
  const { credential, identityProfileFeature, handleOpenMenu } = props;
    useState<ProfileCredential>(null);
  const router = useRouter();

  const handleCellClick = (credential: Credential): void => {
    identityProfileFeature.setActiveCredential(credential);
    router.push("/credentials/list");
  };

  const handleClickMore: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleOpenMenu(e, credential);
  };

  return (
    <DetailTableRow
      props={{ hover: true }}
      onClick={(): void => handleCellClick(credential)}
      className="h-[3rem] cursor-pointer"
      avatar={
        <CredentialAvatar credential={credential} width={36} height={36} />
      }
      rowCells={
        <>
          <TableCell>{credential.getDisplayableTitle()}</TableCell>
          <TableCell align="center">{credential.getDisplayValue()}</TableCell>
          <TableCell align="center">
            {shortenDID(credential.getIssuer())}
          </TableCell>
          <TableCell align="center">
            <IconButton size="small" color="inherit" onClick={handleClickMore}>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </>
      }
    />
  );
}

export default CredentialTableRow;
