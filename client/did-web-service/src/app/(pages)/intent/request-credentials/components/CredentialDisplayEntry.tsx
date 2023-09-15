'use client';
import { CredentialAvatar } from '@components/credential/CredentialAvatar';
import CredentialBasicInfo from '@components/credential/CredentialBasicInfo';
import { Checkbox, ListItemButton } from '@mui/material';
import { logger } from '@services/logger';
import { FC, useEffect, useState } from 'react';
import { ClaimDisplayEntry, CredentialDisplayEntry } from '../RequestDetails';

interface Props {
  claimDisplayEntry: ClaimDisplayEntry,
  credentialDisplayEntry: CredentialDisplayEntry,
  updateSummary: () => void;
}

export const CredentialDisplayEntryWidget: FC<Props> = (props) => {
  const TAG = "RequestCredentialsIntent";
  const { claimDisplayEntry, credentialDisplayEntry, updateSummary } = props;

  const [credentialSelected, setCredentialSelected] = useState(false);

  useEffect(() => {
    if (credentialDisplayEntry)
      setCredentialSelected(credentialDisplayEntry.selected)
  }, [credentialDisplayEntry])

  /**
   * Called when user clicks the credential checkbox.
   *
   * Several cases can happen, and it all depends the min and max number of credentials the calling
   * app is expecting for the parent claim.
   */
  const onCredentialSelection = (claim: ClaimDisplayEntry, credentialEntry: CredentialDisplayEntry): void => {
    // If currently selected, we expect to unselect. But the code below will decide whether this
    // expectation can be fulfilled or not.
    const expectingToUnselect = credentialEntry.selected;

    logger.log(TAG, "onCredentialSelection", claim, credentialEntry);

    if (expectingToUnselect) {
      // Expecting to unselect
      if (claim.claimDescription.min === 1 && claim.claimDescription.max === 1) {
        // Do nothing, cannot unselect. Need to select another one
      }
      else {
        credentialEntry.selected = false;
      }
    }
    else {
      // Expecting to select
      if (claim.claimDescription.min === 1 && claim.claimDescription.max === 1) {
        // We can select yes, but we also need to unselect the currently selected one
        const selectedCredentialEntry = getFirstSelectedCredentialInClaim(claim);
        if (selectedCredentialEntry)
          selectedCredentialEntry.selected = false;
      }

      credentialEntry.selected = true;
    }

    setCredentialSelected(credentialEntry.selected)
    updateSummary();
  }

  const getFirstSelectedCredentialInClaim = (claim: ClaimDisplayEntry): CredentialDisplayEntry => {
    return claim.matchingCredentials.find(c => c.selected);
  }

  return (
    <div className='flex flex-row mt-4 gap-6'>
      <ListItemButton
        onClick={(): void => onCredentialSelection(claimDisplayEntry, credentialDisplayEntry)}
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

