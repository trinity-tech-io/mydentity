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
    height: 58,
    width: '100%',
    background:'dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50'
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px', // Add some horizontal padding for better spacing
    backgroundColor: '#f8fafc',
    color: '#96a5b9', 
    fontWeight: 'bold', 
    fontSize: '12px', 
  },
  firstItem: {
    width: '56%',
    justifyContent: 'flex-start', // Align the first item to the left
  },
  secondItem: {
    width: '24%',
    justifyContent: 'center', // Align the second and third items to the right
  },
  thirdItem: {
    width: '20%',
    justifyContent: 'flex-end',
  },
}));

const HorizontalCellTable = ({identities }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Paper elevation={3} className={classes.cell}>
          <Typography style={{ fontWeight: 'bold' }}> My Identities </Typography>
        </Paper>
        <Paper elevation={3} className={classes.cell}>
          <div className={`${classes.item} ${classes.firstItem}`}> IDENTITY </div>
          <div className={`${classes.item} ${classes.secondItem}`}> CREATION DATE </div>
          <div className={`${classes.item} ${classes.thirdItem}`}> ACTION </div>
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
