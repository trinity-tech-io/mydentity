"use client";
import { FC, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";
import { CredentialAvatar } from "@components/credential/CredentialAvatar";
import { IconAvatar } from "@components/feature/DetailLine";
import { MainButton } from "@components/generic/MainButton";
import Headline from "@components/layout/Headline";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { AppInfoCredential } from "@model/credential/app-info-credential";
import { credentialFromVerifiableCredential } from "@model/credential/credential-builder";
import { Document } from "@model/document/document";
import { AppException } from "@model/exceptions/app-exception";
import { IdentityClaimExceptionCode } from "@model/exceptions/exception-codes";
import { IdentityClaimRequest } from "@model/identity-claim-request/identity-claim-request";
import { useToast } from "@services/feedback.service";
import { setPostSignInUrl } from "@services/flow.service";
import { fetchIdentityClaimRequest } from "@services/identity-claim/identity-claim.service";
import { didDocumentService } from "@services/identity/diddocuments.service";
import { logger } from "@services/logger";
import { authUser$, authUserReady$ } from "@services/user/user.events";
import CardIcon from "@assets/images/card/card.svg";
import { LandingCard } from "@components/card";
import GradientTypography from "@components/text/GradientTypography";
import {
  SecurityState,
  SecurityStatus,
} from "../dashboard/components/SecurityStatus";
import { DarkButton } from "@components/button";
import { LoadingApplicationCard } from "@components/loading-skeleton";

const TAG = "claim-identity";

const ClaimIdentityPage: FC = () => {
  const { mounted } = useMounted();
  const searchParams = useSearchParams();
  const claimRequestId = searchParams.get("request");
  const claimRequestNonce = searchParams.get("nonce");
  const [fetchingRequestDetails, setFetchingRequestDetails] = useState(true);
  const [claimingIdentity, setClaimingIdentity] = useState(false);
  const [claimRequest, setClaimRequest] = useState<IdentityClaimRequest>(null);
  const [creatingAppDID, setCreatingAppDID] = useState<string>(null);
  const [creatingAppDocument, setCreatingAppDocument] =
    useState<Document>(null);
  const [creatingAppInfoCredential, setCreatingAppInfoCredential] =
    useState<AppInfoCredential>(null);
  const [creatingAppName] = useBehaviorSubject(
    creatingAppInfoCredential?.name$
  );
  const [fetchFailedReason, setFetchFailedReason] = useState(null);
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
      fetchIdentityClaimRequest(claimRequestId, claimRequestNonce)
        .then((cr) => {
          logger.log(TAG, "Got claim request", cr);
          if (cr) {
            setClaimRequest(cr);
            setCreatingAppDID(cr.identityInfo?.creatingAppDid);
          } else {
            setFetchingRequestDetails(false);
          }
        })
        .catch((e) => {
          setFetchingRequestDetails(false);

          if (e instanceof AppException) {
            switch (e.appExceptionCode) {
              case IdentityClaimExceptionCode.AlreadyClaimed:
                setFetchFailedReason("This identity is already claimed");
                break;
              case IdentityClaimExceptionCode.InvalidNonce:
                setFetchFailedReason("Security code is invalie");
                break;
              case IdentityClaimExceptionCode.RequestExpired:
                setFetchFailedReason(
                  "Request expired, please try again from your original application"
                );
                break;
              case IdentityClaimExceptionCode.RequestNotExists:
                setFetchFailedReason(
                  "This identity transfer request doesn't exist"
                );
                break;
            }
          }
        });
    }
  }, [claimRequestId, claimRequestNonce, claimRequest]);

  /**
   * Fetch the creating app's DID document on chain
   */
  useEffect(() => {
    if (creatingAppDID && !creatingAppDocument) {
      logger.log(TAG, "Fetching creating app's DID document on chain");
      didDocumentService
        .resolveDIDDocument(creatingAppDID)
        .then(async (doc) => {
          setFetchingRequestDetails(false);
          setCreatingAppDocument(doc);

          logger.log(TAG, "Got creating app's DID document:", doc);

          if (doc) {
            const appInfoVC = doc.getCredentialByType("ApplicationCredential");
            if (appInfoVC) {
              setCreatingAppInfoCredential(
                (await credentialFromVerifiableCredential(
                  appInfoVC
                )) as AppInfoCredential
              );
            } else {
              logger.error(
                TAG,
                "The on chain DID document supposed to contain an app info credential doesn't have such credential"
              );
            }
          } else {
            logger.warn(
              TAG,
              "Unable to resolve DID Document of the app that created the managed identity"
            );
          }
        });
    }
  }, [creatingAppDID, creatingAppDocument]);

  const signUp = (): void => {
    setPostSignInUrl(window.location.toString()); // Come back to claim page after sign up
    router.push("/register");
  };

  const signIn = (): void => {
    setPostSignInUrl(window.location.toString()); // Come back to claim page after sign in
    router.push("/signin");
  };

  const claimIdentity = async (): Promise<void> => {
    // TODO
    setClaimingIdentity(true);
    const claimedIdentity = await authUser
      .get("identity")
      .claimManagedIdentity(claimRequest, claimRequestNonce);
    if (!claimedIdentity) {
      showErrorToast(
        "Sorry, the identity failed to be claimed for some reason"
      );
      setClaimingIdentity(false);
    } else {
      // Identity was claimed successfully, go back to dashboard.
      showSuccessToast("Identity claimed successfully");
      router.replace("/dashboard");
    }
  };

  return (
    <div>
      <Headline
        title="Claim Identity"
        description={
          <>
            {creatingAppName ? (
              <b>{creatingAppName}</b>
            ) : (
              "Third party application"
            )}{" "}
            has set up a new Web3 identity for you. It's now ready for you to
            claim. This means that the identity, initially created and managed
            by{" "}
            {creatingAppName ? (
              <b>{creatingAppName}</b>
            ) : (
              "Third party application"
            )}
            , will become entirely yours, alongside your other identities.
          </>
        }
        showBg={true}
      />
      <div className="inline-flex items-center">
        <IconAvatar>
          <div className="w-4 h-4 flex justify-center">
            <CardIcon />
          </div>
        </IconAvatar>
        <Typography variant="subtitle1" className="pl-2">
          New Identity
        </Typography>
      </div>
      {/* Fetching initial data */}
      {(!claimRequest || !readyToDisplayDetails) && (
        <div className="max-w-md w-full m-auto pt-4">
          <LoadingApplicationCard />
        </div>
      )}

      {/* Claim request not found */}
      {readyToDisplayDetails && !fetchingRequestDetails && (
        <>
          {!claimRequest && (
            <Box className="mt-4 text-center">
              <Typography variant="h6">
                Sorry, we could not find information about this identity at the
                moment.
                {fetchFailedReason && <p>{fetchFailedReason}</p>}
              </Typography>
            </Box>
          )}
        </>
      )}

      {/* Claim request details */}
      {readyToDisplayDetails && claimRequest && (
        <>
          {/* Icon of the app DID that represents the creator of the user identity */}
          {/* {creatingAppInfoCredential && (
            <>
              <CredentialAvatar credential={creatingAppInfoCredential} />
            </>
          )} */}
          <div className="max-w-md w-full m-auto pt-4">
            <LandingCard
              className="w-full h-auto bg-neutral-950"
              waveIconVisible={false}
              footer={
                <Typography variant="caption">{creatingAppDID}</Typography>
              }
            >
              <Stack sx={{ mb: "5%" }} spacing={3}>
                <SecurityStatus
                  state={SecurityState.Average}
                  advice="Once claimed, this identity will be transferred over to your account."
                />
                <GradientTypography variant="h4" fontWeight={600}>
                  {creatingAppName || "Unnamed application"}
                </GradientTypography>
              </Stack>
            </LandingCard>
            {/* User is signed in, we can proceed to claiming */}
            {authUser && (
              <div className="mt-4 px-4">
                <DarkButton
                  className="w-full"
                  loading={claimingIdentity}
                  onClick={claimIdentity}
                >
                  CLAIM THIS IDENTITY
                </DarkButton>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ClaimIdentityPage;
