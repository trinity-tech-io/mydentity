'use client';
import React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  separateBar: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 140,
    borderBottom: '1px solid #C4C4C4',
    '&.left': {
      left: -160,
    },
    '&.right': {
      right: -160,
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centers content along the X-axis
    minHeight: '0vh',
  },
  content: {
    position: 'relative',
  },
}));

const SeparateLine = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <div className={classes.content}>
        <Typography variant="subtitle1" className="text-base font-bold">
          bind with your email
        </Typography>
        <div className={clsx(classes.separateBar, 'left')} />
        <div className={clsx(classes.separateBar, 'right')} />
      </div>
    </Box>
  );
};

export default SeparateLine;





