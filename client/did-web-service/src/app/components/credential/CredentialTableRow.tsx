import { MouseEventHandler, useState, MouseEvent } from "react";
import { useRouter } from "next13-progressbar";
import { IconButton, MenuItem, TableCell } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { Credential } from "@model/credential/credential";
import { DetailTableRow } from "@components/generic/DetailTable";
import { ProfileCredential } from "@model/credential/profile-credential";
import { CredentialAvatar } from "./CredentialAvatar";
import { shortenDID } from "@services/identity/identity.utils";
import { activeIdentity$ } from "@services/identity/identity.events";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import PopupMenu from "@components/popup/PopupMenu";

interface Props {
  credential: ProfileCredential;
  onOpenMenu: (credential: ProfileCredential) => void;
  onMenuClickAway: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

function CredentialTableRow(props: Props): JSX.Element {
  const {
    credential,
    onOpenMenu,
    onMenuClickAway,
    onClickEdit,
    onClickDelete,
  } = props;
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const identityProfileFeature = activeIdentity?.profile();
  const [popupMenuEl, setPopupMenuEl] = useState(null);
  const router = useRouter();

  const handleCellClick = (credential: Credential): void => {
    identityProfileFeature.setActiveCredential(credential);
    router.push("/credentials/list");
  };

  const handleClickMore: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setPopupMenuEl(e.currentTarget);
    onOpenMenu(credential);
  };

  const handleClickEditCredential = (): void => {
    handleCloseMenu();
    onClickEdit();
  };

  const handleClickDeleteCredential = (): void => {
    handleCloseMenu();
    onClickDelete();
  };

  const handleCloseMenu = (): void => {
    setPopupMenuEl(null);
  };

  const handleMenuClickAway = (): void => {
    onMenuClickAway();
    handleCloseMenu();
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
            {activeIdentity?.did == credential.getIssuer()
              ? "Myself"
              : shortenDID(credential.getIssuer())}
          </TableCell>
          <TableCell align="center">
            <IconButton size="small" color="inherit" onClick={handleClickMore}>
              <MoreVertIcon />
            </IconButton>
            <PopupMenu
              popperProps={{
                open: Boolean(popupMenuEl),
                anchorEl: popupMenuEl,
                placement: "bottom-end",
              }}
              handleClickAway={handleMenuClickAway}
            >
              <MenuItem onClick={handleClickEditCredential}>Edit</MenuItem>
              <MenuItem
                sx={{ color: "error.main" }}
                onClick={handleClickDeleteCredential}
              >
                Delete
              </MenuItem>
            </PopupMenu>
          </TableCell>
        </>
      }
    />
  );
}

export default CredentialTableRow;
