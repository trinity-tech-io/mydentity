import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';

interface ConfirmDialogProps {
  title: string,
  content: string
  open: boolean;
  onClose: (agreeValue: boolean) => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
  const { title, content, open, onClose } = props;

  const handleDisAgree = (): void => {
    onClose(false);
  }

  const handleAgree = (): void => {
    onClose(true);
  };

  return (
    <Dialog
      open={open}
      onClose={handleDisAgree}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisAgree}>Disagree</Button>
        <Button onClick={handleAgree} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;