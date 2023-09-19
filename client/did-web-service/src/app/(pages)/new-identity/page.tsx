"use client";
import {CreateIdentity} from '@components/identity-creation/CreateIdentity';
import {useMounted} from '@hooks/useMounted';
import {useRouter} from 'next/navigation';
import {FC} from 'react';
import {ActivityType} from "@model/activity/activity-type";
import {useBehaviorSubject} from "@hooks/useBehaviorSubject";
import {authUser$} from "@services/user/user.events";
import {Identity} from "@model/identity/identity";
import {ActivityFeature} from "@model/user/features/activity/activity.feature";

const NewIdentityPage: FC = () => {
  const { mounted } = useMounted();
  const router = useRouter();
  const [activeUser] = useBehaviorSubject(authUser$);

  const showProfile = (): void => {
    router.replace("/profile");
  }

  const onIdentityCreated = async (identity: Identity): Promise<void> => {
    await ActivityFeature.createActivity({type: ActivityType.IDENTITY_CREATED, identityStr: identity.did});

    showProfile();
  }

  if (!mounted)
    return null;

  return (<>
    <CreateIdentity onIdentityCreated={onIdentityCreated} />
  </>)
}

export default NewIdentityPage;
