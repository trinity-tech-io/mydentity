"use client";
import { MainButton } from '@components/generic/MainButton';
import { callWithUnlock } from '@components/security/unlock-key-prompt/UnlockKeyPrompt';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { Identity } from '@model/identity/identity';
import { TextField } from '@mui/material';
import { useToast } from '@services/feedback.service';
import { identityService } from '@services/identity/identity.service';
import { authUser$ } from '@services/user/user.events';
import { FC, FormEvent, useRef, useState } from 'react';
import { first } from 'rxjs';

export const CreateIdentity: FC<{
  suggestedName?: string;
  onIdentityCreating?: () => void;
  onIdentityCreated: (identity: Identity) => void;
}> = ({ suggestedName = "", onIdentityCreating, onIdentityCreated }) => {
  const nameInput = useRef(null);
  const [authUser] = useBehaviorSubject(authUser$);
  const { mounted } = useMounted();
  const { showSuccessToast } = useToast();

  // Step states
  const [creatingIdentity, setCreatingIdentity] = useState(false); // From clicking on "create" until the very end
  const [callingCreationApi, setCallingCreationApi] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [creatingStorage, setCreatingStorage] = useState(false);

  const createIdentity = async (e?: FormEvent): Promise<void> => {
    // Disable form submit
    e?.preventDefault();

    const name = nameInput.current.value;
    setCreatingIdentity(true);
    onIdentityCreating?.();

    // Create identity for real in the backend
    setCallingCreationApi(true);
    const identity = await callWithUnlock(async () => await authUser.get("identity").createIdentity(name));
    setCallingCreationApi(false);

    if (identity) {
      identityService.setActiveIdentity(identity);

      // First fetch the (empty list of) credentials, this is required to be able to create new credentials.
      identity.get("profile").profileCredentials$.pipe(first(v => !!v)).subscribe(async () => {
        // Attach the name as credential, to this new identity
        await identity.get("profile").createInitialNameCredential(name);

        setPublishing(true);
        await identity.get("publication").awaitIdentityPublished();
        setPublishing(false);

        // Prepare the hive vault. This also starts the vault registration is not done yet, through the lazy access of vault status.
        setCreatingStorage(true);
        await identity.get("hive").awaitHiveVaultReady();
        setCreatingStorage(false);

        showSuccessToast("Your new identity was created!");
        onIdentityCreated(identity);
      });
    }
  }

  if (!mounted)
    return null;

  return (<div className="col-span-full">
    <form className="border-b border-slate-200 dark:border-slate-700" onSubmit={createIdentity}>
      <div className="pt-2 pb-2">
        <TextField
          className='w-full'
          label="Identity name"
          inputRef={nameInput}
          autoFocus
          defaultValue={suggestedName}
          variant="outlined"
          size="small"
        />
      </div>
    </form>

    <MainButton onClick={createIdentity} busy={creatingIdentity}>Create this identity</MainButton>

    <div className='flex flex-col'>
      {callingCreationApi && "Creating the secure identity"}
      {publishing && "Registering identity"}
      {creatingStorage && "Creating storage"}
    </div>
  </div>
  )
}
