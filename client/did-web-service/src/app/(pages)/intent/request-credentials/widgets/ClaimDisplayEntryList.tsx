'use client';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { FC } from 'react';
import { ClaimDisplayEntry } from '../RequestDetails';
import { CredentialDisplayEntryWidget } from './CredentialDisplayEntry';

interface Props {
  claimDisplayEntryList: ClaimDisplayEntry[]
}

export const ClaimDisplayEntryListWidget: FC<Props> = (props) => {
  const { claimDisplayEntryList } = props;

  return (
    <div className="col-span-full xl:col-span-5 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <Divider />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        { claimDisplayEntryList &&
          <List component="nav" aria-label="main mailbox folders">
            {
              claimDisplayEntryList.map(cl =>
                <div key={cl.claimDescription.reason} className='flex flex-col flex-1'>
                  <div> { cl.claimDescription.reason } </div>

                  { cl.matchingCredentials &&
                    <List component="nav" aria-label="main mailbox folders">
                      {
                        cl.matchingCredentials.map(c =>
                          <div key={c.credential.id}>
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

