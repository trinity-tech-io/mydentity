'use client';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { Credential } from '@model/credential/credential';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { activeIdentity$ } from '@services/identity/identity.events';
import { useEffect, useState } from 'react';

interface ConfirmDialogProps {
  onSelected: (credential: Credential) => void;
}

export const CredentialListWidget = (props: ConfirmDialogProps) => {
  const { onSelected } = props;
  const TAG = "CredentialList";
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [credentials] = useBehaviorSubject(activeIdentity?.get("credentials").credentials$);
  const [selectedIndex, setSelectedIndex] = useState("");

  const handleListItemClick = (
    credential: Credential,
  ) => {
    setSelectedIndex(credential.id);
    onSelected(credential);
  };

  useEffect(() => {
    if (credentials?.[0]) {
      onSelected(credentials[0]);
      setSelectedIndex(credentials[0].id);
    }
  }, [credentials, activeIdentity]);

  return (
    <div className="col-span-full xl:col-span-5 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <Typography ml={2} my={3} variant="subtitle1">Credentials</Typography>
      <Divider />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List component="nav" aria-label="main mailbox folders">
          {
            credentials?.map(c =>
              <div key={c.id}>
                <ListItemButton
                  selected={selectedIndex === c.id}
                  onClick={() => handleListItemClick(c)}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={c.tittle} secondary={activeIdentity.getName(c)} />
                </ListItemButton>
                <Divider />
              </div>
            )
          }
        </List>
      </Box>
    </div>
  );
}

