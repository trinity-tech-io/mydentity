import PersonIcon from '@mui/icons-material/Person';
import { Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { blue } from '@mui/material/colors';
import { ProfileCredentialInfo } from '@services/identity-profile-info/profile-credential-info';
import { capitalizeFirstLetter } from "@utils/strings";
import { FC } from 'react';

export interface CreateCredentialDialog {
  open: boolean;
  onClose: (selectedItem: ProfileCredentialInfo) => void;
  availableItemsForAddition: ProfileCredentialInfo[]
}

const CreateCredentialDialog: FC<CreateCredentialDialog> = ({ onClose, open, availableItemsForAddition }) => {
  const handleClose = (): void => {
    onClose(null);
  };

  const handleListItemClick = (value: ProfileCredentialInfo): void => {
    onClose(value);
  };

  return (
    <Dialog fullWidth={true} maxWidth={"sm"} onClose={handleClose} open={open}>
      <DialogTitle>Add profile information</DialogTitle>

      <Divider />

      <List sx={{ pt: 0 }}>
        {availableItemsForAddition?.map((addableItem, i) => (
          <ListItem disableGutters key={i}>
            <ListItemButton onClick={():void => handleListItemClick(addableItem)}  >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={capitalizeFirstLetter(addableItem.key)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>

  );
}

export default CreateCredentialDialog;