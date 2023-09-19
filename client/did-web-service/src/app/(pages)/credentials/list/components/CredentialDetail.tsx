import WarningIcon from '@assets/images/warning.svg';
import { CredentialAvatar } from '@components/credential/CredentialAvatar';
import { VerticalStackLoadingCard } from '@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { Credential } from '@model/credential/credential';
import { Box, Grid, ListItemButton, ListItemIcon, Stack, Typography } from '@mui/material';
import { activeIdentity$ } from '@services/identity/identity.events';
import Image from 'next/image';
import { FC } from 'react';
import { ApplicationRow } from './ApplicationRow';
import IdentityMenu from './IdentityMenu';

interface Props {
  selectedCredential: Credential
}
export const CredentialDetailWidget: FC<Props> = (props) => {
  const mounted = useMounted();
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const identityProfileFeature = activeIdentity?.get("profile");
  const [activeCredential] = useBehaviorSubject(identityProfileFeature?.activeCredential$);
  const [issuerInfo] = useBehaviorSubject(activeCredential?.issuerInfo$);
  const [isConform] = useBehaviorSubject(activeCredential?.isConform$);
  const [requestingApplications] = useBehaviorSubject(activeCredential?.requestingApplications$);

  return (
    <div className="col-span-full xl:col-span-7 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      {(!activeCredential || !mounted) && <VerticalStackLoadingCard />}
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
                {activeCredential.getDisplayValue()}
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

                <ListItemButton sx={{ marginTop: 2 }}>
                  <ListItemIcon>
                    <WarningIcon width={30} />
                  </ListItemIcon>
                  {
                    (isConform) && (
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        This credential is conform to a known type that can be shared by any application.
                      </Typography>
                    )}
                  {
                    (!isConform) && (
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        This credential doesn't conform to known credential formats and can hardly be reused by many applications.
                      </Typography>
                    )}
                </ListItemButton>

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
