/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";
import AccountIcon from '@assets/images/account.svg';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { Identity } from '@model/identity/identity';
import { Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { activeIdentity$ } from '@services/identity/identity.events';
import { identityService } from '@services/identity/identity.service';
import { shortenDID } from '@services/identity/identity.utils';
import { authUser$ } from '@services/user/user.events';
import { initialsString } from "@utils/strings";
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import CircleComponent from '../generic/CircleComponent';
import { MainButton } from '../generic/MainButton';
import Transition from '../generic/Transition';
import DropdownIdentityList from './DropdownIdentityList';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  blackText: {
    color: 'black', //
  },
}));

export const DropdownIdentity: FC<{
  align?: "left" | "right";
}> = ({ align = "left" }) => {
  const classes = useStyles();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { mounted } = useMounted();
  const router = useRouter();

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const [authUser] = useBehaviorSubject(authUser$);
  const [identities] = useBehaviorSubject(authUser?.get("identity").identities$);
  const [currentIdentity] = useBehaviorSubject(activeIdentity$);
  //const [createDidModalOpen, setCreateDidModalOpen] = useState(false);
  const [name] = useBehaviorSubject(currentIdentity?.get("profile").name$)
  const [DID, setDID] = useState('No active identity');

  const closeDropdown = () => {
    setDropdownOpen(false);
  }

  const setCurrentIdentity = (identity: Identity) => {
    identityService.setActiveIdentity(identity);
  }

  const openNewIdentity = () => {
    closeDropdown();
    router.push("/new-identity");
  }

  useEffect(() => {
    if (currentIdentity) {
      setDID(shortenDID(currentIdentity.did));
    } else {
      setDID('No active identity');
    }
  }, [currentIdentity]);

  // close on click outside
  useEffect(() => {
    const clickHandler: ((ev: MouseEvent) => void) = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler: ((ev: KeyboardEvent) => void) = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  if (!mounted)
    return <></>

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className={classes.button}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >

        {name && name !== null ? (
          <CircleComponent text={initialsString(name)} />) : (
          <Avatar sx={{ ml: 0, width: 40, height: 40 }}>
            <AccountIcon width={20} />
          </Avatar>
        )}
        <div className={classes.avatarContainer}>
          <div className={classes.textContainer}>
            <div className={`truncate text-sm font-bold dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200 ${currentIdentity ? classes.blackText : ''}`}>
              {name}
            </div>
            <div className={`truncate leading-3 mb-1 text-sm font-medium ${currentIdentity ? classes.blackText : ''}`}>
              {DID}
            </div>
          </div>
          <div className="ml-auto">
            <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
          </div>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        show={dropdownOpen}
        enter="transition ease-out  transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out "
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          className='p-4'
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          {
            (identities && identities.length > 0) &&
            <div className="border-b border-slate-200 dark:border-slate-700 " >
              <DropdownIdentityList
                identities={identities}
                setCurrentIdentity={setCurrentIdentity}
                setDropdownOpen={setDropdownOpen}
              />
            </div>
          }
          <MainButton className="min-w-max" onClick={openNewIdentity}>Create a new identity</MainButton>
        </div>
      </Transition>
    </div>
  )
}
