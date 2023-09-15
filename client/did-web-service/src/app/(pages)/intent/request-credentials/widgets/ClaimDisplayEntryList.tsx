'use client';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { logger } from '@services/logger';
import { FC } from 'react';
import { ClaimDisplayEntry, CredentialDisplayEntry } from '../RequestDetails';
import { CredentialDisplayEntryWidget } from './CredentialDisplayEntry';

interface Props {
  claimDisplayEntryList: ClaimDisplayEntry[]
}

export const ClaimDisplayEntryListWidget: FC<Props> = (props) => {
  const { claimDisplayEntryList } = props;
  const TAG = "RequestCredentialsIntent";

  // const [state, setState] = useState([]);

  // useEffect(() => {
  //   if (claimDisplayEntryList)
  //     setState(claimDisplayEntryList)
  // }, [claimDisplayEntryList])


  /**
   * Convenient string format that describes the currenty claim selection status and requirement.
   *
   * min 1 max 1: "x / 1"
   * min 0 max 3: "x / max 3"
   * min 2 max 2: "x / 2"
   * min 2 max 4: "x / min 2, max 4"
   */
  const claimSelectionSummary = (claim: ClaimDisplayEntry): string => {
    const selectedNb = numberOfSelectedCredentialsInClaim(claim);

    if (claim.claimDescription.min === claim.claimDescription.max)
      return `${selectedNb} / ${claim.claimDescription.min}`;
    else {
      if (claim.claimDescription.min === 0)
        return `${selectedNb} / max ${claim.claimDescription.max}`;
      else
        return `${selectedNb} / min ${claim.claimDescription.min}, max ${claim.claimDescription.max}`;
    }
  }

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

    // logger.log(TAG, "credentialEntry.selected", credentialEntry.selected, claimDisplayEntryList);
    // setState(claimDisplayEntryList)
  }

  const numberOfSelectedCredentialsInClaim = (claim: ClaimDisplayEntry): number => {
    return claim.matchingCredentials.reduce((acc, c) => c.selected ? acc + 1 : acc, 0);
  }

  const getFirstSelectedCredentialInClaim = (claim: ClaimDisplayEntry): CredentialDisplayEntry => {
    return claim.matchingCredentials.find(c => c.selected);
  }

  return (
    <div className="col-span-full p-2 xl:col-span-5 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      List of credentials
      <Divider />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        { claimDisplayEntryList &&
          <List component="nav" aria-label="main mailbox folders">
            {
              claimDisplayEntryList.map(cl =>
                <div key={cl.claimDescription.reason} className='flex flex-col flex-1'>
                  <div className="flex flex-row p-4"> { cl.claimDescription.reason } </div>
                  <div className="text-right pr-4">
                  { claimSelectionSummary(cl) }
                  </div>

                  { cl.matchingCredentials &&
                    <List component="nav" aria-label="main mailbox folders">
                      {
                        cl.matchingCredentials.map((c: CredentialDisplayEntry) =>
                          <div key={c.credential.id}
                            onClick={(): void => onCredentialSelection(cl, c)}
                          >
                            <CredentialDisplayEntryWidget credentialDisplayEntry={c} />
                            <Divider />
                          </div>
                        )
                      }
                    </List>
                  }
                </div>
              )
            }
          </List>
        }
      </Box>
    </div>
  );
}

