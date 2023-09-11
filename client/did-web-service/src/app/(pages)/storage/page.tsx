"use client";
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { VaultStatus } from '@services/hive/vault/vault-status';
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
  const [authUser] = useBehaviorSubject(authUser$);
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const hiveFeature = activeIdentity?.get("hive");
  const [vaultStatus] = useBehaviorSubject(hiveFeature?.vaultStatus$);
  const [vaultAddress] = useBehaviorSubject(hiveFeature?.vaultAddress$);

  if (!mounted)
    return null;

  return (<div className='col-span-full flex flex-col'>
    <div className='font-bold'>Hive storage status</div>
    <div>
      {vaultStatus === VaultStatus.NotChecked && "Checking"}
      {vaultStatus === VaultStatus.Subscribing && "Subscribing"}
      {vaultStatus === VaultStatus.ReadyToUse && "Ready to use"}
      {vaultStatus === VaultStatus.UnknownError && "Failed to retrieve status"}
    </div>

    <div className='font-bold mt-4'>Storage provider</div>
    <div>{vaultAddress}</div>
  </div>)
}

export default StoragePage;
