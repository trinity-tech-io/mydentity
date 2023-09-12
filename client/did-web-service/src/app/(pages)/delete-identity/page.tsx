"use client";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { MainButton } from '@components/generic/MainButton';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { Typography } from '@mui/material';
import { activeIdentity$ } from '@services/identity/identity.events';
import { identityService } from '@services/identity/identity.service';
import { authUser$ } from '@services/user/user.events';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

const TAG = "delete-identity";

const DeleteIdentityPage: FC = () => {
  const { mounted } = useMounted();
  const router = useRouter();
  const [authUser] = useBehaviorSubject(authUser$);
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [deletingIdentity, setDeletingIdentity] = useState(false);

  const deleteIdentity = async (): Promise<void> => {
    const identityStringToDelete = activeIdentity.did;

    setDeletingIdentity(true);
    // Clear the active identity as we are deleting it
    identityService.setActiveIdentity(null);
    // Go back to dashboard instantly
    router.replace("/dashboard");
    // Deletion
    await authUser.get("identity").deleteIdentity(identityStringToDelete);
  }

  if (!mounted)
    return null;

  return (<div className='flex flex-col col-span-full'>
    <Breadcrumbs entries={["delete-identity"]} />

    <Typography variant='h5'>Identity deletion</Typography>
    <Typography>You are about to delete the active identity and all the information (credentials) it contains.</Typography>
    <br /><br />
    {activeIdentity && <>
      <Typography variant='h6'><b>Identity</b>: {activeIdentity.did}</Typography>
      <Typography variant='h6'><b>Credentials</b>: xx</Typography>
      <MainButton onClick={deleteIdentity} busy={deletingIdentity} mode="danger" className="mt-4">Delete this identity</MainButton>
    </>}
  </div>)
}

export default DeleteIdentityPage;
