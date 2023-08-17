import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { Avatar, Box, Grid, Stack, Typography } from '@mui/material';
import { activeCredential$ } from '@services/credential/credential.events';
import { FC, useEffect, useState } from 'react';

export const CredentialDetailWidget: FC = () => {
  const [activeCredential] = useBehaviorSubject(activeCredential$);
  const [isShowDtail, setIsShowDetail] = useState(false);

  useEffect(() => {
    if(activeCredential){
      setIsShowDetail(true);

      
    }
  },[activeCredential]);

  return (
    <div className="col-span-full xl:col-span-7 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    { isShowDtail && 
      ( <Box sx={{ px: 2.5, pb: 3 }}>
          <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
            <Avatar  src="/assets/images/account.svg" sx={{ ml:2, width: 120, height: 120 }}/>
            <Box sx={{ textAlign: 'left', width:'50%' }}>
              <Typography gutterBottom variant="h6">
                {activeCredential.verifiableCredential.getId().getFragment()}
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {activeCredential.verifiableCredential.getSubject().getProperty(activeCredential.verifiableCredential.getId().getFragment())}
              </Typography>

                <Grid container spacing={2} sx={{mt:1}}>
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
                </Grid>
            </Box>
          </Stack>
        </Box>)}
    </div>
  );
}
