import WarningIcon from '@assets/images/warning.svg';
import { VerticalStackLoadingCard } from '@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { Credential } from '@model/credential/credential';
import { ProfileCredential } from '@model/credential/profile-credential';
import { Avatar, Box, Grid, ListItemButton, ListItemIcon, Stack, Typography } from '@mui/material';
import IdentityMenu from './IdentityMenu';

interface Props {
  selectedCredential: Credential
}
export const CredentialDetailWidget = (props: Props) => {
  const { selectedCredential } = props;
  const isProfileCredential = selectedCredential instanceof ProfileCredential;
  const [issuerInfo] = useBehaviorSubject(selectedCredential?.issuerInfo$);
  const mounted = useMounted();
  const [isConfirmed] = useBehaviorSubject(selectedCredential?.isConfirm$);

  return (
    <div className="col-span-full xl:col-span-7 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      {(!selectedCredential || !mounted) && <VerticalStackLoadingCard />}
      {mounted && selectedCredential &&
        (<Box sx={{ px: 2.5, pb: 3 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            {isProfileCredential && <IdentityMenu onEdit={selectedCredential} onDelete={selectedCredential} />}
          </div>
          <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
            <Avatar src="/assets/images/account.svg" sx={{ ml: 2, width: 120, height: 120 }} />
            <Box sx={{ textAlign: 'left', width: '80%' }}>
              <Typography gutterBottom variant="h6">
                {selectedCredential.getDisplayableTitle()}
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {selectedCredential.getDisplayValue()}
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Issuance date:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {selectedCredential.verifiableCredential.issuanceDate.toLocaleDateString()}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Expiration date:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {selectedCredential.verifiableCredential.expirationDate.toLocaleDateString()}
                  </Typography>
                </Grid>

                {
                  (!selectedCredential.selfIssued() && issuerInfo?.isPublished) && (
                    <><Grid item>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Created by {issuerInfo?.name}
                      </Typography>
                    </Grid>
                      {/* TODO Issuer avatar */}
                      </>
                )}

                <ListItemButton>
                  <ListItemIcon>
                    <WarningIcon width={30} />
                  </ListItemIcon>
                  {
                    (isConfirmed) && (
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        This credential is conform to a known type that can be shared by any application.
                    </Typography>
                  )}
                  {
                    (!isConfirmed) && (
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      This credential doesn't conform to known credential formats and can hardly be reused by many applications.
                    </Typography>
                  )}
                </ListItemButton>
              </Grid>
            </Box>
          </Stack>
        </Box>)}
    </div>
  );
}
