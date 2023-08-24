"use client";

import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { Typography } from "@mui/material";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { createRef, FC, useEffect, useState } from "react";
import { MainButton } from "@components/MainButton";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { isLogined, saveAuthUser } from "@services/user/user.service";

const AccountProfile: FC = () => {
  const userNameRef = createRef<HTMLInputElement>()
  // const userNameRef = createRef()
  const [open, setOpen] = useState(false);
  const [authUser] = useBehaviorSubject(authUser$());
  const { mounted } = useMounted();

  const router = useRouter();
  useEffect(() => {
  }, []);

  const showEditDialog = () => {
    setOpen(true);
  }

  const onClose = () => {
    setOpen(false);
  }

  const onUpdateUserName = async () => {
    const name = userNameRef.current.value;
    if (name == authUser.name) {
      return;
    }

    if (!authUser) {
      alert('please login first.');
      return;
    }

    await authUser.updateUserName(name);

    await saveAuthUser(authUser);

    setOpen(false);
  }

  return (<div className="col-span-full">
    <Typography variant="h4">Account profile</Typography>
    <p>
      Here is your account profile.
    </p>
    <p>Your name: <span>{authUser?.name}</span></p>
    <MainButton onClick={showEditDialog} >Edit Name</MainButton>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reset New Name</DialogTitle>
      <DialogContent>
        <TextField
            // defaultValue={authUser?.name}
            inputRef={userNameRef}
            autoFocus
            margin="dense"
            id="name"
            label="Please input new name"
            type="email"
            fullWidth
            variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onUpdateUserName}>Save</Button>
      </DialogActions>
    </Dialog>

  </div>)
}

export default AccountProfile;