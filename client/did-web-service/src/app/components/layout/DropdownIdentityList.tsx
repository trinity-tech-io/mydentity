/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client';
import { IdentityAvatar } from '@components/identity/IdentityAvatar';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { Identity } from '@model/identity/identity';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { shortenDID } from '@services/identity/identity.utils';
import { activeIdentity$ } from '@services/identity/identity.events';
import { FC } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContainer: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
}));

const DropdownIdentityList: FC<{
  identities: Identity[],
  setCurrentIdentity: (identity: Identity) => void;
  setDropdownOpen: (open: boolean) => void;
}> = ({ identities, setCurrentIdentity, setDropdownOpen }) => {
  const classes = useStyles();
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);

  return (
    <div>
      {identities.map((identity) => (
        <div key={identity.did}>
          <div
            className={`font-medium text-sm hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-0 cursor-pointer ${
              identity === activeIdentity ? 'text-indigo-600 dark:text-indigo-400' : ''
            }`}
            onClick={() => {
              setCurrentIdentity(identity);
              setDropdownOpen(false);
            }}
          >
            <IdentityAvatar identity={identity} width={40} height={40} />
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
