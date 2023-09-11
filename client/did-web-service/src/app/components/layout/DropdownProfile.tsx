/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client';
import AccountIcon from '@assets/images/account.svg';
import Transition from "@components/generic/Transition";
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { User } from "@model/user/user";
import Avatar from '@mui/material/Avatar';
import { authUser$, getActiveUser } from "@services/user/user.events";
import { signOut } from "@services/user/user.service";
import Link from 'next/link';
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import CircleComponent from '../generic/CircleComponent';

export const DropdownUserProfile: FC<{
  align: "left" | "right"
}> = ({ align }) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeUser] = useBehaviorSubject(authUser$());
  const isLogin = !!activeUser;
  const [userName] = useBehaviorSubject(activeUser?.name$);
  const [userNameInitials] = useBehaviorSubject(activeUser?.nameInitials$);
  const [userTypeDesc, setUserTypeDesc] = useState('UNKNOWN');

  // get access token from url params.
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    // console.log('>>>>>> enter useEffect')
    const updateUserDesc = (user: User) => {
      if (user.type === 'MICROSOFT') {
        setUserTypeDesc('Microsoft');
      } else if (user.type === 'EMAIL') {
        setUserTypeDesc('Email');
      }
      // setUserName(user.email);
    }

    const user = getActiveUser();
    if (user) {
      updateUserDesc(user);
    }

    const clickHandler: ((ev: MouseEvent) => void) = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [accessToken, dropdownOpen, refreshToken]);

  const onIconClick = () => {
    if (!isLogin) {
      // setSignInOpen(!signInOpen);
      window.location.href = '/signin';
    } else {
      setDropdownOpen(!dropdownOpen)
    }
  }

  const onSignOut = () => {
    signOut();
    router.replace('/dashboard')
  }

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler: ((ev: KeyboardEvent) => void) = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => onIconClick()}
        aria-expanded={dropdownOpen}
      >
        {isLogin ? (
          <CircleComponent text={userNameInitials} />) : (
          <Avatar sx={{ ml: 0, width: 40, height: 40 }}>
            <AccountIcon width={20} />
          </Avatar>
        )}
        {isLogin && (
          <div className="flex items-center truncate">
            <span className="truncate ml-2 text-sm font-medium dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">Hey <b>{userName}</b></span>
            <svg className="w-3 h-3 shrink-0 ml-2 fill-current text-slate-400" viewBox="0 0 12 12">
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
          </div>
        )}
      </button>

      {isLogin && (

        <Transition
          className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
          show={dropdownOpen}
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
        >
          <div
            ref={dropdown}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
          >
            <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 dark:border-slate-700">
              <div className="font-medium text-slate-800 dark:text-slate-100">Signed In</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 italic">{userTypeDesc} user</div>
            </div>
            <ul>
              <li>
                <Link
                  className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
                  href="/account/profile"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Account profile
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
                  href="/account/security"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Security center
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
                  href="/account/export"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Export
                </Link>
              </li>
              <li>
                <Link
                  className="font-medium text-sm text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center py-1 px-3"
                  href="/dashboard"
                  onClick={() => onSignOut()}
                >
                  Sign Out
                </Link>
              </li>
              {/* <li>
                <div className='py-1 px-3'>
                  <Notifications align="right" />
                </div>
              </li> */}
            </ul>
          </div>
        </Transition>

      )}

    </div>
  )
}
