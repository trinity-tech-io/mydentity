'use client';
import CredentialBasicInfo from '@components/credential/credentialBasicInfo';
import { VerticalStackLoadingCard } from '@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { Credential } from '@model/credential/credential';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { activeIdentity$ } from '@services/identity/identity.events';
import { FC, useEffect, useState, useRef } from 'react';

interface ConfirmDialogProps {
  onSelected: (credential: Credential) => void;
}

export const CredentialListWidget: FC<ConfirmDialogProps> = (props) => {
  const { onSelected } = props;
  const TAG = "CredentialList";
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [credentials] = useBehaviorSubject(activeIdentity?.get("credentials").credentials$);
  const [selectedID, setSelectedID] = useState<string>(null);  const mounted = useMounted();
  const identityProfileFeature = activeIdentity?.get("profile");
  const [activeCredential] = useBehaviorSubject(identityProfileFeature?.activeCredential$);

  const handleListItemClick = (
    credential: Credential,
  ): void => {
    setSelectedID(credential.id);
    onSelected(credential);
  };

  useEffect(() => {
    if (activeCredential && !selectedID) {
      for (let i = 0; i < credentials.length; i++ ) {
        const credential =  credentials[i]
        if (activeCredential.id == credential.id) {
          onSelected(credential)
          setSelectedID(credential.id)
        }
      }
    }
    

  }, [activeCredential]);

  return (
    <div className="col-span-full xl:col-span-5 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <Typography ml={2} my={3} variant="subtitle1">Credentials</Typography>
      <Divider />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {(!credentials || !mounted) && <VerticalStackLoadingCard />}
        {mounted && credentials &&
          <List component="nav" aria-label="main mailbox folders">
            {
              credentials.map(c =>
                <div key={c.id}>
                  <ListItemButton
                    selected={selectedID === c.id}
                    onClick={(): void => handleListItemClick(c)}>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <CredentialBasicInfo
                      credential={c}
                    />
                  </ListItemButton>
                  <Divider />
                </div>
              )
            }
          </List>
        }
      </Box>
    </div>
  );
}

