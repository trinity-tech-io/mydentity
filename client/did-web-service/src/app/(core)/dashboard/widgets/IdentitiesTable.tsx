'use client';
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import IdentitiesCell from './IdentitiesCell';

const useStyles = makeStyles((theme: Theme) => ({
  cell: {
    padding: theme.spacing(2),
    border: `0.5px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // textAlign: 'center',
    justifyContent: 'space-between', 
    marginRight: 2,
    height: 80,
    width: '100%',
  },
}));

const HorizontalCellTable = ({identities }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Paper elevation={3} className={classes.cell}>
          <div style={{ fontWeight: 'bold' }}> My Identities </div>
        </Paper>
        <Paper elevation={3} className={classes.cell}>
          <div style={{ width: '345px', fontWeight: 'Semi Bold' }}> Identity </div>
          <div style={{ fontWeight: 'Semi Bold'}}> Creation Date </div>
          <div style={{ fontWeight: 'Semi Bold' }}> Action </div>
        </Paper>
      </Grid>
      {identities.map((identity, index) => (
        <IdentitiesCell
          key={index}
          identity={identity}
        />
      ))}
    </Grid>
  );
};

export default HorizontalCellTable;
