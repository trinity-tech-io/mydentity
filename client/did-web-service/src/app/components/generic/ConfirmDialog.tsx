import { DarkButton, NormalButton } from '@components/button';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC, useEffect, useState } from 'react';

interface ConfirmDialogProps {
  title: string,
  content: string
  open: boolean;
  onClose: (agreeValue: boolean) => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
  const { title, content, open, onClose } = props;
  const [actionInProgress, setActionInProgress] = useState(false)

  useEffect(() => {
    setActionInProgress(false)
  }, [open])

  const handleDisAgree = (): void => {
    onClose(false);
  }

  const handleAgree = (): void => {
    setActionInProgress(true)
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
        <Button variant="outlined" onClick={handleDisAgree}>Disagree</Button>
        <LoadingButton color="info" variant="contained" loading={actionInProgress} onClick={handleAgree} autoFocus>
          Agree
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;