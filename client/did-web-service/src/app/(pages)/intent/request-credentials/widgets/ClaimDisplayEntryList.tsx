'use client';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { FC } from 'react';
import { ClaimDisplayEntry } from '../RequestDetails';
import { ClaimDisplayEntryWidget } from './ClaimDisplayEntry';

interface Props {
  claimDisplayEntryList: ClaimDisplayEntry[]
}

export const ClaimDisplayEntryListWidget: FC<Props> = (props) => {
  const { claimDisplayEntryList } = props;

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
                  <ClaimDisplayEntryWidget claimDisplayEntry={cl} />
                </div>
              )
            }
          </List>
        }
      </Box>
    </div>
  );
}

