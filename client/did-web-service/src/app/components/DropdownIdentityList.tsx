'use client';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { shortenDID } from '@services/identity/identity.utils';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) => ({
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContainer: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
}));

const DropdownIdentityList = ({ identities, setCurrentIdentity, setDropdownOpen }) => {
  const classes = useStyles();

  return (
    <div>
      {identities.map((identity) => (
        <div key={identity.did}>
          <div
            className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-3 px-3"
            onClick={() => {
              setCurrentIdentity(identity);
              setDropdownOpen(false);
            }}
          >
            <div className={classes.avatarContainer}>
              <div className={classes.textContainer}>
                <span
                  className={`truncate text-sm font-bold dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200`}>
                  {identity.get('profile').name$.value}
                </span>
                <span className={`text-left cursor-pointer`}>
                  {shortenDID(identity.did)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropdownIdentityList;
