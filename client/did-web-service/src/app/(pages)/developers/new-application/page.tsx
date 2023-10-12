"use client";
import { MainButton } from '@components/generic/MainButton';
import { callWithUnlock } from '@components/security/unlock-key-prompt/call-with-unlock';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { TextField, Typography } from '@mui/material';
import { useToast } from '@services/feedback.service';
import { authUser$ } from '@services/user/user.events';
import { useRouter } from 'next/navigation';
import { FC, FormEvent, useRef, useState } from 'react';

const NewApplicationPage: FC = () => {
  const nameInput = useRef(null);
  const [authUser] = useBehaviorSubject(authUser$);
  const router = useRouter();
  const { mounted } = useMounted();
  const { showSuccessToast } = useToast();

  // Step states
  const [creatingIdentity, setCreatingIdentity] = useState(false); // From clicking on "create" until the very end
  const [callingCreationApi, setCallingCreationApi] = useState(false);

  const createIdentity = async (e?: FormEvent): Promise<void> => {
    // Disable form submit
    e?.preventDefault();

    const name = nameInput.current.value;
    setCreatingIdentity(true);

    // Create identity for real in the backend
    setCallingCreationApi(true);
    const applicationIdentity = await callWithUnlock(async () => await authUser.get("identity").createApplicationIdentity(name));
    // Create the application credential in this new identity
    applicationIdentity.update(name, "");
    setCallingCreationApi(false);

    if (applicationIdentity) {
      // First fetch the (empty list of) credentials, this is required to be able to create new credentials.
      //identity.profile().profileCredentials$.pipe(first(v => !!v)).subscribe(async () => {
      // Attach the name as credential, to this new identity
      // await identity.profile().createInitialNameCredential(name);

      /*  setPublishing(true);
       await identity.publication().awaitIdentityPublished();
       setPublishing(false); */

      showSuccessToast("The application identity was created");
      //});

      router.push("/developers/application?did=" + applicationIdentity.did);
    }
  }

  if (!mounted)
    return null;

  return (<div className="col-span-full">
    <Typography variant="h6">New application</Typography>

    <Typography>
      You are about to create a new DID to represent your application. This DID will be used in various locations to identify your application.
      For instance, when you create and sign credentials from your app using this identity, users will see your application logo and icon as the "issuer".
    </Typography>

    <form className="border-b border-slate-200 dark:border-slate-700 mt-4" onSubmit={createIdentity}>
      <div className="pt-2 pb-2">
        <TextField
          className='w-full'
          label="Application name"
          inputRef={nameInput}
          autoFocus
          variant="outlined"
          size="small"
          autoComplete="off"
        />
      </div>
    </form>

    <MainButton onClick={createIdentity} busy={creatingIdentity}>Create this application identity</MainButton>

    <div className='flex flex-col'>
      {callingCreationApi && "Creating the application identity"}
    </div>
  </div>
  )
}

export default NewApplicationPage;