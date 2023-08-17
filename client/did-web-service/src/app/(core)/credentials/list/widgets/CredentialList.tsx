'use client';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { FC, useEffect, useState } from 'react';
import { activeIdentity$ } from '@services/identity/identity.events';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@mui/material';
import { activeCredential$ } from '@services/credential/credential.events';
import { Credential } from '@model/credential/credential';

export const CredentialListWidget: FC = () => {
  const TAG = "CredentialList";
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [credentials] = useBehaviorSubject(activeIdentity?.get("credentials").credentials$);
  const [selectedIndex, setSelectedIndex] = useState("");

  const handleListItemClick = (
    credential: Credential,
  ) => {
    setSelectedIndex(credential.id);
    activeCredential$.next(credential);
  };
  
  useEffect(() => {
    if(credentials && credentials[0]){
      setSelectedIndex(credentials[0].id);
      activeCredential$.next(credentials[0]);
    }
  },[credentials]);

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
              <ListItemText primary={c.verifiableCredential.getId().getFragment()} secondary={c.verifiableCredential.getSubject().getProperty(c.verifiableCredential.getId().getFragment())}/>
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

