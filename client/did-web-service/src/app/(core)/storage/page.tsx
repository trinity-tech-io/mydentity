"use client";
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { activeIdentity$ } from '@services/identity/identity.events';
import { authUser$ } from '@services/user/user.events';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

/**
 * Hive storage status and setup for the active identity
 */
const StoragePage: FC = () => {
  const { mounted } = useMounted();
  const router = useRouter();
  const [authUser] = useBehaviorSubject(authUser$());
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const hiveFeature = activeIdentity?.get("hive");
  const [vaultStatus] = useBehaviorSubject(hiveFeature?.vaultStatus$);

  if (!mounted)
    return null;

  console.log("vaultStatus", vaultStatus);

  return (<>
    <div></div>
  </>)
}

export default StoragePage;
