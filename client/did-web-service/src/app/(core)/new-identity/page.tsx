"use client";
import { CreateIdentity } from '@components/identity-creation/CreateIdentity';
import { useMounted } from '@hooks/useMounted';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const NewIdentityPage: FC = () => {
  const { mounted } = useMounted();
  const router = useRouter();

  const showProfile = (): void => {
    router.replace("/profile");
  }

  const onIdentityCreated = (): void => {
    showProfile();
  }

  if (!mounted)
    return null;

  return (<>
    <CreateIdentity onIdentityCreated={onIdentityCreated} />
  </>)
}

export default NewIdentityPage;
