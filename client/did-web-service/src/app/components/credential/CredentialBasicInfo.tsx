import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Credential } from '@model/credential/credential';
import { Box, Grid, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import Image from 'next/image';
import { JsonViewer } from './JsonViewer';

interface Props {
  credential: Credential;
}

function CredentialBasicInfo(props: Props): JSX.Element {
  const { credential } = props;
  const [issuerInfo] = useBehaviorSubject(credential?.issuerInfo$);

  return (
    <Box sx={{ textAlign: 'left', width: '100%' }}>
      <Typography gutterBottom variant="h6">
        {credential.getDisplayableTitle()}
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {credential.getDisplayValue() && <JsonViewer data={credential.getDisplayValue()} />}
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {credential.isSensitiveCredential() &&
          <Typography fontSize={14} color={"#FF6347"}>
            Sensitive
          </Typography>
        }

        {
          (!credential.isSelfIssued() && issuerInfo?.isPublished) && (
            <ListItemButton>
              <ListItemIcon>
                <Image unoptimized src={issuerInfo?.avatarIcon} width={30} height={30} style={{ borderRadius: '50%' }} alt="" />
              </ListItemIcon>

              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Created by {issuerInfo?.name}
              </Typography>
            </ListItemButton>
          )}
      </Grid>
    </Box>
  )

}

export default CredentialBasicInfo;