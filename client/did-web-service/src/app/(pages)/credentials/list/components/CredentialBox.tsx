import { FC, MouseEventHandler, ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { CardStyled } from "@/app/(pages)/account/security/components/SecuritySection";
import { Credential } from "@model/credential/credential";
import { CredentialAvatar } from "@components/credential/CredentialAvatar";
import { JsonViewer } from "@components/credential/JsonViewer";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import SharedCountLabel, {
  ConformBadge,
} from "@components/credential/SharedCountLabel";
import { activeIdentity$ } from "@services/identity/identity.events";
import TextWithDynamicImage from "./TextWithDynamicImage";
import PopupMenu from "@components/popup/PopupMenu";
import { ProfileCredential } from "@model/credential/profile-credential";
import { EditableCredentialAvatar } from "@components/credential/EditableCredentialAvatar";

const DetailItemText: FC<{ primary: string; secondary: ReactNode }> = ({
  primary,
  secondary,
}) => (
  <ListItemText
    primary={primary}
    secondary={secondary}
    primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
    secondaryTypographyProps={{ fontSize: 10 }}
  />
);
const CredentialBox: FC<{
  id: string;
  credential: Credential;
  expanded: boolean;
  setExpanded: any;
  onClick: (c: Credential) => void;
  onOpenMenu: (credential: ProfileCredential) => void;
  onMenuClickAway: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
}> = ({
  id,
  credential,
  expanded,
  setExpanded,
  onClick,
  onOpenMenu,
  onMenuClickAway,
  onClickEdit,
  onClickDelete,
}) => {
  const [requestingApplications] = useBehaviorSubject(
    credential?.requestingApplications$
  );
  const [isConform] = useBehaviorSubject(credential?.isConform$);
  const [issuerInfo] = useBehaviorSubject(credential?.issuerInfo$);
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [popupMenuEl, setPopupMenuEl] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const identityProfileFeature = activeIdentity?.profile();
  const isProfileCredential = credential instanceof ProfileCredential;

  // const handleExpanding: MouseEventHandler<HTMLButtonElement> = (e): void => {
  //   e.stopPropagation();
  //   setExpanded((prevIDs: string[]) => {
  //     let tempIDs = [...prevIDs];
  //     const thisIndex = tempIDs.findIndex((_id) => _id === id);
  //     if (thisIndex < 0) {
  //       tempIDs.length != 1 ? tempIDs.push(id) : (tempIDs = [id]);
  //     } else tempIDs.splice(thisIndex, 1);
  //     return tempIDs;
  //   });
  // };

  const handleClick = (): void => {
    onClick(credential);
  };

  const handleClickMore: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setPopupMenuEl(e.currentTarget);
    onOpenMenu(credential as ProfileCredential);
  };

  const handleClickMenu: MouseEventHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleCloseMenu();
    switch (e.currentTarget?.getAttribute("value")) {
      case "edit":
        onClickEdit();
        break;
      case "delete":
        onClickDelete();
        break;
      default:
        break;
    }
  };

  const handleCloseMenu = (): void => {
    setPopupMenuEl(null);
  };

  const handleMenuClickAway = (): void => {
    onMenuClickAway();
    handleCloseMenu();
  };

  const handleAvatarFileChanged = async (file: File): Promise<void> => {
    setUploadingAvatar(true);
    await identityProfileFeature.upsertIdentityAvatar(file);
    setUploadingAvatar(false);
  };

  return (
    <div className="relative h-full cursor-pointer" onClick={handleClick}>
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
            className="h-full"
          >
            <div
              className="relative"
              onClick={(e): void => {
                e.stopPropagation();
              }}
            >
              {credential.getDisplayableTitle().toLowerCase() === "avatar" ? (
                <EditableCredentialAvatar
                  credential={credential}
                  width={32}
                  height={32}
                  onFileUpload={handleAvatarFileChanged}
                  updating={uploadingAvatar}
                  disabled={!credential}
                />
              ) : (
                <CredentialAvatar
                  credential={credential}
                  width={32}
                  height={32}
                />
              )}
              {isConform && (
                <ConformBadge className="absolute right-0 bottom-0 translate-x-[10%] translate-y-[20%]" />
              )}
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
          <div>
            <IconButton size="small" color="inherit" onClick={handleClickMore}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <PopupMenu
              popperProps={{
                open: Boolean(popupMenuEl),
                anchorEl: popupMenuEl,
                placement: "bottom-end",
              }}
              handleClickAway={handleMenuClickAway}
            >
              {credential.getDisplayableTitle().toLowerCase() !== "avatar" &&
                isProfileCredential && (
                  <MenuItem value="edit" onClick={handleClickMenu}>
                    Edit
                  </MenuItem>
                )}
              <MenuItem
                value="delete"
                sx={{ color: "error.main" }}
                onClick={handleClickMenu}
              >
                Delete
              </MenuItem>
            </PopupMenu>
          </div>
        </Stack>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.section
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <List
                dense
                sx={{
                  ".MuiListItemText-root": { margin: 0 },
                  ".MuiListItem-root": { paddingLeft: 1 },
                }}
              >
                <ListItem>
                  <DetailItemText
                    primary="ISSUANCE DATE"
                    secondary={credential.verifiableCredential.issuanceDate.toLocaleString()}
                  />
                </ListItem>
                <ListItem>
                  <DetailItemText
                    primary="EXPIRATION DATE"
                    secondary={credential.verifiableCredential.expirationDate.toLocaleString()}
                  />
                </ListItem>
                <ListItem>
                  <DetailItemText
                    primary="CREATED BY"
                    secondary={
                      <TextWithDynamicImage
                        createdBy={
                          credential.getCreatedBy(issuerInfo, activeIdentity)[0]
                        }
                        dynamicImage={
                          credential.getCreatedBy(issuerInfo, activeIdentity)[1]
                        }
                      />
                    }
                  />
                </ListItem>
              </List>
            </motion.section>
          )}
        </AnimatePresence>
      </CardStyled>
      <div className="inline-flex absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3">
        <SharedCountLabel count={requestingApplications?.length || 0} />
      </div>
    </div>
  );
};
export default CredentialBox;
