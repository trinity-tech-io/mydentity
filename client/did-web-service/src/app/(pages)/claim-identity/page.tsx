"use client";
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { Typography } from '@mui/material';
import { fetchIdentityClaimRequest } from '@services/identity-claim/identity-claim.service';
import { activeIdentity$ } from '@services/identity/identity.events';
import { authUser$ } from '@services/user/user.events';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

const TAG = "claim-identity";

const ClaimIdentityPage: FC = () => {
  const { mounted } = useMounted();
  const searchParams = useSearchParams();
  const claimRequestId = searchParams.get("request");
  const router = useRouter();
  const [activeUser] = useBehaviorSubject(authUser$);
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [deletingIdentity, setDeletingIdentity] = useState(false);

  useEffect(() => {
    if (claimRequestId) {
      fetchIdentityClaimRequest(claimRequestId).then(claimRequest => {
        console.log("claimRequest", claimRequest);
      });
    }
  }, [claimRequestId]);

  if (!mounted)
    return null;

  /**
   * TODO:
   * - fetch claim from id
   * - display info about creator + list VC previews
   * - check sign in status, redirect if needed
   * - confirm claiming + transfer identity to another user
   */

  return (<div className='flex flex-col col-span-full'>
    <Typography variant='h5'>Identity claim</Typography>
    <Typography>A new Web3 identity has been prepared for you by XXXXX and is ready for you to claim.</Typography>
    <Typography>Claiming means that this identity, initialiiy created and controlled by XXXXX, will now fully become yours, together with your other identities in your account.</Typography>
  </div>)
}

export default ClaimIdentityPage;
