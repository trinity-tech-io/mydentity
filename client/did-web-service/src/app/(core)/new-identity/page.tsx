"use client";
import { MainButton } from '@components/MainButton';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { TextField } from '@mui/material';
import { useToast } from '@services/feedback.service';
import { identityService } from '@services/identity/identity.service';
import { authUser$ } from '@services/user/user.events';
import { FC, FormEvent, useRef, useState } from 'react';

const NewIdentityPage: FC = () => {
  const nameInput = useRef(null);
  const [authUser] = useBehaviorSubject(authUser$());
  const { mounted } = useMounted();
  const [creatingIdentity, setCreatingIdentity] = useState(false);
  const { showSuccessToast } = useToast();

  const createIdentity = async (e?: FormEvent) => {
    // Disable form submit
    e?.preventDefault();

    const name = nameInput.current.value;
    setCreatingIdentity(true);

    // Create identity for real in the backend
    // TODO: use callWithUnlock() to call createIdentity(), because master key unlock is probably required
    const identity = await authUser.get("identity").createIdentity(name);
    if (identity) {
      identityService.setActiveIdentity(identity)
      showSuccessToast("Your new identity was created!");
    }
  }

  if (!mounted)
    return null;

  return (<div className="col-span-full">
    <form className="border-b border-slate-200 dark:border-slate-700" onSubmit={e => createIdentity(e)}>
      <div className="pt-2 pb-2">
        <TextField
          className='w-full'
          label="Remember this identity with a name"
          inputRef={nameInput}
          autoFocus
          variant="outlined"
          size="small"
        />
      </div>
    </form>

    <MainButton onClick={createIdentity} busy={creatingIdentity}>Create this identity</MainButton>
  </div>
  )
}

export default NewIdentityPage;