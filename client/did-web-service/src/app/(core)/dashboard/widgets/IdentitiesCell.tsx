'use client';
import React from 'react';
import { useState } from 'react';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import IdentityCellLeft from './CellLeft';
import ComfirmDialog from '@components/generic/ComfirmDialog';
import { activeIdentity$ } from '@services/identity/identity.events';
import { authUser$ } from '@services/user/user.events';
import { identityService } from '@services/identity/identity.service';
import { logger } from '@services/logger';

const useStyles = makeStyles((theme: Theme) => ({
  cell: {
    padding: theme.spacing(2),
    border: `0.1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Center horizontally and set side spacing
    height: 80,
    width: '100%',
    marginRight: 2, // Set the right margin to 2px
  },
  customCellContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cellClicked: {
    background: 'rgba(0, 0, 0, 0.08)', // Use the active color as the background
    transition: 'background 0.4s', // Add a transition effect
  },

  hoverCell: {
    transition: 'background 0.2s',
    '&:hover': {
      background: theme.palette.action.hover, //
    },
  },
}));

const CustomCell = ({ identity }) => {
  const TAG = 'CustomCell'
  const classes = useStyles();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [prepareDeleteDid, setPrepareDeleteDid] = useState('');
  const [authUser] = useBehaviorSubject(authUser$());
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [cellClicked, setCellClicked] = useState(false);

  const handleCloseDialog = async (isAgree: boolean) => {
    setOpenConfirmDialog(false);
    if (!isAgree)
      return
    try {
      await authUser.get("identity").deleteIdentity(prepareDeleteDid)
      if (activeIdentity.did == prepareDeleteDid)
        identityService.setActiveIdentity(null)
    } catch (error) {
      logger.error(TAG, error)
    }
    return
  }

  const handleCellClick = (identity) => {
    // TODO:
    console.log("click Cell ==========================")
  }

  return (
    <Grid item xs={12}>
      <div>
        <ComfirmDialog
          title='Delete this identity?'
          content='Do you want to delete this Identity?'
          open={openConfirmDialog}
          onClose={(isAgree: boolean) => handleCloseDialog(isAgree)}/>
      </div>
      <Paper 
        elevation={3} 
        className={`${classes.cell} ${classes.hoverCell} `}
        onClick={() => handleCellClick(identity)}
        onMouseDown={() => setCellClicked(true)} // Add the click effect when the mouse is pressed
        onMouseUp={() => setCellClicked(false)} // Remove the click effect when the mouse is released 
        // style={{ pointerEvents: cellClicked ? 'none' : 'auto' }} 
        >
        <div>
          <IdentityCellLeft identity={identity} />
        </div>
        <div>
          <Typography variant="h6">
            {identity.createdAt.toLocaleDateString()}
          </Typography>
        </div>
        <div>
          <IconButton
            aria-label="delete"
            onClick={(event) => {
            event.stopPropagation(); // Prevent event propagation to the cell
            event.preventDefault(); // 
            setOpenConfirmDialog(true);
            setPrepareDeleteDid(identity.did);
            return false; // NO user： Return false to prevent triggering the click effect of the cell
            }}
            >
            <DeleteIcon style={{ color: 'red' }} />
          </IconButton>
        </div>
      </Paper>
    </Grid>
  );  
};

export default CustomCell;