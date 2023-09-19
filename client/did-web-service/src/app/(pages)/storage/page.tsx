"use client";
import HiveIcon from '@assets/images/hive-cross.svg';
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { Grid, Stack, Typography } from '@mui/material';
import { VaultStatus } from '@services/hive/vault/vault-status';
import { activeIdentity$ } from '@services/identity/identity.events';
import { authUser$ } from '@services/user/user.events';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

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
  const [vaultInfo] = useBehaviorSubject(hiveFeature?.vaultInfo$);
  const [storageUsed, setStorageUsed] = useState<string>('');
  const [storageQuota, setStorageQuota] = useState<string>('');

  const getDisplayableStorageSizeMB = (size: number): number => {
    return parseFloat((size / (1024 * 1024)).toFixed(2));
  }

  useEffect(() => {
    if (vaultInfo) {
      setStorageUsed(getDisplayableStorageSizeMB(vaultInfo.getStorageUsed()) + " MB")
      setStorageQuota(getDisplayableStorageSizeMB(vaultInfo.getStorageQuota()) + " MB")
    }
  }, [vaultInfo]);

  if (!mounted)
    return null;

  return (<div className='col-span-full flex flex-col'>
    <Breadcrumbs entries={["storage"]} />

    <Stack className='p-4' direction="row" justifyContent="center">
      <HiveIcon width={80} height={80}  />
    </Stack>

    <div className='font-bold'>Hive storage status</div>
    <div>
      {vaultStatus === VaultStatus.NotChecked && "Checking"}
      {vaultStatus === VaultStatus.Subscribing && "Subscribing"}
      {vaultStatus === VaultStatus.ReadyToUse && "Ready to use"}
      {vaultStatus === VaultStatus.UnknownError && "Failed to retrieve status"}
    </div>

    {
      vaultInfo &&
      <><Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Max storage:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {storageQuota}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            File storage in use:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {storageUsed}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Started time:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {vaultInfo.getStartTime().toDateString()}
          </Typography>
        </Grid>
      </Grid></>
    }

    <div className='font-bold mt-4'>Storage provider</div>
    <div>{vaultAddress}</div>
  </div>)
}

export default StoragePage;
