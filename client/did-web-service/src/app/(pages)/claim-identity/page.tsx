"use client";
import { CredentialAvatar } from '@components/credential/CredentialAvatar';
import { MainButton } from '@components/generic/MainButton';
import { VerticalStackLoadingCard } from '@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { AppInfoCredential } from '@model/credential/app-info-credential';
import { credentialFromVerifiableCredential } from '@model/credential/credential-builder';
import { Document } from '@model/document/document';
import { IdentityClaimRequest } from '@model/identity-claim-request/identity-claim-request';
import { Typography } from '@mui/material';
import { useToast } from '@services/feedback.service';
import { setPostSignInUrl } from '@services/flow.service';
import { fetchIdentityClaimRequest } from '@services/identity-claim/identity-claim.service';
import { didDocumentService } from '@services/identity/diddocuments.service';
import { logger } from '@services/logger';
import { authUser$, authUserReady$ } from '@services/user/user.events';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

const TAG = "claim-identity";

const ClaimIdentityPage: FC = () => {
  const { mounted } = useMounted();
  const searchParams = useSearchParams();
  const claimRequestId = searchParams.get("request");
  const [fetchingRequestDetails, setFetchingRequestDetails] = useState(true);
  const [claimingIdentity, setClaimingIdentity] = useState(false);
  const [claimRequest, setClaimRequest] = useState<IdentityClaimRequest>(null);
  const [creatingAppDID, setCreatingAppDID] = useState<string>(null);
  const [creatingAppDocument, setCreatingAppDocument] = useState<Document>(null);
  const [creatingAppInfoCredential, setCreatingAppInfoCredential] = useState<AppInfoCredential>(null);
  const [creatingAppName] = useBehaviorSubject(creatingAppInfoCredential?.name$);
  const router = useRouter();
  const [authUserReady] = useBehaviorSubject(authUserReady$);
  const [authUser] = useBehaviorSubject(authUser$);
  const readyToDisplayDetails = !fetchingRequestDetails && authUserReady;
  const { showSuccessToast, showErrorToast } = useToast();

  /**
   * Fetch the claim request info
   */
  useEffect(() => {
    if (claimRequestId && !claimRequest) {
      logger.log(TAG, "Fetching claim request details");
      fetchIdentityClaimRequest(claimRequestId).then(cr => {
        logger.log(TAG, "Got claim request", cr);
        setClaimRequest(cr);
        setCreatingAppDID(cr.identityInfo?.creatingAppDid);
      });
    }
  }, [claimRequestId, claimRequest]);

  /**
   * Fetch the creating app's DID document on chain
   */
  useEffect(() => {
    if (creatingAppDID && !creatingAppDocument) {
      logger.log(TAG, "Fetching creating app's DID document on chain");
      didDocumentService.resolveDIDDocument(creatingAppDID).then(async doc => {
        setFetchingRequestDetails(false);
        setCreatingAppDocument(doc);

        logger.log(TAG, "Got creating app's DID document:", doc);

        if (doc) {
          const appInfoVC = doc.getCredentialByType("ApplicationCredential");
          if (appInfoVC) {
            setCreatingAppInfoCredential((await credentialFromVerifiableCredential(appInfoVC)) as AppInfoCredential);
          }
          else {
            logger.error(TAG, "The on chain DID document supposed to contain an app info credential doesn't have such credential");
          }
        }
        else {
          logger.warn(TAG, "Unable to resolve DID Document of the app that created the managed identity");
        }
      });
    }
  }, [creatingAppDID, creatingAppDocument]);

  const signUp = (): void => {
    setPostSignInUrl(window.location.toString()); // Come back to claim page after sign up
    router.push("/signup")
  }

  const signIn = (): void => {
    setPostSignInUrl(window.location.toString()); // Come back to claim page after sign in
    router.push("/signin")
  }

  const claimIdentity = async () => {
    // TODO
    setClaimingIdentity(true);
    const claimedIdentity = await authUser.get("identity").claimManagedIdentity(claimRequest);
    if (!claimedIdentity) {
      showErrorToast("Sorry, the identity failed to be claimed for some reason");
      setClaimingIdentity(false);
    }
    else {
      // Identity was claimed successfully, go back to dashboard.
      showSuccessToast("Identity claimed successfully");
      router.replace("/dashboard");
    }
  }

  if (!mounted)
    return null;

  return (
    <div className='flex flex-col col-span-full'>
      <Typography variant='h5'>Identity claim</Typography>

      {/* Fetching initial data */}
      {!readyToDisplayDetails && <VerticalStackLoadingCard />}

      {/* Claim request not found */}
      {readyToDisplayDetails && !fetchingRequestDetails && <>
        {!claimRequest &&
          <Typography>Sorry, we could not find information about this identity at the moment.</Typography>
        }
      </>}

      {/* Claim request details */}
      {
        claimRequest && <>
          {/* We got info about the issuing application */}
          {creatingAppName && <>
            <Typography>A new Web3 identity has been prepared for you by <b>{creatingAppName}</b> and is ready for you to claim.</Typography>
            <Typography>Claiming means that this identity, initially created and controlled by {creatingAppName}, will now fully become yours, together with your other identities in your account.</Typography>
          </>}

          {/* We got info about the issuing application */}
          {!creatingAppName && <>
            <Typography>A new Web3 identity has been prepared for you by a third party application.</Typography>
            <Typography>Claiming means that this identity, initially created and controlled by another application, will now fully become yours, together with your other identities in your account.</Typography>
          </>}

          {/* Icon of the app DID that represents the creator of the user identity */}
          {creatingAppInfoCredential && <>
            <CredentialAvatar credential={creatingAppInfoCredential} />
          </>}

          {/*  No signed in user, he must sign in first */}
          {!authUser && <>
            <div className="flex items-center space-x-3 mt-8">
              {mounted && !authUser && <>
                <MainButton onClick={signUp} >Sign up</MainButton>
                <MainButton onClick={signIn} >Sign in</MainButton>
              </>}
            </div>
          </>}

          {/* User is signed in, we can proceed to claiming */}
          {authUser && <>
            <MainButton className='mt-8' onClick={claimIdentity} busy={claimingIdentity}>Claim this identity</MainButton>
            <Typography>This new identity will be transfered to your account.</Typography>
          </>
          }
        </>
      }
    </div>)
}

export default ClaimIdentityPage;