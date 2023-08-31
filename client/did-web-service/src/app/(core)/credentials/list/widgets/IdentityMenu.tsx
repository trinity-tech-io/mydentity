import React, { useState } from 'react';
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import ComfirmDialog from "@components/generic/ComfirmDialog";
import EditCredentialDialog, { EditionMode } from "@components/identity-profile/EditCredentialDialog";
import { ProfileCredential } from "@model/credential/profile-credential";
import { ProfileCredentialInfo } from "@services/identity-profile-info/profile-credential-info";
import { findProfileInfoByTypes, } from "@services/identity-profile-info/identity-profile-info.service";
import { activeIdentity$ } from "@services/identity/identity.events";
import { useToast } from "@services/feedback.service";
import { logger } from "@services/logger";

const IdentityMenu = ({ onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const identityProfileFeature = activeIdentity?.get("profile");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openEditCredentialDialog, setOpenEditCredentialDialog] = useState(false);
  const [preEditCredentialInfo, setPreEditCredentialInfo] = useState<ProfileCredentialInfo>(onEdit);
  const [preEditCredentialValue, setPreEditCredentialValue] = useState<string>(null);
  const [editType, setEditType] = useState(EditionMode.EDIT); // Set your default edit type
  const [originCredential, setOriginCredential] = useState<ProfileCredential>(onEdit);
  const { showSuccessToast, showErrorToast } = useToast();
  const TAG = 'IdentityMenu';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Click Edit
  const handleEdit = () => {
    handleClose();
    setOpenEditCredentialDialog(true);
    const entry = findProfileInfoByTypes(originCredential.verifiableCredential.getType());
    setPreEditCredentialInfo(entry);
    const value = originCredential.verifiableCredential.getSubject().getProperty(entry.key)
    setPreEditCredentialValue(value);
    setEditType(editType);
  };
  

  // Click -> Delete 
  const handleDelete = () => {
    setOpenConfirmDialog(true);
    handleClose();
  };

  // Delete -> Disagree/Agree
  const handleCancel = async (isAgree: boolean) =>{
    setOpenConfirmDialog(false);
    if (!isAgree)
      return;

    let isSuccess = false;
    try {
      isSuccess = await identityProfileFeature.deleteProfileCredential(originCredential.verifiableCredential.getId().toString());
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
  const handleOK = async (editCredentialValue: { info: ProfileCredentialInfo, value: string, type: EditionMode, originCredential: ProfileCredential }) => {
    setOpenEditCredentialDialog(false);
    if (!editCredentialValue)
      return;

    if (!editCredentialValue.value)
      return;

    if (editCredentialValue.type == EditionMode.EDIT && editCredentialValue.originCredential) {
      let isSuccess = false;
      try {
        isSuccess = await identityProfileFeature.updateProfileCredential(editCredentialValue.originCredential, editCredentialValue.value).catch()
      } catch (error) {
        logger.error(TAG, 'Update credential error: ', error);
      }

      if (isSuccess) {
        showSuccessToast('Entry has been updated!');
      } else {
        showErrorToast('Failed to update the entry...');
      }
    };
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
        <MenuItem onClick={handleEdit}> Edit </MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}> Delete </MenuItem>
      </Popover>

      <ComfirmDialog
      title='Delete this Credential?'
      content='Do you want to delete this Credential?'
      open={openConfirmDialog}
      onClose={(isAgree: boolean) => handleCancel(isAgree)}
      />

      <EditCredentialDialog
        credentialInfo={preEditCredentialInfo}
        defaultValue={preEditCredentialValue}
        type={editType}
        open={openEditCredentialDialog}
        originCredential={originCredential}
        onClose={handleOK}
      />
    </div>
  );
};

export default IdentityMenu;
