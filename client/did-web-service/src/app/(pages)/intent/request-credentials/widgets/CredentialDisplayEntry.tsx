'use client';
import { CredentialAvatar } from '@components/credential/CredentialAvatar';
import CredentialBasicInfo from '@components/credential/CredentialBasicInfo';
import { Checkbox, ListItemButton } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { CredentialDisplayEntry } from '../RequestDetails';

interface Props {
  credentialDisplayEntry: CredentialDisplayEntry
}

export const CredentialDisplayEntryWidget: FC<Props> = (props) => {
  const { credentialDisplayEntry } = props;

  const [credentialSelected, setCredentialSelected] = useState(false);

  useEffect(() => {
    if (credentialDisplayEntry)
      setCredentialSelected(credentialDisplayEntry.selected)
  }, [credentialDisplayEntry])

  const handleListItemClick = (
    credentialDisplayEntry: CredentialDisplayEntry,
  ): void => {
    credentialDisplayEntry.selected = !credentialDisplayEntry.selected;
    setCredentialSelected(credentialDisplayEntry.selected)
  };

  return (
    <div className='flex flex-row mt-4 gap-6'>
      <ListItemButton
        onClick={(): void => handleListItemClick(credentialDisplayEntry)}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <div style={{ marginRight: 10 }}>
          <CredentialAvatar credential={credentialDisplayEntry.credential} width={60} height={60} />
        </div>
        <CredentialBasicInfo credential={credentialDisplayEntry.credential} />
        <Checkbox
          checked={ credentialSelected }
        />
      </ListItemButton>
    </div>
  );
}

