import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Credential } from '@model/credential/credential';
import { Box, Grid, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import Image from 'next/image';
import { convertUtcToLocaleDateTime } from '@utils/strings';

interface Props {
    credential: Credential;
}

function CredentialBasicInfo(props: Props): JSX.Element {
    const { credential } = props;
    const [issuerInfo] = useBehaviorSubject(credential?.issuerInfo$);

    let value = credential.getDisplayValue();
    if (credential.getDisplayableTitle() == 'Nationality') {   
      value = value.label
    }
    else if (credential.getDisplayableTitle() == 'BirthDate') {
      value = convertUtcToLocaleDateTime(value)
    }
  return (
    <Box sx={{ textAlign: 'left', width: '100%' }}>
      <Typography gutterBottom variant="h6">
        {credential.getDisplayableTitle()}
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {value}
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {credential.isSensitiveCredential() &&
          <Typography fontSize={14} color={"#FF6347"}>
            Sensitive
          </Typography>
        }

        {
          (!credential.selfIssued() && issuerInfo?.isPublished) && (
            <ListItemButton>
              <ListItemIcon>
                <Image unoptimized src={issuerInfo?.avatarIcon} width={30} height={30} style={{ borderRadius: '50%' }} alt=""/>
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