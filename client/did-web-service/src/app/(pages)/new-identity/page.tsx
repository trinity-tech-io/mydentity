"use client";
import { CreateIdentity } from '@components/identity-creation/CreateIdentity';
import { useMounted } from '@hooks/useMounted';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { ActivityType } from "@model/activity/activity-type";
import { logger } from "@services/logger";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { Identity } from "@model/identity/identity";

const NewIdentityPage: FC = () => {
  const { mounted } = useMounted();
  const router = useRouter();
  const [activeUser] = useBehaviorSubject(authUser$);

  const showProfile = (): void => {
    router.replace("/profile");
  }

  const onIdentityCreated = async (identity: Identity): Promise<void> => {
    const activity = await activeUser?.get('activity').createActivity(ActivityType.DID_CREATED, { did: identity.did });
    if (!activity) {
      logger.warn(`failed to create activity for did ${identity.did} created.`);
    }

    showProfile();
  }

  if (!mounted)
    return null;

  return (<>
    <CreateIdentity onIdentityCreated={onIdentityCreated} />
  </>)
}

export default NewIdentityPage;
