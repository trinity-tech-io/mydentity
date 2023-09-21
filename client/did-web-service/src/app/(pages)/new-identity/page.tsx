"use client";
import { CreateIdentity } from '@components/identity-creation/CreateIdentity';
import { useMounted } from '@hooks/useMounted';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { Identity } from "@model/identity/identity";
import { usePostSignInFlow } from '@services/flow.service';

const NewIdentityPage: FC = () => {
  const { mounted } = useMounted();
  const router = useRouter();
  const [activeUser] = useBehaviorSubject(authUser$);
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();

  const showProfile = (): void => {
    navigateToPostSignInLandingPage("/profile");
  }

  const onIdentityCreated = async (identity: Identity): Promise<void> => {
    showProfile();
  }

  if (!mounted)
    return null;

  return (<>
    <CreateIdentity onIdentityCreated={onIdentityCreated} />
  </>)
}

export default NewIdentityPage;
