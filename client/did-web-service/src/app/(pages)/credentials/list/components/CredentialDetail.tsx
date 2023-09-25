import CheckIcon from '@assets/images/check-full.svg';
import WarningIcon from '@assets/images/warning.svg';
import { JsonViewer } from "@components/credential/JsonViewer";
import { CredentialAvatar } from '@components/credential/CredentialAvatar';
import { VerticalStackLoadingCard } from '@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { Box, Grid, ListItemButton, ListItemIcon, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { activeIdentity$ } from '@services/identity/identity.events';
import Image from 'next/image';
import { FC, useState } from 'react';
import { ApplicationRow } from './ApplicationRow';
import IdentityMenu from './IdentityMenu';

export const CredentialDetailWidget: FC = () => {
  const mounted = useMounted();
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const identityProfileFeature = activeIdentity?.get("profile");
  const [activeCredential] = useBehaviorSubject(identityProfileFeature?.activeCredential$);
  const [issuerInfo] = useBehaviorSubject(activeCredential?.issuerInfo$);
  const [isConform] = useBehaviorSubject(activeCredential?.isConform$);
  const [requestingApplications] = useBehaviorSubject(activeCredential?.requestingApplications$);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = (): void => {
    setShowMore(!showMore);

  }

  return (
    <div className="col-span-full xl:col-span-7 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      {(!mounted) && <VerticalStackLoadingCard />}
      {mounted && activeCredential &&
        (<Box sx={{ px: 2.5, pb: 3 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <IdentityMenu credential={activeCredential} />
          </div>
          <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
            <CredentialAvatar credential={activeCredential} width={120} height={120} />
            <Box sx={{ textAlign: 'left', width: '80%' }}>
              <Typography gutterBottom variant="h6">
                {activeCredential.getDisplayableTitle()}
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                <JsonViewer data={activeCredential.getDisplayValue()}></JsonViewer>
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Issuance date:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {activeCredential.verifiableCredential.issuanceDate.toLocaleDateString()}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Expiration date:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {activeCredential.verifiableCredential.expirationDate.toLocaleDateString()}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  {activeCredential.getContentTree() !== null && (
                    <Button variant="outlined" color="primary" onClick={handleShowMore}>
                      {showMore ? 'Hide More' : 'Show More'}
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {showMore && activeCredential.getContentTree() !== null && (
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      <JsonViewer data={activeCredential.getContentTree()}></JsonViewer>
                    </Typography>
                  )}
                </Grid>

                {activeCredential.isSensitiveCredential() &&
                  <><Grid item xs={6}>
                    <Typography fontSize={14} color={"#FF6347"} gutterBottom>
                      Sensitive
                    </Typography>
                  </Grid></>
                }

                {(!activeCredential.selfIssued() && issuerInfo?.isPublished) && (
                  <ListItemButton sx={{ marginTop: 2 }}>
                    <ListItemIcon>
                      <Image unoptimized src={issuerInfo?.avatarIcon} width={30} height={30} style={{ borderRadius: '50%' }} alt="avatar" />
                    </ListItemIcon>

                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      Created by {issuerInfo?.name}
                    </Typography>
                  </ListItemButton>
                )}


                { (null != isConform) &&
                  <div className='mt-4 flex flex-row items-center gap-4 p-4 text-white rounded-lg' style={{ backgroundColor: isConform ? "#1daa1f" : "#a8251e" }}>
                    {isConform && <>
                      <CheckIcon height={40} />
                      <Typography variant="body1">
                        This credential is conform to a format published by its issuer. It can be easily reused by multiple applications.
                      </Typography>
                    </>
                    }
                    {!isConform && <>
                      <WarningIcon height={40} />
                      <Typography variant="body1">
                        This credential doesn't have a published format and can hardly be reused by third party applications.
                      </Typography>
                    </>}
                  </div>
                }


                {/* Shared with apps */}
                {requestingApplications?.length > 0 &&
                  <Grid item>
                    <Typography variant="h6">Shared with apps</Typography>
                    <Typography>The following apps got access to this credential:</Typography>
                    {
                      requestingApplications?.map((app, i) => <div key={i} className='my-4'>
                        <ApplicationRow application={app} />
                      </div>)
                    }
                  </Grid>
                }
              </Grid>
            </Box>
          </Stack>
        </Box>)}
    </div>
  );
}
