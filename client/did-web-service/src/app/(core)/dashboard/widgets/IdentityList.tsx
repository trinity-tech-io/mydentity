'use client';
import ComfirmDialog from '@components/generic/ComfirmDialog';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { activeIdentity$ } from '@services/identity/identity.events';
import { identityService } from '@services/identity/identity.service';
import { shortenDID } from '@services/identity/identity.utils';
import { logger } from '@services/logger';
import { authUser$ } from '@services/user/user.events';
import { FC, useState } from 'react';

export const IdentityListWidget: FC = _ => {
  const TAG = "IdentityList";
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [prepareDeleteDid, setPrepareDeleteDid] = useState('');
  const [authUser] = useBehaviorSubject(authUser$());
  let [identities] = useBehaviorSubject(authUser?.get("identity").identities$);
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);

  identities = identities?.slice(0, 5);

  const handleCloseDialog = async (isAgree: boolean) => {
    setOpenConfirmDialog(false);
    if (!isAgree)
      return;
    try {
      await authUser.get("identity").deleteIdentity(prepareDeleteDid);
      if (activeIdentity.did == prepareDeleteDid)
        identityService.setActiveIdentity(null);
    } catch (error) {
      logger.error(TAG, error);
    }
    return;
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">My Identities</h2>
      </header>
      <ComfirmDialog
        title='Delete this identity?'
        content='Do you want to delete this Identity?'
        open={openConfirmDialog}
        onClose={(isAgree: boolean) => handleCloseDialog(isAgree)}
      />
      {/* Table */}
      <div className="overflow-x-auto">
        <TableContainer component={Paper}>
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>Identity</TableCell>
                <TableCell align="right">Creation date</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                (identities && identities.length > 0) && identities.map(identity => {
                  return (
                    <TableRow key={identity.did}>
                      <TableCell>{shortenDID(identity.did, 8)}</TableCell>
                      <TableCell align="right">{identity.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell align="right">
                        <IconButton aria-label="delete" onClick={() => { setOpenConfirmDialog(true); setPrepareDeleteDid(identity.did) }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                }
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
