'use client';
import { CredentialAvatar } from '@components/credential/CredentialAvatar';
import CredentialBasicInfo from '@components/credential/CredentialBasicInfo';
import { VerticalStackLoadingCard } from '@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { Credential } from '@model/credential/credential';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { activeIdentity$ } from '@services/identity/identity.events';
import { FC, useEffect, useState } from 'react';
import { FiltersDropdown } from "./FiltersDropdown";
import { filterCredentials, arraysAreEqual } from './FilterConditions'; 

export const CredentialListWidget: FC = () => {
  const TAG = "CredentialList";
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [credentials] = useBehaviorSubject(activeIdentity?.get("credentials").credentials$);
  const mounted = useMounted();
  const identityProfileFeature = activeIdentity?.get("profile");
  const [activeCredential] = useBehaviorSubject(identityProfileFeature?.activeCredential$);
  const [selectedFilter, setSelectedFilter] = useState<string>(''); // State to hold the selected filter
  const [filteredCredentials, setFilteredCredentials] = useState<Credential[]>(credentials);

  const handleListItemClick = (
    credential: Credential,
  ): void => {
    identityProfileFeature.setActiveCredential(credential)
  };

  useEffect(() => {
    if (credentials && !activeCredential) {
      identityProfileFeature.setActiveCredential(credentials[0])
    }
    if (selectedFilter && credentials) {
      const filtered = filterCredentials(selectedFilter, credentials, activeIdentity)
      if (filtered && !arraysAreEqual(filtered, filteredCredentials)) {
        setFilteredCredentials(filtered);
        identityProfileFeature.setActiveCredential(filtered[0] || null);
      } else if (filtered.length === 0 || !filtered) {
       identityProfileFeature.setActiveCredential(null);
      }
    } else {
      if (!filteredCredentials) {
        setFilteredCredentials(credentials);
      }
    }
  }, [activeCredential, credentials, identityProfileFeature,selectedFilter,filteredCredentials, activeIdentity]);

  const handleFilterChange = (filter: string): void => {
    setSelectedFilter(filter); // Update the selected filter when it changes
  };

  return (
    <div className="col-span-full xl:col-span-5 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography ml={2} my={3} variant="subtitle1">
          Credentials
        </Typography>
        <FiltersDropdown onFilterChange={handleFilterChange}/>
      </div>
      <Divider />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {(!filteredCredentials || !mounted) && <VerticalStackLoadingCard />}
        {mounted && filteredCredentials &&
          <List component="nav" aria-label="main mailbox folders">
            {
              filteredCredentials.map(c =>
                <div key={c.id}>
                  <ListItemButton
                    selected={activeCredential && activeCredential.id === c.id}
                    onClick={(): void => handleListItemClick(c)}
                    style={{ display: 'flex', alignItems: 'center' }} 
                    >
                    <div style={{ marginRight: 10 }}>
                      <CredentialAvatar credential={c} width={60} height={60} />
                    </div>
                    <CredentialBasicInfo credential={c} />
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

