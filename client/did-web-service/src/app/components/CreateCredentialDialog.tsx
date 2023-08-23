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

export interface CreateCredentialDialog {
  open: boolean;
  onClose: (value: string) => void;
  avaliableItemKeys: string[]
}

function CreateCredentialDialog(props: CreateCredentialDialog) {
  const { onClose, open, avaliableItemKeys} = props;
  
  const handleClose = () => {
    onClose('');
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog fullWidth={true} maxWidth={"sm"} onClose={handleClose} open={open}>
      <DialogTitle>Add field</DialogTitle>

      <Divider />

      <List sx={{ pt: 0 }}>
        {avaliableItemKeys.map((key) => (
          <ListItem disableGutters key={key}>
            <ListItemButton onClick={() => handleListItemClick(key)}  >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={key} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>

  );
}

export default CreateCredentialDialog;