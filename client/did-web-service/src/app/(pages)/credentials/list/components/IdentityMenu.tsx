import ConfirmDialog from "@components/generic/ConfirmDialog";
import EditCredentialDialog, { EditionMode } from "@components/identity-profile/EditCredentialDialog";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Credential } from "@model/credential/credential";
import { ProfileCredential } from "@model/credential/profile-credential";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { useToast } from "@services/feedback.service";
import { findProfileInfoByTypes, } from "@services/identity-profile-info/identity-profile-info.service";
import { ProfileCredentialInfo } from "@services/identity-profile-info/profile-credential-info";
import { activeIdentity$ } from "@services/identity/identity.events";
import { logger } from "@services/logger";
import { FC, MouseEvent, useState } from 'react';

const IdentityMenu: FC<{
  credential: Credential;
}> = ({ credential }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const identityProfileFeature = activeIdentity?.profile();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openEditCredentialDialog, setOpenEditCredentialDialog] = useState(false);
  const [preEditCredentialInfo, setPreEditCredentialInfo] = useState<ProfileCredentialInfo>(null);
  const [preEditCredentialValue, setPreEditCredentialValue] = useState<string>(null);
  const [editType, setEditType] = useState(EditionMode.EDIT); // Set your default edit type
  const { showSuccessToast, showErrorToast } = useToast();
  const TAG = 'IdentityMenu';
  const isProfileCredential = credential instanceof ProfileCredential;

  const handleClick = (event: MouseEvent): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  // Click Edit
  const handleEdit = (): void => {
    handleClose();
    setOpenEditCredentialDialog(true);
    const entry = findProfileInfoByTypes(credential.verifiableCredential.getType());
    setPreEditCredentialInfo(entry);
    const value = credential.verifiableCredential.getSubject().getProperty(entry.key)
    setPreEditCredentialValue(value);
    setEditType(editType);
  };


  // Click -> Delete
  const handleDelete = (): void => {
    setOpenConfirmDialog(true);
    handleClose();
  };

  // Delete -> Disagree/Agree
  const handleCancel = async (didAgree: boolean): Promise<void> => {
    setOpenConfirmDialog(false);
    if (!didAgree)
      return;

    let isSuccess = false;
    try {
      isSuccess = await activeIdentity.credentials().deleteCredential(credential);
    } catch (error) {
      logger.error(TAG, 'Delete credential error: ', error);
    }
    if (isSuccess) {
      showSuccessToast('Entry has been deleted!');
    } else {
      showErrorToast('Failed to delete the entry...');
    }
  };

  // Edit -> Cancel/OK
  const handleOK = async (editCredentialValue: { info: ProfileCredentialInfo, value: any, type: EditionMode, originCredential: ProfileCredential }): Promise<void> => {
    setOpenEditCredentialDialog(false);
    if (!editCredentialValue)
      return;

    if (!editCredentialValue.value)
      return;

    if (editCredentialValue.type == EditionMode.EDIT && editCredentialValue.originCredential) {
      let resultCredential: Credential = null
      try {
        resultCredential = (await identityProfileFeature.updateProfileCredential(editCredentialValue.originCredential, editCredentialValue.value).catch())
      } catch (error) {
        logger.error(TAG, 'Update credential error: ', error);
      }

      const isSuccess = resultCredential !== null;
      if (isSuccess) {
        showSuccessToast('Entry has been updated!');
        identityProfileFeature.setActiveCredential(resultCredential)
      } else {
        showErrorToast('Failed to update the entry...');
      }
    }
  }

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {isProfileCredential && <MenuItem onClick={handleEdit}> Edit </MenuItem>}
        <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}> Delete </MenuItem>
      </Popover>

      <ConfirmDialog
        title='Delete this Credential?'
        content='Do you want to delete this Credential?'
        open={openConfirmDialog}
        onClose={handleCancel}
      />

      <EditCredentialDialog
        credentialInfo={preEditCredentialInfo}
        defaultValue={preEditCredentialValue}
        type={editType}
        open={openEditCredentialDialog}
        originCredential={credential as ProfileCredential}
        onClose={handleOK}
      />
    </div>
  );
};

export default IdentityMenu;
